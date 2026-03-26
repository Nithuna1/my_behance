"use client";

import { useEffect, useState } from "react";

/* ================= TYPES ================= */
type Poster = {
  _id: string;
  image: string;
  title?: string;
};

/* ================= COMPONENT ================= */
export default function PostersSection() {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const postersPerSlide = 6;

  /* ================= FETCH ================= */
  const loadPosters = async () => {
    try {
      const res = await fetch("/api/posters");
      const data = await res.json();

      if (Array.isArray(data)) {
        setPosters(data);
      } else {
        setPosters([]);
      }
    } catch (err) {
      console.log("POSTER ERROR:", err);
    }
  };

  useEffect(() => {
    loadPosters();
  }, []);

  /* ================= SLIDES ================= */
  const slides = [];
  for (let i = 0; i < posters.length; i += postersPerSlide) {
    slides.push(posters.slice(i, i + postersPerSlide));
  }

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

          {/* LEFT */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="absolute left-0 z-10 bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center"
          >
            ←
          </button>

          {/* SLIDER */}
          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {slides.map((group, i) => (
                <div
                  key={i}
                  className="min-w-full grid grid-cols-2 md:grid-cols-3 gap-6 px-10"
                >
                  {group.map((poster, idx) => (
                    <div
                      key={poster._id}
                      onClick={() => setActiveIndex(i * postersPerSlide + idx)}
                      className="cursor-pointer rounded-xl overflow-hidden group"
                    >
                      <img
                        src={
                          poster.image
                            ? poster.image.replace(
                                "/upload/",
                                "/upload/w_500,q_auto,f_auto/"
                              )
                            : "/no-image.png"
                        }
                        className="w-full h-full object-cover aspect-[3/4] transition group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <button
            onClick={nextSlide}
            disabled={currentIndex === slides.length - 1}
            className="absolute right-0 z-10 bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center"
          >
            →
          </button>
        </div>
      </section>

      {/* ================= POPUP ================= */}
      {activeIndex !== null && posters[activeIndex] && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">

          <button
            onClick={() => setActiveIndex(null)}
            className="absolute top-6 right-6 text-white text-3xl"
          >
            ✕
          </button>

          <div className="max-w-4xl w-full">
            <img
              src={
                posters[activeIndex].image.replace(
                  "/upload/",
                  "/upload/w_1200,q_auto,f_auto/"
                )
              }
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
}