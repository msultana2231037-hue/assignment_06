"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Clock3, Flame, Star, X } from "lucide-react";
import type { Workout } from "@/app/types/workout";
import { useFitlog } from "@/app/context/FitlogContext";

export default function WorkoutListItem({ workout, tab }: { workout: Workout; tab: "plan" | "saved" }) {
  const { done, markDone, removeFromPlan, removeFromSaved } = useFitlog();
  const isDone = done.includes(workout.id);
  return (
    <div className={`flex flex-col gap-4 rounded-2xl border border-[#252a33] bg-[#15181e] p-3 sm:flex-row sm:items-center sm:p-4 ${isDone ? "opacity-70" : ""}`}>
      <Image src={workout.image} alt={workout.name} width={128} height={80} className="h-20 w-full rounded-xl object-cover sm:w-32" />
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-black uppercase text-white">{workout.name}</h3>
        <p className="mt-1 text-xs text-zinc-500">{workout.equipment}</p>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-zinc-400">
          <span className="flex items-center gap-1"><Clock3 className="h-3 w-3 text-[#c8ff00]" />{workout.duration} min</span>
          <span className="flex items-center gap-1"><Flame className="h-3 w-3 text-[#c8ff00]" />{workout.caloriesBurned} kcal</span>
          <span className="flex items-center gap-1"><Star className="h-3 w-3 text-[#c8ff00]" />{workout.rating}</span>
          {isDone && <span className="font-bold text-[#c8ff00]">DONE</span>}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Link href={`/workouts/${workout.id}`} className="rounded-full border border-[#353b45] px-4 py-2 text-xs text-white hover:border-white">View Details</Link>
        {tab === "plan" && !isDone && <button onClick={() => markDone(workout.id)} className="inline-flex items-center gap-1 rounded-full bg-[#c8ff00] px-4 py-2 text-xs font-bold text-black hover:bg-[#d7ff4b]"><Check className="h-3.5 w-3.5" /> Mark as Done</button>}
        <button aria-label="Remove" onClick={() => tab === "plan" ? removeFromPlan(workout.id) : removeFromSaved(workout.id)} className="grid h-9 w-9 place-items-center rounded-full text-zinc-500 hover:bg-white/5 hover:text-white"><X className="h-4 w-4" /></button>
      </div>
    </div>
  );
}
