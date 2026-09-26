"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePlan } from "../context/PlanContext";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState("today"); // 'today' | 'saved'
  const {
    todayPlan,
    savedWorkouts,
    removeFromTodayPlan,
    toggleWorkoutDone,
    removeFromSaved,
    addToTodayPlan,
    isLoaded,
  } = usePlan();

  // Metrics summary based on today's plan
  const totalExercises = todayPlan.length;
  const totalMinutes = todayPlan.reduce((acc, item) => acc + (Number(item.duration) || 0), 0);
  const totalCalories = todayPlan.reduce((acc, item) => acc + (Number(item.caloriesBurned) || 0), 0);

  const currentList = activeTab === "today" ? todayPlan : savedWorkouts;

  return (
    <div className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight font-[family-name:var(--font-oswald)]">
            MY PLAN
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {/* Exercises Card */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-6 flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Exercises
            </span>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-accent font-[family-name:var(--font-oswald)]">
                {totalExercises}
              </span>
              <span className="text-xs text-zinc-500 font-medium">/ 5 max</span>
            </div>
          </div>

          <div className="bg-dark-card border border-dark-border rounded-2xl p-6 flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Minutes
            </span>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-white font-[family-name:var(--font-oswald)]">
                {totalMinutes}
              </span>
              <span className="text-xs text-zinc-500 font-medium">total</span>
            </div>
          </div>

          {/* Calories Card */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-6 flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Calories
            </span>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-white font-[family-name:var(--font-oswald)]">
                {totalCalories}
              </span>
              <span className="text-xs text-zinc-500 font-medium">est. burned</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-dark-border pb-4 mb-8">
          <div className="inline-flex p-1 rounded-xl bg-dark-card border border-dark-border">
            <button
              onClick={() => setActiveTab("today")}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wide transition-all cursor-pointer ${
                activeTab === "today"
                  ? "bg-accent text-black shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Today&apos;s Plan ({todayPlan.length})
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wide transition-all cursor-pointer ${
                activeTab === "saved"
                  ? "bg-accent text-black shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Saved ({savedWorkouts.length})
            </button>
          </div>
        </div>

        {!isLoaded && (
          <div className="py-20 flex flex-col items-center justify-center text-zinc-400 gap-3">
            <span className="loading loading-spinner text-accent loading-lg"></span>
            <p className="text-sm font-medium">Loading workouts…</p>
          </div>
        )}

        {/* Empty State */}
        {isLoaded && currentList.length === 0 && (
          <div className="py-20 px-4 text-center bg-dark-card/40 border border-dark-border/80 rounded-3xl max-w-2xl mx-auto my-6">
            <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 mx-auto flex items-center justify-center text-accent mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-white uppercase tracking-tight font-[family-name:var(--font-oswald)]">
              NOTHING HERE YET
            </h2>
            <p className="text-zinc-400 text-sm max-w-sm mx-auto mt-2 mb-6">
              {activeTab === "today"
                ? "Browse the library and add a lift to get today moving."
                : "Save your favorite lifts to easily queue them into upcoming training sessions."}
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-black font-bold text-xs uppercase tracking-wider hover:bg-[#b8e600] active:scale-95 transition-all shadow-lg shadow-accent/20"
            >
              Go to workouts
            </Link>
          </div>
        )}

        {/* Workout Cards List */}
        {isLoaded && currentList.length > 0 && (
          <div className="space-y-4">
            {currentList.map((workout) => {
              const isDone = workout.isDone;

              return (
                <div
                  key={workout.id}
                  className={`flex flex-col md:flex-row md:items-center justify-between p-4 sm:p-5 bg-dark-card border rounded-2xl gap-5 transition-all ${
                    isDone
                      ? "border-green-500/40 bg-zinc-900/40 opacity-80"
                      : "border-dark-border hover:border-zinc-700"
                  }`}
                >

                  <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-zinc-800 rounded-xl overflow-hidden border border-dark-border">
                      <Image
                        src={workout.image || "/banner.png"}
                        alt={workout.name}
                        fill
                        unoptimized
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3
                          className={`font-bold text-base sm:text-lg uppercase tracking-wide truncate font-[family-name:var(--font-oswald)] ${
                            isDone
                              ? "line-through text-zinc-400"
                              : "text-white"
                          }`}
                        >
                          {workout.name}
                        </h3>
                        {isDone && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-green-500/20 text-green-400 border border-green-500/30">
                            Done
                          </span>
                        )}
                      </div>

                      <p className="text-zinc-400 text-xs sm:text-sm mt-0.5 truncate">
                        {workout.equipment}
                      </p>

                      {/* Stats row with icons */}
                      <div className="flex items-center gap-4 sm:gap-6 mt-3 text-xs text-zinc-400">
                        {/* Duration */}
                        <div className="flex items-center gap-1.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3.5 h-3.5 text-zinc-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <circle cx="12" cy="12" r="9" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
                          </svg>
                          <span>{workout.duration} min</span>
                        </div>

                        {/* Calories */}
                        <div className="flex items-center gap-1.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3.5 h-3.5 text-zinc-400"
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
                          <span>{workout.caloriesBurned} kcal</span>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-zinc-300 font-medium">{workout.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap self-end md:self-center">
                    {/* View Details button */}
                    <Link
                      href={`/workout/${workout.id}`}
                      className="px-4 py-2 rounded-xl bg-dark-bg border border-dark-border text-zinc-300 hover:text-white hover:border-zinc-500 text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      View Details
                    </Link>

                    {activeTab === "today" && (
                      <button
                        onClick={() => toggleWorkoutDone(workout.id)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          isDone
                            ? "bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30"
                            : "bg-accent/15 text-accent border border-accent/30 hover:bg-accent hover:text-black"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{isDone ? "Done" : "Mark as Done"}</span>
                      </button>
                    )}

                    {/* Saved tab action: Add to Today's Plan */}
                    {activeTab === "saved" && (
                      <button
                        onClick={() => addToTodayPlan(workout)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-black font-bold text-xs uppercase tracking-wider hover:bg-[#b8e600] active:scale-95 transition-all cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Add to Plan</span>
                      </button>
                    )}

                    {/* Remove (X) button */}
                    <button
                      onClick={() =>
                        activeTab === "today"
                          ? removeFromTodayPlan(workout.id)
                          : removeFromSaved(workout.id)
                      }
                      title="Remove workout"
                      className="p-2 rounded-xl bg-dark-bg border border-dark-border text-zinc-400 hover:text-red-400 hover:border-red-500/40 transition-colors cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
