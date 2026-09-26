"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { usePlan } from "../../context/PlanContext";
import RestTimer from "../../components/RestTimer";

export default function WorkoutDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);

  const { addToTodayPlan, addToSaved, todayPlan, savedWorkouts } = usePlan();

  useEffect(() => {
    let ignore = false;

    async function fetchDetail() {
      if (!id) return;
      try {
        let res;

        // 1. Primary: Call official single workout API
        try {
          res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
        } catch {
          // Cross-origin / network error
        }

        // 2. Resilient API fallback if the worker is rate limited
        if (!res || !res.ok) {
          res = await fetch(`/api/fitlog/${id}`);
        }

        if (!res.ok) {
          throw new Error(
            res.status === 404
              ? "Workout not found"
              : `Failed to load workout (${res.status})`
          );
        }

        const data = await res.json();
        if (!ignore) {
          setWorkout(data);
          setImgSrc(data.image || "/banner.png");
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Failed to load workout details");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchDetail();

    return () => {
      ignore = true;
    };
  }, [id]);

  const isInPlan = workout && todayPlan.some((w) => w.id === workout.id);
  const isSaved = workout && savedWorkouts.some((w) => w.id === workout.id);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="animate-pulse grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6 aspect-square sm:aspect-[4/5] bg-zinc-800/60 rounded-3xl"></div>
          <div className="lg:col-span-6 space-y-6">
            <div className="h-6 w-32 bg-zinc-800 rounded"></div>
            <div className="h-10 w-3/4 bg-zinc-800 rounded"></div>
            <div className="h-20 w-full bg-zinc-800/60 rounded"></div>
            <div className="h-44 w-full bg-zinc-800/40 rounded-2xl"></div>
            <div className="h-32 w-full bg-zinc-800/30 rounded-2xl"></div>
            <div className="flex gap-4">
              <div className="h-12 w-48 bg-zinc-800 rounded-full"></div>
              <div className="h-12 w-40 bg-zinc-800 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="inline-flex p-4 rounded-full bg-red-500/10 text-red-400 mb-4 border border-red-500/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2 font-[family-name:var(--font-oswald)] uppercase">
          Workout Not Found
        </h2>
        <p className="text-zinc-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
          {error || "The workout lift you requested could not be located."}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent text-black font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Workouts
        </Link>
      </div>
    );
  }

  const {
    name,
    muscleGroups = [],
    equipment,
    difficulty,
    sets,
    reps,
    duration,
    caloriesBurned,
    rating,
    description,
    instructions = [],
  } = workout;

  const keySpecs = [
    { label: "EQUIPMENT", value: equipment },
    { label: "DIFFICULTY", value: difficulty },
    { label: "SETS", value: sets },
    { label: "REPS", value: reps },
    { label: "DURATION", value: `${duration} min` },
    { label: "CALORIES", value: `${caloriesBurned} kcal` },
    { label: "RATING", value: rating },
  ];

  return (
    <div className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-accent transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Library
          </Link>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column — Visual / Media */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative w-full aspect-square sm:aspect-[4/5] bg-dark-card border border-dark-border rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={imgSrc || "/banner.png"}
                alt={name}
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                referrerPolicy="no-referrer"
                onError={() => setImgSrc("/banner.png")}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 via-transparent to-transparent pointer-events-none"></div>
            </div>

            {/* Feature 2: Interactive Gym Rest Timer & Set Logger */}
            <RestTimer initialSets={sets} workoutName={name} />
          </div>

          {/* Right Column — Details & Action Buttons */}
          <div className="lg:col-span-6 flex flex-col space-y-8">
            {/* Title & Category Tags */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {muscleGroups.map((group, index) => (
                  <span
                    key={index}
                    className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-accent/15 text-accent border border-accent/25"
                  >
                    {group}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight font-[family-name:var(--font-oswald)]">
                {name}
              </h1>

              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed italic">
                &ldquo;{description}&rdquo;
              </p>
            </div>

            {/* Key Specs Table / Panel */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-5 sm:p-6 shadow-md">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4 pb-2 border-b border-dark-border">
                KEY SPECIFICATIONS
              </h2>
              <div className="divide-y divide-dark-border/60">
                {keySpecs.map((spec, i) => (
                  <div
                    key={i}
                    className="py-2.5 flex items-center justify-between text-sm"
                  >
                    <span className="text-zinc-500 font-semibold tracking-wider text-xs uppercase">
                      {spec.label}
                    </span>
                    <span className="text-zinc-200 font-medium text-right">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            {instructions.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  INSTRUCTIONS
                </h2>
                <div className="space-y-3">
                  {instructions.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3.5 bg-dark-card/50 border border-dark-border/60 p-3.5 rounded-xl"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/15 text-accent border border-accent/30 font-bold text-xs flex items-center justify-center">
                        {index + 1}
                      </span>
                      <p className="text-zinc-300 text-sm leading-snug pt-0.5">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Call To Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              {/* Primary: Add to Today's Plan */}
              <button
                onClick={() => addToTodayPlan(workout)}
                className={`flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-bold text-sm uppercase tracking-wide transition-all shadow-lg cursor-pointer ${
                  isInPlan
                    ? "bg-zinc-800 text-accent border border-accent/40 hover:bg-zinc-700"
                    : "bg-accent text-black hover:bg-[#b8e600] active:scale-95 shadow-accent/20"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span>
                  {isInPlan ? "In Today's Plan" : "Add to today's plan"}
                </span>
              </button>

              {/* Secondary: Save for later */}
              <button
                onClick={() => addToSaved(workout)}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm uppercase tracking-wide border transition-all cursor-pointer ${
                  isSaved
                    ? "border-accent text-accent bg-accent/10 hover:bg-accent/15"
                    : "border-dark-border text-zinc-300 hover:text-white hover:border-zinc-500 bg-dark-card"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill={isSaved ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                <span>{isSaved ? "Saved" : "Save for later"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
