"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/app/types/workout";

type WorkoutCardProps = {
  workout: Workout;
};

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link href={`/workouts/${workout.id}`}>
      <div className="overflow-hidden rounded-2xl border border-[#292e37] bg-[#15181e]">
        {/* Image */}
        <div className="relative h-52 w-full">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        {/* Muscle*/}
        <div className="ml-5 mt-5 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#c8ff00] px-3 py-1 text-xs font-bold text-[#191917]"
            >
              {muscle.toUpperCase()}
            </span>
          ))}
        </div>
         {/* Workout */}
        <div className="p-5">
          
          <h3 className="text-xl font-normal uppercase leading-tight text-white">
            {workout.name}
          </h3>

          <p className="mt-2.5 text-xs font-light text-[#8a8c83]">
            {workout.equipment}
          </p>
          {/* workout detail*/}
          <div className="mt-4 flex items-center justify-start gap-8 border-t border-[#292e37] pt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-[#8a8c83]" />
              <span className="text-xs font-light leading-none text-[#8a8c83]">
                {workout.duration} min
              </span>
            </div>
            
             <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 shrink-0 text-[#8a8c83]" />
              <span className="text-xs font-light leading-none text-[#8a8c83]">
                {workout.caloriesBurned}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 shrink-0 text-[#8a8c83]" />
              <span className="text-xs font-light leading-none text-[#8a8c83]">
                {workout.rating}
              </span>
            </div>

       
           </div> 
        </div> {/* Workout section */}
      </div> {/* Main card  */}
    </Link>
  );
}