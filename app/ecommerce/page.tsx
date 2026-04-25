"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function EcommercePage() {
  const [items, setItems] = useState<any[]>([]);

  const load = async () => {
    const res = await fetch("/api/services?category=ecommerce");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-white py-20 px-6">

      {/* HEADER */}
      <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 tracking-tight">
        E-Commerce Solutions
      </h1>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {items.length === 0 && (
          <p className="text-center col-span-3 text-gray-500">
            No ecommerce items found
          </p>
        )}

        {items.map((item) => {
          const image = item.images?.[0];
          const video = item.videos?.[0];
          const website = item.websites?.[0];

          return (
            <div
              key={item._id}
              className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-500 bg-white"
            >

              {/* IMAGE */}
              {image && (
                <img
                  src={image}
                  alt="Ecommerce"
                  className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
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
                  className="absolute inset-0 w-full h-full object-cover opacity-0 hover:opacity-100 transition duration-500"
                />
              )}

              {/* CONTENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition duration-500 flex items-end justify-center">
                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-4 px-5 py-2 rounded-full bg-white text-gray-900 text-sm font-medium shadow-lg hover:bg-gray-900 hover:text-white transition"
                  >
                    Explore Site →
                  </a>
                )}
              </div>
            </div>
          );
        })}

      </div>

      {/* BACK BUTTON */}
      <div className="flex justify-center mt-12">
        <Link
          href="/"
          className="px-6 py-2 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
        >
          ← Back to Home
        </Link>
      </div>

    </div>
  );
}
