export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center ${className}`} aria-hidden="true">
      <span className="relative block h-5 w-5 rotate-45">
        <span className="absolute left-1/2 top-0 h-5 w-1 -translate-x-1/2 rounded-full bg-[#c8ff00]" />
        <span className="absolute left-0 top-2 h-1 w-5 rounded-full bg-[#c8ff00]" />
      </span>
    </span>
  );
}
