"use client";

import { CheckCircle2 } from "lucide-react";
import { useFitlog } from "@/app/context/FitlogContext";

export default function ToastHost() {
  const { toasts } = useFitlog();
  return (
    <div className="fixed right-4 top-20 z-100 flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2">
      {toasts.map((toast) => (
        <div key={toast.id} className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#171a20] px-4 py-3 text-sm text-white shadow-2xl">
          <CheckCircle2 className="h-5 w-5 text-[#c8ff00]" />
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
