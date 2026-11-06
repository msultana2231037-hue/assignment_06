"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import WorkoutListItem from "@/app/components/WorkoutListItem";
import { useFitlog } from "@/app/context/FitlogContext";
import type { PlanTab, SortKey } from "@/app/types/workout";

export default function MyPlanClient({ initialTab }: { initialTab: PlanTab }) {
  const [tab, setTab] = useState<PlanTab>(initialTab);
  const [sort, setSort] = useState<SortKey>("duration");
  const { plan, saved } = useFitlog();
  const current = tab === "plan" ? plan : saved;
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
  const totalMinutes = plan.reduce((sum, item) => sum + item.duration, 0);
  const totalCalories = plan.reduce((sum, item) => sum + item.caloriesBurned, 0);

  const changeTab = (next: PlanTab) => setTab(next);

  return (
    <div className="mx-auto max-w-260">
      <div>
        <h1 className="font-display text-4xl uppercase sm:text-5xl">MY PLAN</h1>
        <p className="mt-1 text-sm text-zinc-500">Cap of five lifts for today. Finish them, then load more.</p>
      </div>
      <div className="mt-6 grid overflow-hidden rounded-2xl border border-[#272d36] bg-[#15181e] md:grid-cols-3">
        <Metric label="Exercises" value={plan.length} accent />
        <Metric label="Minutes" value={totalMinutes} />
        <Metric label="Calories" value={totalCalories} />
      </div>
      <div className="mt-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="inline-flex w-fit rounded-xl border border-[#252a33] bg-[#111419] p-1">
          <Link href="/my-plan?tab=plan" onClick={() => changeTab("plan")} className={`rounded-lg px-5 py-2 text-xs ${tab === "plan" ? "bg-[#222730] font-bold text-white" : "text-zinc-500"}`}>Today's Plan</Link>
          <Link href="/my-plan?tab=saved" onClick={() => changeTab("saved")} className={`rounded-lg px-5 py-2 text-xs ${tab === "saved" ? "bg-[#222730] font-bold text-white" : "text-zinc-500"}`}>Saved</Link>
        </div>
        <label className="flex items-center gap-2 text-xs text-zinc-500">Sort By <span className="relative"><select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="appearance-none rounded-lg border border-[#2a3039] bg-[#111419] py-2 pl-3 pr-9 text-xs text-white"><option value="duration">Duration</option><option value="calories">Calories</option><option value="rating">Rating</option></select><ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2" /></span></label>
      </div>
      <div className="mt-5 space-y-3">
        {sorted.length === 0 ? (
          <div className="grid min-h-75 place-items-center rounded-2xl border border-dashed border-[#292f38] text-center"><div><h2 className="font-display text-2xl">NOTHING HERE YET</h2><p className="mt-2 text-xs text-zinc-500">Browse the library and add a lift to get today moving.</p><Link href="/" className="mt-5 inline-block rounded-full bg-[#c8ff00] px-5 py-3 text-xs font-black text-black">Go to workouts</Link></div></div>
        ) : sorted.map((workout) => <WorkoutListItem key={workout.id} workout={workout} tab={tab} />)}
      </div>
    </div>
  );
}

function Metric({ label, value, accent = false }: { label: string; value: number; accent?: boolean }) {
  return <div className="border-b border-[#252a33] p-5 last:border-0 md:border-b-0 md:border-r md:last:border-0"><p className="text-xs text-zinc-500">{label}</p><p className={`mt-1 font-display text-4xl ${accent ? "text-[#c8ff00]" : "text-white"}`}>{value}</p></div>;
}