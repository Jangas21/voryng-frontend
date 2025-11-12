"use client";
import dynamic from "next/dynamic";

const LiquidEther = dynamic(
  () => import("@/components/LiquidEther").then((mod) => mod.default),
  { ssr: false }
);

export default function LiquidBackground() {
  return (
    <div
      className="
        fixed inset-0 
        z-0
        overflow-hidden
      "
      style={{ pointerEvents: "auto" }}
    >
      <LiquidEther
        colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
        mouseForce={30}
        cursorSize={100}
        isViscous={false}
        viscous={50}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={true}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={3}
        takeoverDuration={0.25}
        autoResumeDelay={2000}
        autoRampDuration={0.6}
      />
    </div>
  );
}
