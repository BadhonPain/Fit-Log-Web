"use client";

import React, { useState, useEffect, useMemo } from "react";
import WorkoutCard from "./WorkoutCard";

const MUSCLE_GROUPS = [
  "All",
  "Chest",
  "Back",
  "Legs",
  "Arms",
  "Shoulders",
  "Core",
  "Full Body",
];

const LibrarySection = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("Duration");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState("All");

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

  // Filter & Sort pipeline
  const filteredAndSortedWorkouts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = workouts.filter((workout) => {
      // Muscle filter
      const matchesMuscle =
        selectedMuscle === "All" ||
        workout.muscleGroups?.some(
          (m) => m.toLowerCase() === selectedMuscle.toLowerCase()
        );

      // Search query
      const matchesSearch =
        !query ||
        workout.name?.toLowerCase().includes(query) ||
        workout.equipment?.toLowerCase().includes(query) ||
        workout.muscleGroups?.some((m) => m.toLowerCase().includes(query));

      return matchesMuscle && matchesSearch;
    });

    return [...filtered].sort((a, b) => {
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
  }, [workouts, searchQuery, selectedMuscle, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedMuscle("All");
  };

  return (
    <section id="library" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Title, Subtitle, and Sort Dropdown */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-dark-border/40">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-[family-name:var(--font-oswald)]">
              THE LIBRARY
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Sort Dropdown (Challenge C1) */}
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

        {/* Feature 1: Interactive Search & Muscle Group Filter Bar */}
        <div className="py-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full lg:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search lifts by name, muscle, equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-card border border-dark-border hover:border-zinc-700 focus:border-accent text-white placeholder-zinc-500 text-xs sm:text-sm rounded-xl pl-10 pr-10 py-2.5 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white"
                title="Clear search"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Muscle Group Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {MUSCLE_GROUPS.map((group) => {
              const active = selectedMuscle === group;
              return (
                <button
                  key={group}
                  onClick={() => setSelectedMuscle(group)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? "bg-accent text-black shadow-sm shadow-accent/20"
                      : "bg-dark-card border border-dark-border text-zinc-400 hover:text-white hover:border-zinc-600"
                  }`}
                >
                  {group}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter when filtered */}
        {!loading && !error && (
          <div className="pb-4 flex items-center justify-between text-xs text-zinc-400">
            <span>
              Showing{" "}
              <strong className="text-white">
                {filteredAndSortedWorkouts.length}
              </strong>{" "}
              of {workouts.length} lifts
              {(searchQuery || selectedMuscle !== "All") && (
                <span className="text-zinc-500 ml-1">
                  (filtered by {selectedMuscle !== "All" ? selectedMuscle : ""}
                  {searchQuery ? ` "${searchQuery}"` : ""})
                </span>
              )}
            </span>

            {(searchQuery || selectedMuscle !== "All") && (
              <button
                onClick={clearFilters}
                className="text-accent hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="pt-6">
            <div className="flex items-center justify-center gap-3 mb-8 py-3 text-zinc-400 text-sm">
              <span className="loading loading-spinner text-accent loading-md"></span>
              <span>Loading workouts library...</span>
            </div>

            {/* Skeleton Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden animate-pulse flex flex-col"
                >
                  <div className="w-full h-48 sm:h-52 bg-zinc-800/60"></div>
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

        {/* No Filter Results State */}
        {!loading && !error && filteredAndSortedWorkouts.length === 0 && (
          <div className="py-20 text-center bg-dark-card/30 border border-dark-border rounded-3xl my-6 p-8">
            <div className="w-12 h-12 rounded-full bg-zinc-800 mx-auto flex items-center justify-center text-zinc-400 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              No matching lifts found
            </h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto mb-4">
              We couldn&apos;t find any exercises matching your search or filter.
            </p>
            <button
              onClick={clearFilters}
              className="px-5 py-2 rounded-full bg-accent text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Workouts Grid */}
        {!loading && !error && filteredAndSortedWorkouts.length > 0 && (
          <div className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedWorkouts.map((workout) => (
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
