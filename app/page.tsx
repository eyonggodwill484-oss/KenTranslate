"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import KenTranslateLogo from "@/components/KenTranslateLogo";

export default function SplashScreen() {
  const router = useRouter();
  const [phase, setPhase] = useState<"enter" | "visible" | "exit">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("visible"), 100);
    const t2 = setTimeout(() => setPhase("exit"), 2800);
    const t3 = setTimeout(() => router.push("/auth"), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [router]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-white"
      style={{
        opacity: phase === "exit" ? 0 : 1,
        transition: "opacity 0.4s ease-out",
      }}
    >
      <div
        style={{
          opacity: phase === "enter" ? 0 : 1,
          transform: phase === "enter" ? "translateY(24px) scale(0.95)" : "translateY(0) scale(1)",
          transition: "opacity 0.7s ease-out, transform 0.7s cubic-bezier(0.34,1.56,0.64,1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
        }}
      >
        {/* Real KenTranslate logo */}
        <div style={{ animation: "logoReveal 0.9s cubic-bezier(0.34,1.56,0.64,1) both" }}>
          <KenTranslateLogo iconSize={110} showText textSize={22} />
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: 15,
            color: "#64748b",
            fontWeight: 400,
            letterSpacing: "0.01em",
            textAlign: "center",
          }}
        >
          Bridging English and Kɛnyaŋ Through AI
        </p>

        {/* Loading Bar + Spinner */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          {/* Spinner */}
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "3.5px solid #e2e8f0",
              borderTopColor: "#F07814",
              animation: "spin-smooth 0.9s linear infinite",
            }}
          />
          {/* Progress dots */}
          <div style={{ display: "flex", gap: 8 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#F07814",
                  animation: "bounce-gentle 1.4s ease-in-out infinite",
                  animationDelay: `${i * 0.18}s`,
                  opacity: 0.85,
                }}
              />
            ))}
          </div>
          <p style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>
            Initializing AI engine…
          </p>
        </div>

        {/* Language pill tags */}
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          {["English", "Kɛnyaŋ", "AI-Powered"].map((tag, i) => (
            <span
              key={tag}
              style={{
                padding: "5px 14px",
                borderRadius: 100,
                fontSize: 12,
                fontWeight: 600,
                background: i === 2 ? "#F07814" : "#012D5A",
                color: "white",
                opacity: phase === "visible" ? 1 : 0,
                transform: phase === "visible" ? "translateY(0)" : "translateY(10px)",
                transition: `opacity 0.5s ease ${0.4 + i * 0.1}s, transform 0.5s ease ${0.4 + i * 0.1}s`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin-smooth { to { transform: rotate(360deg); } }
        @keyframes bounce-gentle {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
        }
        @keyframes logoReveal {
          0%   { opacity: 0; transform: scale(0.6) rotate(-12deg); }
          60%  { transform: scale(1.06) rotate(2deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
