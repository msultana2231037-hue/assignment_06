import type { Workout } from "@/app/types/workout";

export const API_URL =
  process.env.NEXT_PUBLIC_FITLOG_API_URL ||
  "https://api.api-store.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(API_URL, { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch workouts");
  return response.json();
}

export async function getWorkout(id: string | number): Promise<Workout | null> {
  const response = await fetch(`${API_URL}/${id}`, { cache: "no-store" });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Failed to fetch workout");
  return response.json();
}
