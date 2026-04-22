"use client";

import { useEffect, useState } from "react";

/* ================= TYPES ================= */
type Poster = {
  _id: string;
  image: string;
};

/* ================= COMPONENT ================= */
export default function PostersSection() {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [activeSet, setActiveSet] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardsPerSlide = 3;
  const postersPerCard = 6;

  /* ================= FETCH ================= */
  useEffect(() => {
    const loadPosters = async () => {
      try {
        const res = await fetch("/api/posters");
        const data = await res.json();

        if (Array.isArray(data)) {
          setPosters(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadPosters();
  }, []);

  /* ================= GROUP INTO CARDS ================= */
  const cards: Poster[][] = [];
  for (let i = 0; i < posters.length; i += postersPerCard) {
    cards.push(posters.slice(i, i + postersPerCard));
  }

  /* ================= NAVIGATION ================= */
  const nextSlide = () => {
    // For desktop showing 3 cards
    if (currentIndex < cards.length - 3) {
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

        {/* ===== MOBILE: 1 card at a time with outside arrows ===== */}
        <div className="flex md:hidden items-center gap-3">

          {/* LEFT ARROW */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="flex-shrink-0 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 disabled:opacity-30 transition-all duration-200"
          >
            ←
          </button>

          {/* CARD AREA */}
          <div className="overflow-hidden flex-1">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {cards.map((card, i) => (
                <div key={i} className="min-w-full px-1">
                  <PosterCard
                    images={card}
                    onClick={() => setActiveSet(i)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT ARROW */}
          <button
            onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, cards.length - 1))}
            disabled={currentIndex === cards.length - 1}
            className="flex-shrink-0 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 disabled:opacity-30 transition-all duration-200"
          >
            →
          </button>
        </div>

        {/* DOT INDICATORS - mobile */}
        <div className="flex md:hidden justify-center gap-1.5 mt-3">
          {cards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-5 h-2 bg-blue-600"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* ===== DESKTOP: 3 cards per slide ===== */}
        <div className="relative hidden md:flex items-center">

          {/* LEFT */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="absolute left-0 z-10 bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-30"
          >
            ←
          </button>

          {/* SLIDER */}
          <div className="overflow-hidden w-full px-12">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {cards.map((card, i) => (
                <div key={i} className="min-w-[33.333%] px-4">
                  <PosterCard
                    images={card}
                    onClick={() => setActiveSet(i)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <button
            onClick={nextSlide}
            disabled={currentIndex >= cards.length - 3}
            className="absolute right-0 z-10 bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-30"
          >
            →
          </button>
        </div>

      </section>

      {/* ================= POPUP ================= */}
      {activeSet !== null && cards[activeSet] && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
          onClick={() => setActiveSet(null)}
        >
          <div
            className="relative bg-white w-full max-w-6xl max-h-[90vh] rounded-2xl p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE BUTTON - inside modal */}
            <button
              onClick={() => setActiveSet(null)}
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-gray-100 border border-gray-300 shadow-md flex items-center justify-center text-gray-800 text-base font-bold hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200"
            >
              ✕
            </button>

            {/* ADD TOP PADDING SO IMAGES DON'T GO UNDER CLOSE BUTTON */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-8">
              {cards[activeSet].map((poster, i) => (
                <div
                  key={i}
                  className="relative aspect-[3/4] rounded-xl overflow-hidden"
                >
                  <img
                    src={poster.image.replace(
                      "/upload/",
                      "/upload/w_800,q_auto,f_auto/"
                    )}
                    className="w-full h-full object-cover"
                  />
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
  images: Poster[];
  onClick: () => void;
}) {
  const getImg = (index: number) =>
    images[index]?.image
      ? images[index].image.replace(
          "/upload/",
          "/upload/w_300,q_auto,f_auto/"
        )
      : "/no-image.png";

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-3xl bg-white/40 backdrop-blur-md border border-black/20 p-3 hover:scale-105 transition"
    >
      <div className="grid grid-cols-3 grid-rows-3 gap-2 aspect-[3/4]">

        <div className="col-span-1 row-span-2">
          <img src={getImg(0)} className="w-full h-full object-cover rounded-xl" />
        </div>

        <div className="col-span-2">
          <img src={getImg(1)} className="w-full h-full object-cover rounded-xl" />
        </div>

        <div className="col-span-2">
          <img src={getImg(2)} className="w-full h-full object-cover rounded-xl" />
        </div>

        <img src={getImg(3)} className="w-full h-full object-cover rounded-xl" />
        <img src={getImg(4)} className="w-full h-full object-cover rounded-xl" />
        <img src={getImg(5)} className="w-full h-full object-cover rounded-xl" />

      </div>
    </div>
  );
}