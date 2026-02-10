import Image from "next/image";
import Link from "next/link";

const posterSets: Record<string, string[]> = {
  card1: [
    "/posters/poster1.jpeg",
    "/posters/poster2.jpeg",
    "/posters/poster3.jpeg",
    "/posters/poster4.png",
    "/posters/poster5.jpeg",
    "/posters/poster6.jpeg",
  ],
  card2: [
    "/posters/poster7.jpeg",
    "/posters/poster8.jpeg",
    "/posters/poster9.jpeg",
    "/posters/poster10.jpeg",
    "/posters/poster11.jpeg",
    "/posters/poster12.jpeg",
  ],
  card3: [
    "/posters/poster13.png",
    "/posters/poster14.jpeg",
    "/posters/poster15.png",
    "/posters/poster1.jpeg",
    "/posters/poster2.jpeg",
    "/posters/poster3.jpeg",
  ],
};

export default function PosterViewPage({
  params,
}: {
  params: { set: string };
}) {
  const images = posterSets[params.set] || [];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#e0e7ff] to-white px-6 py-6">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-6 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-semibold capitalize">
          Creative Design – Selected Works
        </h1>

        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← Back to Work
        </Link>
      </div>

      {/* POSTER GRID */}
      {images.length > 0 ? (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative aspect-[3/4] rounded-lg overflow-hidden"
            >
              <Image
                src={img}
                alt={`Poster ${i + 1}`}
                fill
                className="object-cover"
                priority={i < 3}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-16">
          No posters found for this set.
        </p>
      )}
    </main>
  );
}
