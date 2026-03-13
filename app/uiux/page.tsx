import Image from "next/image";
import Link from "next/link";

export default function UiUxPage() {

  const service = {
    images: [
      "/services/web1.avif",
      "/services/web2.avif",
      "/services/web3.jpg",
      "/services/web4.jpg",
    ],

    videos: [
      "/video/figma_video.mp4",
      "/video/dribble_video.mp4",
      "/video/awards_video.mp4",
      "/video/behance_video.mp4",
    ],

    websites: [
      "https://www.figma.com/proto/eNSvJGp6L4vK8asm2EPF2z/vishnu2",
      "https://dribbble.com",
      "https://www.awwwards.com",
      "https://www.behance.net",
    ],
  };

  return (
    <div className="min-h-screen bg-white py-16 px-6">

      <h1 className="text-3xl font-semibold mb-10 text-center">
        UI / UX Design
      </h1>

      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">

        {service.images.map((img, i) => {

          const video = service.videos[i];
          const website = service.websites[i];

          return (
            <div key={i} className="relative aspect-[4/6] rounded-xl overflow-hidden group">

              <Image
                src={img}
                alt="UI UX"
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
                    className="px-5 py-2 rounded-full bg-white text-blue-600 text-sm font-medium hover:bg-gray-800 hover:text-white transition"
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
          className="px-6 py-2 rounded-full border border-gray-400 text-sm font-medium hover:bg-blue-600 hover:text-white transition"
        >
          ← Back to Home
        </Link>
      </div>

    </div>
  );
}