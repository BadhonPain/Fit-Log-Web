"use client";

import React, { useState, useEffect, useRef } from "react";

// Web Audio API chime generator for workout timers
const playChime = () => {
  try {
    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    // Pleasant two-tone chime
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.setValueAtTime(880, now + 0.15); // A5

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.6);
  } catch (err) {
    console.warn("Audio chime could not play", err);
  }
};

export default function RestTimer({ initialSets = 4, workoutName = "Lift" }) {
  const [initialSeconds, setInitialSeconds] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);
  const totalSets = initialSets || 4;

  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, timeLeft]);

  const startTimer = (seconds) => {
    const s = seconds !== undefined ? seconds : timeLeft;
    if (s <= 0) {
      setTimeLeft(initialSeconds);
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = (newDuration) => {
    setIsRunning(false);
    const duration = newDuration || initialSeconds;
    setTimeLeft(duration);
    if (newDuration) setInitialSeconds(newDuration);
  };

  const advanceSet = () => {
    if (currentSet < totalSets) {
      setCurrentSet((prev) => prev + 1);
      // Auto-start rest timer for next set
      setTimeLeft(initialSeconds);
      setIsRunning(true);
    } else {
      playChime();
      alert(`🎉 Congratulations! You have completed all ${totalSets} sets of ${workoutName}!`);
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining < 10 ? "0" : ""}${remaining}`;
  };

  const progressPercent = initialSeconds > 0 ? ((initialSeconds - timeLeft) / initialSeconds) * 100 : 0;

  return (
    <div className="bg-dark-card border border-dark-border rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between pb-3 border-b border-dark-border mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse"></span>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">
            GYM REST TIMER & SET LOG
          </h3>
        </div>
        <div className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
          Set {currentSet} of {totalSets}
        </div>
      </div>

      {/* Timer Display */}
      <div className="flex flex-col items-center py-2">
        <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-[family-name:var(--font-oswald)]">
          {formatTime(timeLeft)}
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mt-1">
          {isRunning ? "REST INTERVAL IN PROGRESS" : timeLeft === 0 ? "REST COMPLETE! READY FOR NEXT SET" : "REST INTERVAL"}
        </span>

        {/* Progress Bar */}
        <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-3 overflow-hidden">
          <div
            className="bg-accent h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Preset Quick Buttons */}
      <div className="grid grid-cols-4 gap-2 mt-4 mb-4">
        {[30, 60, 90, 120].map((sec) => (
          <button
            key={sec}
            onClick={() => resetTimer(sec)}
            className={`py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              initialSeconds === sec && !isRunning
                ? "bg-accent/20 text-accent border border-accent/40"
                : "bg-dark-bg border border-dark-border text-zinc-400 hover:text-white"
            }`}
          >
            {sec}s
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2.5">
        {isRunning ? (
          <button
            onClick={pauseTimer}
            className="flex-1 py-2.5 rounded-xl bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            Pause
          </button>
        ) : (
          <button
            onClick={() => startTimer()}
            className="flex-1 py-2.5 rounded-xl bg-accent text-black font-bold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-colors cursor-pointer"
          >
            {timeLeft === 0 ? "Restart Rest" : "Start Rest"}
          </button>
        )}

        <button
          onClick={() => resetTimer()}
          title="Reset timer"
          className="p-2.5 rounded-xl bg-dark-bg border border-dark-border text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        <button
          onClick={advanceSet}
          className="flex-1 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 hover:border-accent text-accent font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
        >
          Finish Set {currentSet} ✓
        </button>
      </div>
    </div>
  );
}
