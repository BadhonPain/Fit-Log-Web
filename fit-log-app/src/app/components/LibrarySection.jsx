"use client";

import React, { useState, useEffect } from "react";
import WorkoutCard from "./WorkoutCard";

const LibrarySection = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("Duration");

  useEffect(() => {
    let ignore = false;

    async function loadWorkouts() {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        if (!res.ok) {
          throw new Error(`Failed to fetch workouts (${res.status})`);
        }
        const data = await res.json();
        if (!ignore) {
          setWorkouts(data);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Failed to load workouts");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();

    return () => {
      ignore = true;
    };
  }, []);

  const handleRetry = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
      if (!res.ok) {
        throw new Error(`Failed to fetch workouts (${res.status})`);
      }
      const data = await res.json();
      setWorkouts(data);
    } catch (err) {
      setError(err.message || "Failed to load workouts");
    } finally {
      setLoading(false);
    }
  };

  // Sort logic for Challenge 1
  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "Duration") {
      return (b.duration || 0) - (a.duration || 0);
    }
    if (sortBy === "Calories") {
      return (b.caloriesBurned || 0) - (a.caloriesBurned || 0);
    }
    if (sortBy === "Rating") {
      return (b.rating || 0) - (a.rating || 0);
    }
    return 0;
  });

  return (
    <section id="library" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Title, Subtitle, and Sort Dropdown */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-dark-border/40">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-[family-name:var(--font-oswald)]">
              THE LIBRARY
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Sort Dropdown for Challenge 2 */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Sort By:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-dark-card border border-dark-border hover:border-zinc-700 text-white text-xs sm:text-sm font-medium rounded-xl pl-4 pr-10 py-2.5 cursor-pointer focus:outline-none focus:border-accent transition-colors"
              >
                <option value="Duration">Duration</option>
                <option value="Calories">Calories</option>
                <option value="Rating">Rating</option>
              </select>
              {/* Chevron icon */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="pt-10">
            {/* Loading animation badge */}
            <div className="flex items-center justify-center gap-3 mb-8 py-3 text-zinc-400 text-sm">
              <span className="loading loading-spinner text-accent loading-md"></span>
              <span>Loading workouts library...</span>
            </div>

            {/* Skeleton Grid (3x4) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden animate-pulse flex flex-col"
                >
                  <div className="w-full aspect- bg-zinc-800/60"></div>
                  <div className="p-5 space-y-4 flex-1 flex flex-col">
                    <div className="flex gap-2">
                      <div className="h-5 w-16 bg-zinc-800 rounded"></div>
                      <div className="h-5 w-12 bg-zinc-800 rounded"></div>
                    </div>
                    <div className="h-6 w-3/4 bg-zinc-800 rounded"></div>
                    <div className="h-4 w-1/2 bg-zinc-800/60 rounded"></div>
                    <div className="mt-auto pt-4 border-t border-dark-border flex justify-between">
                      <div className="h-4 w-14 bg-zinc-800 rounded"></div>
                      <div className="h-4 w-16 bg-zinc-800 rounded"></div>
                      <div className="h-4 w-10 bg-zinc-800 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="py-20 text-center">
            <div className="inline-flex p-4 rounded-full bg-red-500/10 text-red-400 mb-4 border border-red-500/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
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
            <h3 className="text-xl font-bold text-white mb-2">
              Failed to load workouts
            </h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto mb-6">
              {error}
            </p>
            <button
              onClick={handleRetry}
              className="px-6 py-2.5 rounded-full bg-accent text-black font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Workouts Grid */}
        {!loading && !error && (
          <div className="pt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedWorkouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LibrarySection;
