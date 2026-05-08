"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const images = Array.from({ length: 23 }, (_, i) =>
  `/images/gallery/gallery${i + 1}.jpg`
);

export default function GalleryPage() {
  const [currentIndex, setCurrentIndex] = useState(null);

  const openImage = (index) => setCurrentIndex(index);
  const closeImage = () => setCurrentIndex(null);

  const showNext = () =>
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );

  const showPrev = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") closeImage();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    if (currentIndex !== null) {
      window.addEventListener("keydown", handleKey);
    }

    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex]);

  return (
    <main className="bg-gray-50">

      {/* HERO */}
      <section className="py-10 text-center max-w-3xl mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
          Hospital Gallery
        </h1>
        <p className="mt-4 text-gray-500 text-lg leading-relaxed">
          A glimpse into our facilities, environment, and patient care spaces.
        </p>
      </section>

      {/* GRID */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">

          {images.map((src, index) => (
            <div
              key={index}
              onClick={() => openImage(index)}
              className="relative aspect-4/3 cursor-pointer overflow-hidden rounded-2xl group"
            >
              <Image
                src={src}
                alt="Gallery"
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300" />
            </div>
          ))}

        </div>
      </section>

      {/* MODAL */}
      {currentIndex !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">

          {/* CLOSE */}
          <button
            onClick={closeImage}
            className="absolute top-6 right-6 text-white hover:scale-110 transition"
          >
            <X size={28} />
          </button>

          {/* PREV */}
          <button
            onClick={showPrev}
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 
            bg-white/10 hover:bg-white/20 backdrop-blur-md 
            p-2 md:p-3 rounded-full text-white transition"
          >
            <ChevronLeft size={36} />
          </button>

          {/* IMAGE */}
          <div className="relative w-[92%] md:w-[70%] h-[60vh] md:h-[85vh]">
            <Image
              src={images[currentIndex]}
              alt="Full Image"
              fill
              className="object-contain"
            />
          </div>

          {/* NEXT */}
          <button
            onClick={showNext}
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 
            bg-white/10 hover:bg-white/20 backdrop-blur-md
            p-2 md:p-3 rounded-full text-white transition"
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </main>
  );
}