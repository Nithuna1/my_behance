import Image from "next/image";
import Link from "next/link";

export default function EcommercePage() {

  const ecommerce = {
    images: [
      "/services/commerce1.webp",
      "/services/commerce.jpeg",
      "/services/commerce2.jpg",
      "/services/commerce4.webp",
      "/services/commerce5.webp",
      "/services/commerce6.png",
    ],

    videos: [
      "/video/alrayyan_video.mp4",
      "/video/flipkart_video.mp4",
      "/video/myntra_video.mp4",
      "/video/amazon_video.mp4",
      "/video/ajio_video.mp4",
      "/video/tac_video.mp4",
    ],

    websites: [
      "https://amg-ecommerce-web.vercel.app/",
      "https://www.flipkart.com",
      "https://www.myntra.com",
      "https://www.amazon.in",
      "https://www.ajio.com",
      "https://www.tatacliq.com",
    ],
  };

  return (
    <div className="min-h-screen bg-white py-16 px-6">

      <h1 className="text-3xl font-semibold mb-10 text-center">
        E-Commerce Solutions
      </h1>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

        {ecommerce.images.map((img, i) => {

          const video = ecommerce.videos[i];
          const website = ecommerce.websites[i];

          return (
            <div
              key={i}
              className="relative h-56 rounded-xl overflow-hidden group"
            >

              {/* IMAGE */}
              <Image
                src={img}
                alt="Ecommerce"
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />

             {/* VIDEO */}
{video && (
  <video
    src={video}
    muted
    loop
    autoPlay
    playsInline
    preload="auto"
    className="
      absolute inset-0 w-full h-full object-cover
      opacity-100
      md:opacity-0 md:group-hover:opacity-100
      transition duration-500
    "
  />
)}

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-500" />

              {/* WEBSITE BUTTON */}
              {website && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-full bg-white text-black text-sm font-medium shadow-lg hover:bg-black hover:text-white transition"
                  >
                    Explore Site →
                  </a>
                </div>
              )}

            </div>
          );
        })}

      </div>

      {/* BACK BUTTON */}
      <div className="flex justify-center mt-10">
        <Link
          href="/"
          className="px-6 py-2 rounded-full border border-gray-400 text-sm font-medium text-black hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
        >
          ← Back to Home
        </Link>
      </div>

    </div>
  );
}