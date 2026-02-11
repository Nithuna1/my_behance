"use client";

import { useState } from "react";
import Image from "next/image";

/* ================= POSTER DATA ================= */
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

export default function PostersSection() {
  const [activeSet, setActiveSet] = useState<string | null>(null);

  return (
    <>
      <section className="mt-6">
        <h3 className="text-lg font-semibold mb-6">Creative Design</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PosterCard onClick={() => setActiveSet("card1")} images={posterSets.card1} />
          <PosterCard onClick={() => setActiveSet("card2")} images={posterSets.card2} />
          <PosterCard onClick={() => setActiveSet("card3")} images={posterSets.card3} />
        </div>
      </section>

      {activeSet && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <button
            onClick={() => setActiveSet(null)}
            className="absolute top-6 right-6 text-white text-3xl"
          >
            ✕
          </button>

          <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-2xl p-6 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-6 text-blue-800">
  Creative Concept
</h2>



            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {posterSets[activeSet].map((img, i) => (
                <div key={i} className="relative aspect-[3/4] rounded-xl overflow-hidden">
                  <Image src={img} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PosterCard({
  images,
  onClick,
}: {
  images: string[];
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-3xl bg-white/40 backdrop-blur-md border border-black/20 p-3"
    >
      <div className="grid grid-cols-3 grid-rows-3 gap-2 aspect-[3/4]">
        <div className="col-span-1 row-span-2 relative rounded-xl overflow-hidden">
          <Image src={images[0]} alt="" fill className="object-cover" />
        </div>
        <div className="col-span-2 relative rounded-xl overflow-hidden">
          <Image src={images[1]} alt="" fill className="object-cover" />
        </div>
        <div className="col-span-2 relative rounded-xl overflow-hidden">
          <Image src={images[2]} alt="" fill className="object-cover" />
        </div>
        <div className="relative rounded-xl overflow-hidden">
          <Image src={images[3]} alt="" fill className="object-cover" />
        </div>
        <div className="relative rounded-xl overflow-hidden">
          <Image src={images[4]} alt="" fill className="object-cover" />
        </div>
        <div className="relative rounded-xl overflow-hidden">
          <Image src={images[5]} alt="" fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}
