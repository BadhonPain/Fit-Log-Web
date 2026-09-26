"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import { toast } from "react-toastify";

const PlanContext = createContext(null);

const STORAGE_KEY_PLAN = "fitlog_today_plan";
const STORAGE_KEY_SAVED = "fitlog_saved_workouts";
const MAX_PLAN_LIFTS = 5;

const subscribe = (callback) => {
  window.addEventListener("storage", callback);
  window.addEventListener("fitlog_store_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("fitlog_store_change", callback);
  };
};

const getPlanSnapshot = () => {
  try {
    return localStorage.getItem(STORAGE_KEY_PLAN) || "[]";
  } catch {
    return "[]";
  }
};

const getSavedSnapshot = () => {
  try {
    return localStorage.getItem(STORAGE_KEY_SAVED) || "[]";
  } catch {
    return "[]";
  }
};

const getServerSnapshot = () => "[]";

export const PlanProvider = ({ children }) => {
  const rawPlan = useSyncExternalStore(
    subscribe,
    getPlanSnapshot,
    getServerSnapshot
  );
  const rawSaved = useSyncExternalStore(
    subscribe,
    getSavedSnapshot,
    getServerSnapshot
  );

  const todayPlan = useMemo(() => {
    try {
      return JSON.parse(rawPlan);
    } catch {
      return [];
    }
  }, [rawPlan]);

  const savedWorkouts = useMemo(() => {
    try {
      return JSON.parse(rawSaved);
    } catch {
      return [];
    }
  }, [rawSaved]);

  const notifyChange = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("fitlog_store_change"));
    }
  };

  // Add to today's plan
  const addToTodayPlan = (workout) => {
    if (todayPlan.some((item) => item.id === workout.id)) {
      toast.info(`"${workout.name}" is already in today's plan!`);
      return false;
    }

    if (todayPlan.length >= MAX_PLAN_LIFTS) {
      toast.warning(
        `Cap of ${MAX_PLAN_LIFTS} lifts reached for today! Finish them first.`
      );
      return false;
    }

    const updated = [...todayPlan, { ...workout, isDone: false }];
    try {
      localStorage.setItem(STORAGE_KEY_PLAN, JSON.stringify(updated));
      notifyChange();
    } catch (e) {
      console.error("Failed to save plan to localStorage", e);
    }
    toast.success(`Added "${workout.name}" to today's plan! 💪`);
    return true;
  };

  // Remove from today's plan
  const removeFromTodayPlan = (id) => {
    const item = todayPlan.find((w) => w.id === id);
    const updated = todayPlan.filter((w) => w.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY_PLAN, JSON.stringify(updated));
      notifyChange();
    } catch (e) {
      console.error("Failed to update plan in localStorage", e);
    }
    toast.info(`Removed "${item?.name || "workout"}" from today's plan`);
  };

  // Toggle done status
  const toggleWorkoutDone = (id) => {
    let nowDone = false;
    const updated = todayPlan.map((item) => {
      if (item.id === id) {
        nowDone = !item.isDone;
        return { ...item, isDone: nowDone };
      }
      return item;
    });
    try {
      localStorage.setItem(STORAGE_KEY_PLAN, JSON.stringify(updated));
      notifyChange();
    } catch (e) {
      console.error("Failed to update workout status", e);
    }
    if (nowDone) {
      toast.success("Workout marked as completed! 🔥");
    } else {
      toast.info("Workout marked as active");
    }
  };

  // Add to saved
  const addToSaved = (workout) => {
    if (savedWorkouts.some((item) => item.id === workout.id)) {
      toast.info(`"${workout.name}" is already in saved workouts!`);
      return false;
    }

    const updated = [...savedWorkouts, workout];
    try {
      localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(updated));
      notifyChange();
    } catch (e) {
      console.error("Failed to save workout to localStorage", e);
    }
    toast.success(`Saved "${workout.name}" for later! ⭐`);
    return true;
  };

  // Remove from saved
  const removeFromSaved = (id) => {
    const item = savedWorkouts.find((w) => w.id === id);
    const updated = savedWorkouts.filter((w) => w.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(updated));
      notifyChange();
    } catch (e) {
      console.error("Failed to update saved workouts..", e);
    }
    toast.info(`Removed "${item?.name || "workout"}" from saved`);
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        planCount: todayPlan.length,
        savedCount: savedWorkouts.length,
        isLoaded: true,
        addToTodayPlan,
        removeFromTodayPlan,
        toggleWorkoutDone,
        addToSaved,
        removeFromSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {

    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
};
