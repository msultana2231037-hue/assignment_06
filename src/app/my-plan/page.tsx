"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { useFitlog } from "@/app/context/FitlogContext";
import WorkoutListItem from "@/app/components/WorkoutListItem";

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const { plan, saved } = useFitlog();

  const [tab, setTab] = useState<Tab>("plan");
  const [sort, setSort] = useState<SortOption>("duration");

  /*
   * Select the correct data based on the active tab.
   *
   * Today's Plan -> plan
   * Saved        -> saved
   */
  const current = tab === "plan" ? plan : saved;

  /*
   * Calculate statistics from ONLY the current tab.
   */
  const stats = useMemo(() => {
    const exercises = current.length;

    const minutes = current.reduce(
      (total, workout) => total + workout.duration,
      0,
    );

    const calories = current.reduce(
      (total, workout) => total + workout.caloriesBurned,
      0,
    );

    return {
      exercises,
      minutes,
      calories,
    };
  }, [current]);

  /*
   * Sort only the currently selected tab.
   */
  const sorted = useMemo(() => {
    const items = [...current];

    items.sort((a, b) => {
      if (sort === "duration") {
        return b.duration - a.duration;
      }

      if (sort === "calories") {
        return b.caloriesBurned - a.caloriesBurned;
      }

      if (sort === "rating") {
        return b.rating - a.rating;
      }

      return 0;
    });

    return items;
  }, [current, sort]);

  return (
    <main className="min-h-screen bg-[#0c0e10] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
            MY PLAN
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 overflow-hidden rounded-2xl border border-[#292e37] bg-[#15181e] sm:grid-cols-3">
          {/* Exercises */}
          <div className="border-b border-[#292e37] p-5 sm:border-b-0 sm:border-r">
            <p className="text-sm text-zinc-500">Exercises</p>

            <p className="mt-1 text-4xl font-black text-[#c8ff00]">
              {stats.exercises}
            </p>
          </div>

          {/* Minutes */}
          <div className="border-b border-[#292e37] p-5 sm:border-b-0 sm:border-r">
            <p className="text-sm text-zinc-500">Minutes</p>

            <p className="mt-1 text-4xl font-black text-white">
              {stats.minutes}
            </p>
          </div>

          {/* Calories */}
          <div className="p-5">
            <p className="text-sm text-zinc-500">Calories</p>

            <p className="mt-1 text-4xl font-black text-white">
              {stats.calories}
            </p>
          </div>
        </div>

        {/* Tabs + Sort */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Tabs */}
          <div className="flex w-fit rounded-xl border border-[#292e37] p-1">
            <button
              type="button"
              onClick={() => setTab("plan")}
              className={`rounded-lg px-6 py-2 text-xs transition ${
                tab === "plan"
                  ? "bg-[#242a34] font-bold text-white"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              Today's Plan
            </button>

            <button
              type="button"
              onClick={() => setTab("saved")}
              className={`rounded-lg px-6 py-2 text-xs transition ${
                tab === "saved"
                  ? "bg-[#242a34] font-bold text-white"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">Sort By</span>

            <div className="relative">
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
                className="appearance-none rounded-xl border border-[#292e37] bg-[#0f1115] px-4 py-2 pr-10 text-xs text-white outline-none"
              >
                <option value="duration">Duration</option>

                <option value="calories">Calories</option>

                <option value="rating">Rating</option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            </div>
          </div>
        </div>

        {/* Workout List */}
        <div className="mt-6 space-y-3">
          {sorted.length > 0 ? (
            sorted.map((workout) => (
              <WorkoutListItem key={workout.id} workout={workout} tab={tab} />
            ))
          ) : (
            <div className="rounded-2xl border border-[#292e37] bg-[#15181e] px-6 py-12 text-center">
              <p className="text-sm text-zinc-500">
                {tab === "plan"
                  ? "No workouts in today's plan."
                  : "No saved workouts yet."}
              </p>

              <Link
                href="/#library"
                className="mt-4 inline-block rounded-full bg-[#c8ff00] px-5 py-2 text-xs font-bold text-black"
              >
                Browse Workouts
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
