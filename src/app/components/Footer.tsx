import Image from "next/image";

export default function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 h-14 border-t border-[#20242b] bg-[#0c0e11]">
      <div className="mx-auto flex h-full max-w-295 items-center justify-between px-4 text-[10px] text-zinc-500 sm:px-6 sm:text-xs">
        <div className="flex items-center gap-2 text-l font-black tracking-[0.08em] text-white">
          <Image
            src="/logo.png"
            alt="FitLog"
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
          FITLOG
        </div>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
