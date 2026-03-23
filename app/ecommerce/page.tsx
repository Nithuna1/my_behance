"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function EcommercePage() {

  const [items, setItems] = useState<any[]>([]);

  const load = async () => {
    const res = await fetch("/api/services");
    const data = await res.json();

    // ✅ FILTER ONLY ECOMMERCE
    const ecommerce = Array.isArray(data)
      ? data.filter((s: any) => s.type === "ecommerce")
      : [];

    setItems(ecommerce);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-white py-16 px-6">

      <h1 className="text-2xl md:text-3xl font-semibold mb-8 md:mb-10 text-center text-black">
        E-Commerce Solutions
      </h1>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

        {items.map((item, i) => {

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
                <Image
                  src={image}
                  alt="Ecommerce"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              )}

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

      {/* EMPTY STATE */}
      {items.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No ecommerce items found
        </p>
      )}

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