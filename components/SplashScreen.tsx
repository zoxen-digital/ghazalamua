"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

function alreadyShown() {
  try {
    return sessionStorage.getItem("splash-shown") === "1";
  } catch {
    return false;
  }
}

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const skip = alreadyShown();
    const fadeDelay = skip ? 0 : 900;
    const hideDelay = skip ? 0 : 1300;

    const fadeTimer = setTimeout(() => setFading(true), fadeDelay);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem("splash-shown", "1");
      } catch {
        // ignore
      }
    }, hideDelay);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[color:var(--color-cream)] transition-opacity duration-400 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--color-pink-soft)]">
          <Heart size={28} className="fill-[color:var(--color-rose)] text-[color:var(--color-rose)] animate-pulse" />
          <span className="absolute inset-0 rounded-full border-2 border-[color:var(--color-blush)] animate-ping" />
        </span>
        <p className="font-script text-3xl text-[color:var(--color-rose)]">Ghazala Qureshi</p>
        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-muted)]">Makeup Artist</p>
      </div>
    </div>
  );
}
