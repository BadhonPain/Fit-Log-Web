import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Whole Hero Section Container Card with surrounding shadow & ambient glow */}
        <div className="relative rounded-3xl bg-dark-card border border-dark-border p-6 sm:p-10 lg:p-14 overflow-hidden shadow-2xl shadow-black/80">
          {/* Ambient glow behind the whole hero card */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column — Text & CTA */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                <span className="text-accent text-xs font-bold tracking-widest uppercase">
                  WORKOUT LIBRARY
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white uppercase tracking-tight leading-[1.1] font-[family-name:var(--font-oswald)]">
                TRAIN WITH INTENT. <br />
                <span className="text-accent">LOG EVERY SET.</span>
              </h1>

              <p className="text-zinc-400 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed">
                FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
                into today&apos;s plan, and watch the week&apos;s work add up.
              </p>

              <div className="pt-2">
                <a
                  href="#library"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-accent text-black font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-[#b8e600] active:scale-95 transition-all shadow-lg shadow-accent/20"
                >
                  <span>BROWSE WORKOUTS</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column — Athlete banner image directly in the hero container */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm sm:max-w-md flex items-center justify-center">
                <Image
                  src="/banner.png"
                  alt="FitLog Training Athlete"
                  width={460}
                  height={460}
                  priority
                  className="object-contain w-full h-auto drop-shadow-2xl select-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
