"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "@/components/use-reduced-motion";

const OrbScene = dynamic(() => import("@/components/orb-scene"), {
  ssr: false,
  loading: () => <div className="orb-fallback" />,
});

export function HeroCanvas() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="hero-canvas" aria-hidden="true">
      <OrbScene paused={reducedMotion} />
    </div>
  );
}
