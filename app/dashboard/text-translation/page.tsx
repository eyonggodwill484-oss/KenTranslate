"use client";

import { useState, useRef } from "react";

type Lang = "English" | "Kɛnyaŋ";

const mockTranslations: Record<string, string> = {
  "hello": "Ɛyo̧",
  "hello, how are you?": "Ɛyo̧, o̧ ndɛ mɛ?",
  "good morning": "Mbɛ̀ wɔ nyɔŋ",
  "thank you": "Asante",
  "thank you very much": "Asante bɛdɛ",
  "please": "Mbok",
  "my name is": "Ɛndiŋ jɛ",
  "i love you": "Mɛ ya̧ɛ wɔ",
  "where are you going?": "O̧ kɛ yɛ̀ ndɛ?",
  "the weather is beautiful": "Nnyɔŋ ɛ dɛ ya̧ɛ",
  "welcome": "Ɛ̀kɛ nyɛ̀",
  "goodbye": "Bɛ̀sə wɔ",
  "how much does this cost?": "Àkɛ̀ bɛdɛ mɛ̀ nɛm?",
  "i am from cameroon": "Mɛ kɛ Cameroon",
  "speak slowly please": "Mbok, kɔ nɛm bɛdɛ",
  "ɛyo̧": "Hello",
  "mbɛ̀ wɔ nyɔŋ": "Good morning",
  "asante": "Thank you",
  "mbok": "Please",
  "mɛ ya̧ɛ wɔ": "I love you",
};

function getTranslation(text: string, from: Lang): string {
  const lower = text.toLowerCase().trim();
  const key = Object.keys(mockTranslations).find(k => lower.includes(k));
  if (key) return mockTranslations[key];
  if (from === "English") {
    return `[Kɛnyaŋ]: ${text.split(" ").map(w => w.charAt(0).toUpperCase() + "ɛ̀" + w.slice(1).toLowerCase()).join(" ")}`;
  }
  return `[English]: ${text.replace(/[ɛɔŋʔ]/g, "").replace(/\s+/g, " ").trim() || text}`;
}

export default function TextTranslationPage() {
  const [fromLang, setFromLang] = useState<Lang>("English");
  const [toLang, setToLang] = useState<Lang>("Kɛnyaŋ");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [swapping, setSwapping] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const MAX_CHARS = 500;

  const handleTranslate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setOutput("");
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 700));
    setOutput(getTranslation(input, fromLang));
    setLoading(false);
  };

  const handleSwap = () => {
    setSwapping(true);
    setTimeout(() => {
      setFromLang(toLang);
      setToLang(fromLang);
      setInput(output);
      setOutput(input);
      setSwapping(false);
    }, 300);
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    const content = `KenTranslate Export\n${"─".repeat(40)}\nSource (${fromLang}):\n${input}\n\nTranslation (${toLang}):\n${output}\n\nTranslated on: ${new Date().toLocaleString()}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "kentranslate-export.txt"; a.click();
    URL.revokeObjectURL(url);
  };

  const handleSpeak = () => {
    if (!output || !window.speechSynthesis) return;
    const utt = new SpeechSynthesisUtterance(output);
    utt.lang = "en-US";
    utt.rate = 0.85;
    window.speechSynthesis.speak(utt);
  };

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText().catch(() => "");
    if (text) setInput(text.slice(0, MAX_CHARS));
  };

  return (
    <div className="page-padding" style={{ padding: "28px 28px", maxWidth: '1100px', width: '100%', margin: "0 auto" }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#012D5A", letterSpacing: "-0.3px" }}>
          Text Translation
        </h1>
        <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
          Translate seamlessly between English and Kɛnyaŋ.
        </p>
      </div>

      {/* Main translation card */}
      <div
        style={{
          background: "white",
          borderRadius: 20,
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 16px 40px rgba(1,45,90,0.1)",
          border: "1px solid #f1f5f9",
          overflow: "hidden",
        }}
      >
        {/* Language selector bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #f1f5f9",
            background: "#F8FAFC",
          }}
        >
          {/* From language */}
          <div style={{ flex: 1, padding: "0 4px" }}>
            <select
              value={fromLang}
              onChange={(e) => setFromLang(e.target.value as Lang)}
              style={{
                width: "100%",
                padding: "14px 20px",
                border: "none",
                background: "transparent",
                fontSize: 15,
                fontWeight: 700,
                color: "#012D5A",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option value="English">English</option>
              <option value="Kɛnyaŋ">Kɛnyaŋ</option>
            </select>
          </div>

          {/* Swap button */}
          <button
            onClick={handleSwap}
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              border: "1.5px solid #e2e8f0",
              background: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              color: "#012D5A",
              transition: "background 0.2s, border-color 0.2s, transform 0.3s",
              transform: swapping ? "rotate(180deg)" : "rotate(0deg)",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#012D5A";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#012D5A";
              (e.currentTarget as HTMLButtonElement).style.color = "white";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "white";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#e2e8f0";
              (e.currentTarget as HTMLButtonElement).style.color = "#012D5A";
            }}
            title="Swap languages"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 7h12M12 4l3 3-3 3M15 11H3M6 8l-3 3 3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* To language */}
          <div style={{ flex: 1, padding: "0 4px" }}>
            <select
              value={toLang}
              onChange={(e) => setToLang(e.target.value as Lang)}
              style={{
                width: "100%",
                padding: "14px 20px",
                border: "none",
                background: "transparent",
                fontSize: 15,
                fontWeight: 700,
                color: "#F07814",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option value="Kɛnyaŋ">Kɛnyaŋ</option>
              <option value="English">English</option>
            </select>
          </div>
        </div>

        {/* Text panels */}
        <div
          className="translation-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1px 1fr",
          }}
        >
          {/* Input panel */}
          <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {fromLang}
              </span>
              <div style={{ display: "flex", gap: 6 }}>
                <ActionBtn onClick={handlePaste} title="Paste from clipboard">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="3" y="2" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M5 2V1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V2" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                  Paste
                </ActionBtn>
                {input && (
                  <ActionBtn onClick={() => { setInput(""); setOutput(""); }} title="Clear text">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                    Clear
                  </ActionBtn>
                )}
              </div>
            </div>

            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS))}
              placeholder={fromLang === "English"
                ? "Type or paste English text here…"
                : "Kɛnyaŋ àkɛ̀ bɔ̀kɛ jɛ nɛm…"}
              style={{
                flex: 1,
                minHeight: 200,
                resize: "none",
                border: "none",
                outline: "none",
                fontSize: 15,
                lineHeight: 1.7,
                color: "#0f172a",
                background: "transparent",
                fontFamily: "Inter, sans-serif",
                width: "100%",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  handleTranslate();
                }
              }}
            />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, color: input.length > MAX_CHARS * 0.9 ? "#ef4444" : "#94a3b8" }}>
                {input.length} / {MAX_CHARS}
              </span>
              <span style={{ fontSize: 11, color: "#94a3b8" }}>Ctrl+Enter to translate</span>
            </div>
          </div>

          {/* Divider */}
          <div className="translation-divider" style={{ background: "#f1f5f9", width: 1 }} />

          {/* Output panel */}
          <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 12, background: output ? "white" : "#fafafa", borderTop: "1px solid #f1f5f9" }}
            className="translation-output-panel"
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#F07814", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {toLang}
              </span>
              {output && (
                <div style={{ display: "flex", gap: 6 }}>
                  <ActionBtn onClick={handleCopy} title="Copy translation" active={copied}>
                    {copied ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <rect x="4" y="1" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                        <rect x="2" y="3" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="white" />
                      </svg>
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </ActionBtn>
                  <ActionBtn onClick={handleSpeak} title="Listen to translation">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 5v4h2.5L8 12V2L4.5 5H2z" fill="currentColor" opacity=".7" />
                      <path d="M10 4.5a3.5 3.5 0 0 1 0 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    Speak
                  </ActionBtn>
                  <ActionBtn onClick={handleDownload} title="Download translation">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 2v7M4 7l3 3 3-3M2 12h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Save
                  </ActionBtn>
                </div>
              )}
            </div>

            <div style={{ flex: 1, minHeight: 200, position: "relative" }}>
              {loading ? (
                <TranslationLoader />
              ) : output ? (
                <p style={{
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: "#012D5A",
                  fontWeight: 500,
                  margin: 0,
                }}>
                  {output}
                </p>
              ) : (
                <p style={{ fontSize: 14, color: "#cbd5e1", fontStyle: "italic" }}>
                  Translation will appear here…
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Translate button */}
        <div style={{
          padding: "16px 24px",
          borderTop: "1px solid #f1f5f9",
          display: "flex",
          justifyContent: "center",
          background: "#F8FAFC",
        }}>
          <button
            onClick={handleTranslate}
            disabled={loading || !input.trim()}
            style={{
              padding: "13px 28px",
              borderRadius: 13,
              border: "none",
              background: loading || !input.trim() ? "#94a3b8" : "#012D5A",
              color: "white",
              fontWeight: 700,
              fontSize: 15,
              cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: 10,
              transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
              boxShadow: loading || !input.trim() ? "none" : "0 4px 16px rgba(1,45,90,0.3)",
            }}
            onMouseOver={(e) => {
              if (!loading && input.trim()) {
                (e.currentTarget as HTMLButtonElement).style.background = "#F07814";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(240,120,20,0.4)";
              }
            }}
            onMouseOut={(e) => {
              if (!loading && input.trim()) {
                (e.currentTarget as HTMLButtonElement).style.background = "#012D5A";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(1,45,90,0.3)";
              }
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: 18, height: 18, borderRadius: "50%",
                  border: "2.5px solid rgba(255,255,255,0.3)", borderTopColor: "white",
                  animation: "spin-t 0.7s linear infinite",
                }} />
                Translating…
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7.5" stroke="white" strokeWidth="1.5" />
                  <path d="M9 5.5C9 5.5 7 8 7 9s2 3.5 2 3.5M9 5.5c0 0 2 2.5 2 3.5S9 12.5 9 12.5M5.5 9h7" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                Translate
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick phrases */}
      <div style={{
        marginTop: 28,
        background: "white",
        borderRadius: 16,
        padding: "20px 24px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(1,45,90,0.07)",
        border: "1px solid #f1f5f9",
      }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#64748b", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Quick Phrases
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            "Hello",
            "Thank you",
            "Good morning",
            "How are you?",
            "Please",
            "Welcome",
            "Goodbye",
            "My name is…",
          ].map((phrase) => (
            <button
              key={phrase}
              onClick={() => setInput(phrase)}
              style={{
                padding: "7px 16px",
                borderRadius: 100,
                border: "1.5px solid #e2e8f0",
                background: "white",
                fontSize: 13,
                fontWeight: 500,
                color: "#374151",
                cursor: "pointer",
                transition: "all 0.18s",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#012D5A";
                (e.currentTarget as HTMLButtonElement).style.color = "#012D5A";
                (e.currentTarget as HTMLButtonElement).style.background = "#e8f0fe";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#e2e8f0";
                (e.currentTarget as HTMLButtonElement).style.color = "#374151";
                (e.currentTarget as HTMLButtonElement).style.background = "white";
              }}
            >
              {phrase}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin-t { to { transform: rotate(360deg); } }
        @keyframes shimmer-t {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}

function ActionBtn({
  children,
  onClick,
  title,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title?: string;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        padding: "5px 10px",
        borderRadius: 8,
        border: `1px solid ${active ? "#012D5A" : "#e2e8f0"}`,
        background: active ? "#012D5A" : "white",
        color: active ? "white" : "#64748b",
        fontSize: 12,
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.18s",
      }}
      onMouseOver={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#012D5A";
          (e.currentTarget as HTMLButtonElement).style.color = "#012D5A";
        }
      }}
      onMouseOut={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#e2e8f0";
          (e.currentTarget as HTMLButtonElement).style.color = "#64748b";
        }
      }}
    >
      {children}
    </button>
  );
}

function TranslationLoader() {
  return (
    <div style={{ paddingTop: 8 }}>
      {[80, 65, 45].map((w, i) => (
        <div
          key={i}
          style={{
            height: 16,
            width: `${w}%`,
            borderRadius: 8,
            marginBottom: 12,
            background: "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer-t 1.4s infinite",
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16 }}>
        <div style={{
          width: 16, height: 16, borderRadius: "50%",
          border: "2px solid #e2e8f0", borderTopColor: "#F07814",
          animation: "spin-t 0.7s linear infinite",
        }} />
        <span style={{ fontSize: 12, color: "#94a3b8", fontStyle: "italic" }}>
          AI is translating your text…
        </span>
      </div>
    </div>
  );
}
