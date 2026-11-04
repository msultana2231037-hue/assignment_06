"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarPlus, Bookmark, Check } from "lucide-react";
import type { Workout } from "@/app/types/workout";
import { useFitlog } from "@/app/context/FitlogContext";

export default function WorkoutDetailsClient({ workout }: { workout: Workout }) {
  const { addToPlan, saveWorkout, isInPlan, isSaved } = useFitlog();
  const planned = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  return (
    <div className="mx-auto max-w-295">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.02fr] lg:items-start">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-[#272d36] bg-[#15181e]">
          <Image src={workout.image} alt={workout.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
        </div>
        <div className="pt-1">
          <h1 className="font-display text-4xl leading-none uppercase sm:text-5xl">{workout.name}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">{workout.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">{workout.muscleGroups.map((g) => <span key={g} className="rounded-full bg-[#c8ff00] px-3 py-1 text-[10px] font-black uppercase text-black">{g}</span>)}</div>

          <div className="mt-3 overflow-hidden rounded-2xl border border-[#272d36] bg-[#15181e]">
            {[['EQUIPMENT', workout.equipment], ['DIFFICULTY', workout.difficulty], ['SETS', String(workout.sets)], ['REPS', workout.reps], ['DURATION', `${workout.duration} min`], ['CALORIES', `${workout.caloriesBurned} kcal`], ['RATING', String(workout.rating)]].map(([label, value]) => <div key={label} className="flex items-center justify-between border-b border-[#252a33] px-4 py-3 text-xs last:border-b-0"><span className="font-bold tracking-widest text-zinc-500">{label}</span><span className="text-zinc-200">{value}</span></div>)}
          </div>

          <div className="mt-3">
            <h2 className="font-display text-xl">INSTRUCTIONS</h2>
            <ol className="mt-3 space-y-3">{workout.instructions.map((instruction, i) => <li key={instruction} className="flex gap-3 text-xs leading-5 text-zinc-400"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#343a44] text-[10px] text-white">{i + 1}</span>{instruction}</li>)}</ol>
          </div>

          <div className="mt-3 flex flex-wrap gap-3">
            <button disabled={planned} onClick={() => addToPlan(workout)} className="inline-flex items-center gap-2 rounded-lg bg-[#c8ff00] px-5 py-3 text-xs font-black text-black disabled:cursor-not-allowed disabled:opacity-50"><CalendarPlus className="h-4 w-4" />{planned ? "Already in today's plan" : "Add to today's plan"}</button>
            <button disabled={saved} onClick={() => saveWorkout(workout)} className="inline-flex items-center gap-2 rounded-lg border border-[#343a44] px-5 py-3 text-xs font-semibold text-white hover:border-white disabled:opacity-50"><Bookmark className="h-4 w-4" />{saved ? "Saved" : "Save for later"}</button>
          </div>
          {planned && <p className="mt-3 flex items-center gap-2 text-xs text-[#c8ff00]"><Check className="h-4 w-4" /> This lift is in today's plan.</p>}
          
        </div>
      </div>
    </div>
  );
}
