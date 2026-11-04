"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { useFitlog } from "@/app/context/FitlogContext";
import { LogoMark } from "@/app/components/icons";

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${active ? "bg-[#18250d] text-[#c8ff00]" : "text-zinc-400 hover:text-white"}`}>
      {children}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitlog();
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-19 border-b border-[#242830] bg-[#0c0e11]/95 backdrop-blur">
      <div className="mx-auto flex h-full max-w-295 items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-black tracking-[0.08em] text-white"
        >
          <Image
            src="/logo.png"
            alt="FitLog"
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
          FITLOG
        </Link>
        <nav className="absolute left-1/2 flex -translate-x-1/2 items-center gap-0.5 sm:gap-1">
          <NavLink
            href="/"
            active={pathname === "/" || pathname.startsWith("/workouts")}
          >
            Workouts
          </NavLink>
          <NavLink href="/my-plan?tab=plan" active={pathname === "/my-plan"}>
            My Plan
          </NavLink>
        </nav>
        <div className="flex items-center gap-4 text-xs text-zinc-400">
          <Link
            href="/my-plan?tab=plan"
            className="flex items-center gap-2 hover:text-white"
          >
            Plan{" "}
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#c8ff00] px-1 font-bold text-black">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-2 hover:text-white"
          >
            <span className="hidden sm:inline">Saved</span>
            <span className="grid h-5 min-w-5 place-items-center rounded-full border border-[#303640] px-1">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
