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
  card4: [
    "/posters/poster16.jpeg",
    "/posters/poster17.jpeg",
    "/posters/poster18.jpeg",
    "/posters/poster37.jpeg",
    "/posters/poster20.jpeg",
    "/posters/poster21.jpeg",
  ],
  card5: [
    "/posters/poster22.jpeg",
    "/posters/poster23.jpeg",
    "/posters/poster24.jpeg",
    "/posters/poster25.jpeg",
    "/posters/poster26.jpeg",
    "/posters/poster35.jpeg",
  ],
  card6: [
    "/posters/poster28.jpeg",
    "/posters/poster29.jpeg",
    "/posters/poster30.jpeg",
    "/posters/poster31.jpeg",
    "/posters/poster32.jpeg",
    "/posters/poster36.jpeg",
  ],
};

const cardKeys = Object.keys(posterSets);
const cardsPerSlide = 3;

/* ================= GROUP CARDS INTO SLIDES ================= */
const slides: string[][] = [];
for (let i = 0; i < cardKeys.length; i += cardsPerSlide) {
  slides.push(cardKeys.slice(i, i + cardsPerSlide));
}

export default function PostersSection() {
  const [activeSet, setActiveSet] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      <section className="mt-6">
        <h3 className="text-lg font-semibold mb-6">Creative Design</h3>

        <div className="relative flex items-center">

        {/* LEFT ARROW */}
<button
  onClick={prevSlide}
  disabled={currentIndex === 0}
  className="
    absolute left-0 z-10
    bg-white shadow-md
    w-10 h-10 rounded-full
    flex items-center justify-center
    text-blue-800 hover:text-blue-700
    hover:scale-110 transition
    disabled:opacity-30
  "
>
  ←
</button>

          {/* SLIDER */}
          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {slides.map((group, index) => (
                <div
                  key={index}
                  className="min-w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-12"
                >
                  {group.map((key) => (
                    <PosterCard
                      key={key}
                      onClick={() => setActiveSet(key)}
                      images={posterSets[key]}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

         {/* RIGHT ARROW */}
<button
  onClick={nextSlide}
  disabled={currentIndex === slides.length - 1}
  className="
    absolute right-0 z-10
    bg-white shadow-md
    w-10 h-10 rounded-full
    flex items-center justify-center
    text-blue-800 hover:text-blue-700
    hover:scale-110 transition
    disabled:opacity-30
  "
>
  →
</button>

        </div>
      </section>

      {/* ================= POPUP ================= */}
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
                <div
                  key={i}
                  className="relative aspect-[3/4] rounded-xl overflow-hidden"
                >
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

/* ================= POSTER CARD ================= */
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
      className="cursor-pointer rounded-3xl bg-white/40 backdrop-blur-md border border-black/20 p-3 hover:scale-105 transition"
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