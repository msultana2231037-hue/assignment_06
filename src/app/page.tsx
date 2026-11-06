
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ChevronDown } from "lucide-react";
import WorkoutCard from "@/app/components/WorkoutCard";
import type { SortKey, Workout } from "@/app/types/workout";
import { API_URL } from "@/app/lib/api";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sort, setSort] = useState<SortKey>("duration");

  useEffect(() => {
    let active = true;
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error("fetch failed");
        return response.json();
      })
      .then((data: Workout[]) => { if (active) setWorkouts(data); })
      .catch(() => { if (active) setError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const sorted = useMemo(() => [...workouts].sort((a, b) => b[sort === "calories" ? "caloriesBurned" : sort] - a[sort === "calories" ? "caloriesBurned" : sort]), [workouts, sort]);


  return (
    <div className="mx-auto max-w-295">
      <section className="grid min-h-105 overflow-hidden rounded-2xl border border-[#292e37] bg-[#15181e] lg:grid-cols-[1.2fr_.8fr]">
        <div className="flex flex-col justify-center px-7 py-10 sm:px-12 lg:px-14">
          <p className="mb-5 text-xs font-black tracking-widest text-[#c8ff00]">
            WORKOUT LIBRARY
          </p>
          <h1 className="max-w-162.5 font-display text-5xl leading-[.95] text-white sm:text-6xl">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-400">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>
          <Link
            href="#library"
            className="mt-7 inline-flex w-fit items-center gap-2 rounded-md bg-[#c8ff00] px-5 py-3 text-xs font-black text-black hover:bg-[#d7ff4b]"
          >
            BROWSE WORKOUTS <ArrowDown className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative min-h-75 bg-[radial-gradient(circle_at_center,#30343b,transparent_62%)]">
          <Image
            src="/banner.png"
            alt="Workout illustration"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-contain p-8 sm:p-14"
            priority
          />
        </div>
      </section>

      <section id="library" className="scroll-mt-24 pt-14">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-4xl uppercase text-white">
              THE LIBRARY
            </h2>
            <p className="mt-1 text-xs text-zinc-500">
              Twelve lifts covering every major muscle group.
            </p>
          </div>
          <label className="flex items-center gap-2 text-xs text-zinc-500">
            Sort By
            <span className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="appearance-none rounded-lg border border-[#2a3039] bg-[#111419] py-2 pl-3 pr-9 text-xs text-white outline-none"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2" />
            </span>
          </label>
        </div>
        {loading ? (
          <div className="grid min-h-75 place-items-center rounded-2xl border border-dashed border-[#2a3039]">
            <div className="text-center">
              <div className="mb-3 flex justify-center gap-2">
                <i className="loading-dot h-3 w-3 rounded-full bg-[#c8ff00]" />
                <i className="loading-dot h-3 w-3 rounded-full bg-[#c8ff00]" />
                <i className="loading-dot h-3 w-3 rounded-full bg-[#c8ff00]" />
              </div>
              <p className="font-display text-xl">LOADING WORKOUTS…</p>
              <p className="mt-1 text-xs text-zinc-500">
                Fetching the exercise library.
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-900/50 bg-red-950/20 p-8 text-center">
            <p className="font-display text-xl">COULDN'T LOAD THE LIBRARY</p>
            <p className="mt-2 text-sm text-zinc-500">
              Check your connection and refresh the page.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}