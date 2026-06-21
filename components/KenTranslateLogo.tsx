import React from "react";

interface LogoProps {
  /** Height of the icon part in px */
  iconSize?: number;
  /** Show the "KɛnTranslate" text below the icon */
  showText?: boolean;
  /** Show icon + text side-by-side (for sidebar / header) */
  horizontal?: boolean;
  /** Text font size when horizontal */
  textSize?: number;
}

/**
 * SVG recreation of the KenTranslate brand logo:
 * Two overlapping speech bubbles (orange left, navy right)
 * with a white "K" and "KɛnTranslate" text.
 */
export default function KenTranslateLogo({
  iconSize = 56,
  showText = true,
  horizontal = false,
  textSize = 17,
}: LogoProps) {
  /* The icon SVG uses viewBox 0 0 300 210 (bubbles only) */
  const iconH = iconSize * (210 / 300);

  const icon = (
    <svg
      width={iconSize}
      height={iconH}
      viewBox="0 0 300 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* ── Orange speech bubble (left, larger) ── */}
      <path
        d="
          M128,8
          C182,8 228,44 228,90
          C228,136 182,170 128,170
          L 95,163
          L 48,208
          L 82,155
          C 48,143 28,118 28,90
          C 28,44 74,8 128,8
          Z
        "
        fill="#F07814"
      />

      {/* ── Navy speech bubble (right, overlapping) ── */}
      <path
        d="
          M108,92
          C108,52 144,18 188,18
          C232,18 270,52 270,92
          C270,132 232,166 188,166
          L 215,158
          L 252,204
          L 212,153
          C 177,164 108,132 108,92
          Z
        "
        fill="#012D5A"
      />

      {/* ── White K ── */}
      <text
        x="154"
        y="126"
        textAnchor="middle"
        fill="white"
        fontSize="100"
        fontWeight="900"
        fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
        style={{ userSelect: "none" }}
      >
        K
      </text>
    </svg>
  );

  /* Text SVG "KɛnTranslate" in two colours */
  const textSvgW = textSize * 8.4;
  const textSvgH = textSize * 1.4;
  const textMark = (
    <svg
      width={textSvgW}
      height={textSvgH}
      viewBox={`0 0 ${textSvgW} ${textSvgH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="KɛnTranslate"
    >
      <text
        y={textSize * 1.1}
        fontSize={textSize}
        fontWeight="800"
        fontFamily="'Arial', 'Helvetica Neue', sans-serif"
        letterSpacing="-0.3"
      >
        <tspan fill="#F07814">Kɛn</tspan>
        <tspan fill="#012D5A">Translate</tspan>
      </text>
    </svg>
  );

  if (!showText) return icon;

  if (horizontal) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10, lineHeight: 1 }}>
        {icon}
        {textMark}
      </div>
    );
  }

  /* Vertical layout (default) */
  const fullLogoW = Math.max(iconSize, textSvgW);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        width: fullLogoW,
      }}
    >
      {icon}
      {textMark}
    </div>
  );
}

/** Icon-only version (no text) for tight spaces like sidebar collapsed */
export function KenTranslateIcon({ size = 36 }: { size?: number }) {
  return (
    <KenTranslateLogo iconSize={size} showText={false} />
  );
}
