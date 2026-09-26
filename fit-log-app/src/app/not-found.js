import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md mx-auto space-y-6">
        <div className="inline-block relative">
          <span className="text-8xl sm:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-accent to-accent/40 font-[family-name:var(--font-oswald)]">
            404
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight font-[family-name:var(--font-oswald)]">
          PAGE NOT FOUND
        </h1>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          The lift or page you were looking for doesn&apos;t exist or was moved.
          Let&apos;s get you back to the workout library.
        </p>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent text-black font-bold text-sm uppercase tracking-wider hover:bg-[#b8e600] active:scale-95 transition-all shadow-lg shadow-accent/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            BACK TO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
