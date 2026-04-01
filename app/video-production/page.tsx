"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function VideoProductionPage() {
  const [items, setItems] = useState<any[]>([]);

  const load = async () => {
    const res = await fetch("/api/services?category=video-production");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-white py-16 px-6">

      <h1 className="text-2xl md:text-3xl font-semibold mb-8 md:mb-10 text-center text-black">
        Video Production
      </h1>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

        {/* EMPTY */}
        {items.length === 0 && (
          <p className="col-span-3 text-center text-gray-500">
            No videos found
          </p>
        )}

        {items.map((item) => {
          const image = item.images?.[0];
          const video = item.videos?.[0];
          const website = item.websites?.[0];

          return (
            <div
              key={item._id}
              className="relative h-56 rounded-xl overflow-hidden group"
            >

              {/* IMAGE */}
              {image && (
                <img
                  src={image}
                  alt="Video Production"
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
              )}

             
             {/* VIDEO + PLAY BUTTON */}
{video && (
  <>
    <video
      src={video}
      muted
      loop
      autoPlay
      playsInline
      className="
        absolute inset-0 w-full h-full object-cover
        opacity-100
        md:opacity-0 md:group-hover:opacity-100
        transition duration-500
      "
    />

    {/* ▶ PLAY BUTTON */}
    <div className="
      absolute inset-0
      flex items-center justify-center
      pointer-events-none
    ">
      <div className="
        w-14 h-14
        rounded-full
        bg-black/60
        backdrop-blur-md
        flex items-center justify-center
        transition
        group-hover:scale-110
      ">
        <span className="text-white text-xl">▶</span>
      </div>
    </div>
  </>
)}

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-500" />

              {/* BUTTON */}
              {website && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
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