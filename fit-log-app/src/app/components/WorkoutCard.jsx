"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const WorkoutCard = ({ workout }) => {
  const {
    id,
    name,
    image,
    muscleGroups = [],
    equipment,
    duration,
    caloriesBurned,
    rating,
  } = workout;

  const [imgSrc, setImgSrc] = useState(image || "/banner.png");

  return (
    <Link
      href={`/workout/${id}`}
      className="group flex flex-col bg-dark-card border border-dark-border hover:border-accent/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5"
    >
      {/* Thumbnail Container */}
      <div className="relative w-full h-48 sm:h-52 bg-zinc-900 overflow-hidden">
        <Image
          src={imgSrc}
          alt={name}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          onError={() => setImgSrc("/banner.png")}
        />
        <div className="absolute inset-0 bg-linear-to-t from-dark-card/90 via-transparent to-transparent pointer-events-none"></div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Muscle group tags */}
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {muscleGroups.map((group, index) => (
            <span
              key={index}
              className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-accent/15 text-accent border border-accent/20"
            >
              {group}
            </span>
          ))}
        </div>

        {/* Workout Name */}
        <h3 className="text-white font-bold text-lg uppercase tracking-wide group-hover:text-accent transition-colors font-[family-name:var(--font-oswald)]">
          {name}
        </h3>

        {/* Equipment */}
        <p className="text-zinc-400 text-sm mt-1">{equipment}</p>

        {/* Stats Row */}
        <div className="mt-auto pt-4 border-t border-dark-border/80 flex items-center justify-between text-xs text-zinc-400">
          {/* Duration Portion*/}
          <div className="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
            </svg>
            <span>{duration} min</span>
          </div>

          {/* Calories Portion*/}
          <div className="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
              />
            </svg>
            <span>{caloriesBurned} kcal</span>
          </div>

          {/* Rating Portion*/}
          <div className="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-amber-400 fill-amber-400"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-zinc-300 font-medium">{rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
