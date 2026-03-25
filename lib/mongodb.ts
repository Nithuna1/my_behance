import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

/**
 * Global cache to prevent multiple connections during hot reloads in development.
 * In production, this ensures we reuse the existing connection.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB(): Promise<typeof mongoose> {
  // Return existing connection if already connected
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection is already in progress, wait for it
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
   
      retryWrites: true,
      retryReads: true,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI!, opts)
      .then((mongooseInstance) => {
        console.log("MongoDB Connected ✅");
        return mongooseInstance;
      })
      .catch((error) => {
        // Reset the promise so the next call will retry
        cached.promise = null;
        console.error("MongoDB Connection Error ❌:", error.message);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}