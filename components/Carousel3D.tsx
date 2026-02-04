"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const items = [
  { src: "/images/a.png", rotate: 0 },
  { src: "/images/b.png", rotate: 120 },
  { src: "/images/c.png", rotate: 240 },
];

const STEP = 120;
const INTERVAL = 2500;

export default function Carousel3D() {
  const [deg, setDeg] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const id = setInterval(() => {
      setDeg((d) => d - STEP);
    }, INTERVAL);

    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      className="relative flex justify-center py-16 group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Perspective Container */}
      <div
        className="relative w-[260px] h-[210px]"
        style={{ perspective: "1000px" }}
      >
        {/* Carousel */}
        <div
          className="absolute w-full h-full transition-transform duration-1000 ease-in-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${deg}deg)`,
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="absolute w-full h-full overflow-hidden "
              style={{
                transform: `rotateY(${item.rotate}deg) translateZ(260px)`,
              }}
            >
              <Image
                src={item.src}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                sizes="260px"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Overlay Controls */}
        <button
          onClick={() => setDeg((d) => d + STEP)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 
                     bg-black/40 text-white px-3 py-2 rounded-full
                     opacity-0 group-hover:opacity-100 transition"
          aria-label="Previous slide"
        >
          ‹
        </button>

        <button
          onClick={() => setDeg((d) => d - STEP)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 
                     bg-black/40 text-white px-3 py-2 rounded-full
                     opacity-0 group-hover:opacity-100 transition"
          aria-label="Next slide"
        >
          ›
        </button>
      </div>
    </div>
  );
}
