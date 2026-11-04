import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-170px)] max-w-175 place-items-center text-center">
      <div>
        <p className="text-xs font-black tracking-[.3em] text-[#c8ff00]">404 ERROR</p>
        <h1 className="mt-3 font-display text-6xl">PAGE NOT FOUND</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-zinc-500">The page you requested does not exist in FitLog.</p>
        <Link href="/" className="mt-7 inline-block rounded-lg bg-[#c8ff00] px-6 py-3 text-xs font-black text-black">GO TO WORKOUTS</Link>
      </div>
    </div>
  );
}
