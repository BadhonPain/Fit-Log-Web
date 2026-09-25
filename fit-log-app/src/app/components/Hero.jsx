import React from "react";
import Image from "next/image";

const Hero = () => { // className="object-contain w-full h-full drop-shadow-2xl relative z-10"
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:py-20 border-b border-dark-border/40 object-contain w-full h-full drop-shadow-2xl ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span className="text-accent text-xs font-bold tracking-widest uppercase">
                WORKOUT LIBRARY
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight leading-[1.1] font-(family-name:--font-oswald)">
              TRAIN WITH INTENT. <br />
              <span className="text-accent">LOG EVERY SET.</span>
            </h1>

            <p className="text-zinc-400 text-base sm:text-lg max-w-xl leading-relaxed">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <div className="pt-2">
              <a
                href="#library"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-accent text-black font-bold text-sm sm:text-base tracking-wide uppercase hover:bg-[#b8e600] active:scale-95 transition-all shadow-lg shadow-accent/20"
              >
                <span>BROWSE WORKOUTS</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
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

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden bg-linear-to-b from-zinc-800/40 to-zinc-900/60 border border-dark-border/60 p-4 flex items-center justify-center shadow-2xl">
              <div className="absolute inset-0 bg-radial from-accent/10 via-transparent to-transparent opacity-60"></div>
              <Image
                src="/banner.png"
                alt="FitLog Training"
                width={480}
                height={480}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
