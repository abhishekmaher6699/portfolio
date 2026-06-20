"use client";

import React from "react";

export default function SpawnCatButton() {
  const handleSpawnCat = () => {
    if (typeof window !== "undefined" && (window as any).onekoSpawnCat) {
      (window as any).onekoSpawnCat();
    }
  };

  return (
    <button
      onClick={handleSpawnCat}
      className="fixed bottom-6 right-6 z-50 bg-secondary/80 hover:bg-secondary border border-border text-muted-foreground hover:text-foreground flex items-center justify-center rounded-full px-3 py-1.5 shadow-md backdrop-blur-sm transition-all duration-300 active:scale-95 cursor-pointer font-mono text-xs font-semibold select-none"
      title="Spawn a new cat! 🐾"
    >
      spawn cat 🐾
    </button>
  );
}
