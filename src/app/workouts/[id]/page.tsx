import { notFound } from "next/navigation";
import { getWorkout } from "@/app/lib/api";
import WorkoutDetailsClient from "@/app/components/WorkoutDetailsClient";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function WorkoutDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  return <WorkoutDetailsClient workout={workout} />;
}
