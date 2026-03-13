import Image from "next/image";
import Link from "next/link";

export default function VideoProductionPage() {

  const service = {
    images: [
      "/services/video1.jpg",
      "/services/video2.jpg",
      "/services/video3.avif",
      "/services/short.jpg",
      "/services/short2.jpg",
      "/services/short3.jpg",
    ],

    videos: [
      "/video/intro_video.mp4",
      "/video/title_video.mp4",
      "/video/memory_video.mp4",
      "/video/team_video.mp4",
      "/video/company_video.mp4",
      "/video/marketing_video.mp4",
    ],

    websites: [
      "https://www.instagram.com/matamix_international/",
      "https://www.instagram.com/matamix_international/",
      "https://www.instagram.com/matamix_international/",
      "https://www.instagram.com/matamix_international/",
      "https://www.instagram.com/matamix_international/",
      "https://www.instagram.com/matamix_international/",
    ],
  };

  return (
    <div className="min-h-screen bg-white py-16 px-6">

      <h1 className="text-2xl md:text-3xl font-semibold mb-8 md:mb-10 text-center text-black">
        Video Production
      </h1>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

        {service.images.map((img, i) => {

          const video = service.videos[i];
          const website = service.websites[i];

          return (
            <div key={i} className="relative h-56 rounded-xl overflow-hidden group">

              <Image
                src={img}
                alt="Video Production"
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
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-500" />

              {website && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                  <a
                    href={website}
                    target="_blank"
                    className="px-5 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-black hover:text-white transition"
                  >
                    View Project →
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