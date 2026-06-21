"use client";

import { useState, useEffect, useRef } from "react";

type RecordState = "idle" | "recording" | "processing" | "done";

const mockSpeechResults = [
  { original: "Hello, how are you today?", translated: "Ɛyo̧, o̧ ndɛ mɛ wɔ nyɔŋ yɛ?" },
  { original: "Good morning, welcome to our community.", translated: "Mbɛ̀ wɔ nyɔŋ, ɛ̀kɛ nyɛ̀ bwɛm ɛ̀bɛ̀ɛ̀." },
  { original: "Thank you very much for your help.", translated: "Asante bɛdɛ ɛ̀yɛ̀ bɔ̀kɛ mɛ̀." },
  { original: "I need to go to the market today.", translated: "Mɛ nɛm tɛ̀mɛ wɔ nyɔŋ ɛ̀tɛ̀." },
  { original: "The children are playing outside.", translated: "Àbɛ̀ nɔŋ ɛ dɛ kɛ wɔ bɔ̀kɛ ɛ̀pam." },
];

function WaveBar({ delay, active }: { delay: number; active: boolean }) {
  return (
    <div
      style={{
        width: 4,
        height: active ? 40 : 6,
        borderRadius: 2,
        background: "#F07814",
        transition: "height 0.15s ease",
        animation: active ? `soundBar 0.75s ease-in-out ${delay}s infinite` : "none",
        transformOrigin: "bottom",
      }}
    />
  );
}

export default function SpeechTranslationPage() {
  const [state, setState] = useState<RecordState>("idle");
  const [seconds, setSeconds] = useState(0);
  const [result, setResult] = useState<typeof mockSpeechResults[0] | null>(null);
  const [copied, setCopied] = useState<"original" | "translated" | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (state === "recording") {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setSeconds(0);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [state]);

  const handleMicClick = async () => {
    if (state === "idle") {
      setState("recording");
    } else if (state === "recording") {
      setState("processing");
      await new Promise((r) => setTimeout(r, 2200));
      const pick = mockSpeechResults[Math.floor(Math.random() * mockSpeechResults.length)];
      setResult(pick);
      setState("done");
    }
  };

  const handleAgain = () => {
    setState("idle");
    setResult(null);
  };

  const copy = async (text: string, type: "original" | "translated") => {
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.85;
    window.speechSynthesis.speak(utt);
  };

  const download = () => {
    if (!result) return;
    const content = `KenTranslate – Speech Translation\n${"─".repeat(40)}\nOriginal Speech:\n${result.original}\n\nKɛnyaŋ Translation:\n${result.translated}\n\nDate: ${new Date().toLocaleString()}`;
    const blob = new Blob([content], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "speech-translation.txt";
    a.click();
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <div className="page-padding" style={{ padding: "28px 28px", maxWidth: '800px', width: '100%', margin: "0 auto" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#012D5A", letterSpacing: "-0.3px" }}>
          Speech Translation
        </h1>
        <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
          Speak naturally and receive translated results instantly.
        </p>
      </div>

      {/* Recording Interface */}
      <div
        style={{
          background: "white",
          borderRadius: 20,
          padding: "48px 40px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 16px 40px rgba(1,45,90,0.1)",
          border: "1px solid #f1f5f9",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          marginBottom: 24,
          textAlign: "center",
        }}
      >
        {/* State label */}
        <div style={{
          padding: "6px 18px",
          borderRadius: 100,
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.04em",
          background:
            state === "idle" ? "#F8FAFC" :
            state === "recording" ? "#fef3e2" :
            state === "processing" ? "#e8f0fe" : "#ecfdf5",
          color:
            state === "idle" ? "#64748b" :
            state === "recording" ? "#c2410c" :
            state === "processing" ? "#1d4ed8" : "#059669",
          border:
            state === "idle" ? "1px solid #e2e8f0" :
            state === "recording" ? "1px solid #fed7aa" :
            state === "processing" ? "1px solid #bfdbfe" : "1px solid #a7f3d0",
          transition: "all 0.3s ease",
        }}>
          {state === "idle" && "● Ready to record"}
          {state === "recording" && `● Recording… ${formatTime(seconds)}`}
          {state === "processing" && "◌ Processing speech…"}
          {state === "done" && "✓ Translation complete"}
        </div>

        {/* Microphone button */}
        {state !== "processing" && state !== "done" && (
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Ripple rings */}
            {state === "recording" && (
              <>
                <div style={{
                  position: "absolute",
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  border: "2px solid rgba(240,120,20,0.4)",
                  animation: "ripple-s 1.5s ease-out infinite",
                }} />
                <div style={{
                  position: "absolute",
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  border: "2px solid rgba(240,120,20,0.25)",
                  animation: "ripple-s 1.5s ease-out 0.5s infinite",
                }} />
              </>
            )}

            <button
              onClick={handleMicClick}
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: state === "recording"
                  ? "linear-gradient(135deg, #dc2626, #ef4444)"
                  : "linear-gradient(135deg, #012D5A, #01448a)",
                boxShadow: state === "recording"
                  ? "0 0 0 8px rgba(220,38,38,0.15), 0 8px 32px rgba(220,38,38,0.4)"
                  : "0 8px 32px rgba(1,45,90,0.35)",
                transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                transform: state === "recording" ? "scale(1.08)" : "scale(1)",
              }}
              onMouseOver={(e) => {
                if (state === "idle")
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = state === "recording" ? "scale(1.08)" : "scale(1)";
              }}
            >
              {state === "recording" ? (
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <rect x="8" y="8" width="8" height="20" rx="2" fill="white" />
                  <rect x="20" y="8" width="8" height="20" rx="2" fill="white" />
                </svg>
              ) : (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect x="13" y="4" width="14" height="22" rx="7" fill="white" opacity=".9" />
                  <path d="M8 22a12 12 0 0 0 24 0" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="20" y1="34" x2="20" y2="38" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="14" y1="38" x2="26" y2="38" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        )}

        {/* Processing animation */}
        {state === "processing" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 52 }}>
              {[0, 0.1, 0.2, 0.15, 0.25, 0.1, 0.2, 0.05, 0.15, 0.3].map((delay, i) => (
                <WaveBar key={i} delay={delay} active={true} />
              ))}
            </div>
            <p style={{ fontSize: 14, color: "#64748b" }}>Converting speech to text and translating…</p>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              border: "3px solid #e2e8f0", borderTopColor: "#F07814",
              animation: "spin-sp 0.7s linear infinite",
            }} />
          </div>
        )}

        {/* Instructions */}
        {state === "idle" && (
          <div style={{ maxWidth: '360px', width: '100%' }}>
            <p style={{ fontSize: 15, color: "#374151", fontWeight: 500, marginBottom: 8 }}>
              Press the microphone to start recording
            </p>
            <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>
              Speak clearly in English or Kɛnyaŋ. Press again when done to get an instant translation.
            </p>
          </div>
        )}

        {state === "recording" && (
          <div>
            <p style={{ fontSize: 15, color: "#dc2626", fontWeight: 600 }}>
              Listening… speak now
            </p>
            <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>
              Press the button again when you finish speaking
            </p>
          </div>
        )}
      </div>

      {/* Results */}
      {state === "done" && result && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Original */}
          <ResultCard
            title="Original Speech"
            text={result.original}
            lang="English"
            color="#012D5A"
            onCopy={() => copy(result.original, "original")}
            onSpeak={() => speak(result.original)}
            copied={copied === "original"}
          />
          {/* Translated */}
          <ResultCard
            title="Kɛnyaŋ Translation"
            text={result.translated}
            lang="Kɛnyaŋ"
            color="#F07814"
            onCopy={() => copy(result.translated, "translated")}
            onSpeak={() => speak(result.translated)}
            copied={copied === "translated"}
          />

          {/* Actions */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", paddingTop: 8 }}>
            <button
              onClick={handleAgain}
              style={{
                padding: "12px 28px",
                borderRadius: 12,
                border: "1.5px solid #012D5A",
                background: "white",
                color: "#012D5A",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#012D5A";
                (e.currentTarget as HTMLButtonElement).style.color = "white";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "white";
                (e.currentTarget as HTMLButtonElement).style.color = "#012D5A";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8a6 6 0 1 1 .9 3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M2 13V8h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Translate Again
            </button>
            <button
              onClick={download}
              style={{
                padding: "12px 28px",
                borderRadius: 12,
                border: "none",
                background: "#012D5A",
                color: "white",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.2s",
                boxShadow: "0 4px 14px rgba(1,45,90,0.3)",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#F07814";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#012D5A";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v9M5 8l3 3 3-3M2 14h12" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes ripple-s {
          0%   { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes soundBar {
          0%, 100% { height: 8px; }
          50% { height: 40px; }
        }
        @keyframes spin-sp { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function ResultCard({
  title, text, lang, color, onCopy, onSpeak, copied,
}: {
  title: string;
  text: string;
  lang: string;
  color: string;
  onCopy: () => void;
  onSpeak: () => void;
  copied: boolean;
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        padding: "20px 24px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(1,45,90,0.07)",
        border: `1px solid ${color}20`,
        animation: "resultIn 0.4s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%", background: color,
          }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>{title}</span>
          <span style={{
            fontSize: 11, fontWeight: 600, color: color,
            background: `${color}14`, padding: "2px 8px", borderRadius: 100,
          }}>
            {lang}
          </span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={onCopy}
            style={{
              padding: "5px 12px",
              borderRadius: 8,
              border: `1px solid ${copied ? color : "#e2e8f0"}`,
              background: copied ? color : "white",
              color: copied ? "white" : "#64748b",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
          <button
            onClick={onSpeak}
            style={{
              padding: "5px 12px",
              borderRadius: 8,
              border: "1px solid #e2e8f0",
              background: "white",
              color: "#64748b",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = color;
              (e.currentTarget as HTMLButtonElement).style.color = color;
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#e2e8f0";
              (e.currentTarget as HTMLButtonElement).style.color = "#64748b";
            }}
          >
            🔊 Listen
          </button>
        </div>
      </div>
      <p style={{ fontSize: 16, color: "#0f172a", lineHeight: 1.7, fontWeight: 500 }}>{text}</p>
      <style>{`@keyframes resultIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
