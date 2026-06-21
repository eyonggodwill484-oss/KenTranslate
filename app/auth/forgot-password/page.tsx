"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import KenTranslateLogo from "@/components/KenTranslateLogo";

type FormState = {
  email: string;
};

function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="4" width="15" height="10" rx="2" stroke="#94a3b8" strokeWidth="1.6" />
      <path d="M1.5 6.5L9 11L16.5 6.5" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function Spinner({ size = 18, color = "white" }: { size?: number; color?: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `2px solid ${color}35`,
        borderTopColor: color,
        animation: "spin-a 0.7s linear infinite",
      }} />
      <style>{`@keyframes spin-a { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({ email: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!form.email || !form.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSuccess(true);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 16px",
      background: "#F8FAFC",
      fontFamily: "Inter, system-ui, sans-serif",
    }}>
      <div style={{
        width: "100%",
        maxWidth: 520,
        background: "white",
        borderRadius: 24,
        padding: "36px 30px",
        boxShadow: "0 20px 60px rgba(15,23,42,0.08)",
        border: "1px solid #e8edf3",
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <KenTranslateLogo iconSize={64} showText textSize={18} />
          <p style={{ color: "#64748b", fontSize: 13, textAlign: "center", maxWidth: 420 }}>
            Enter your email and we’ll send a secure reset link.
          </p>
        </div>

        <div style={{
          width: "100%",
          borderRadius: 22,
          padding: "28px 26px",
          background: "#ffffff",
          boxShadow: "0 4px 6px rgba(0,0,0,0.04), 0 20px 48px rgba(1,45,90,0.12)",
          border: "1px solid #e8edf3",
        }}>
          <div style={{ marginBottom: 22 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", marginBottom: 6, letterSpacing: "-0.3px" }}>
              Forgot password?
            </h2>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7 }}>
              No worries — we’ll email instructions to reset your password.
            </p>
          </div>

          {success ? (
            <div style={{ padding: "22px 20px", borderRadius: 16, background: "#ECFDF5", border: "1px solid #D1FAE5", color: "#166534" }}>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7 }}>
                Success! Check your inbox at <strong>{form.email}</strong> and follow the link to reset your password.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#374151", marginBottom: 10 }}>
                Email address
              </label>
              <div style={{ position: "relative", marginBottom: 16 }}>
                <div style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}>
                  <IconMail />
                </div>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm({ email: event.target.value })}
                  placeholder="you@example.com"
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 42px",
                    borderRadius: 12,
                    border: `1.5px solid ${error ? "#ef4444" : "#e2e8f0"}`,
                    background: error ? "#fef2f2" : "#fafafa",
                    fontSize: 14,
                    outline: "none",
                    color: "#0f172a",
                  }}
                />
              </div>

              {error && (
                <p style={{ margin: "0 0 16px", color: "#ef4444", fontSize: 13 }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px 0",
                  borderRadius: 14,
                  border: "none",
                  background: loading ? "#94a3b8" : "#012D5A",
                  color: "white",
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                {loading ? <><Spinner size={17} color="white" /> Sending…</> : "Send reset link"}
              </button>
            </form>
          )}

          <button
            type="button"
            onClick={() => router.push("/auth")}
            style={{
              width: "100%",
              marginTop: 18,
              padding: "12px 0",
              borderRadius: 14,
              border: "1.5px solid #e2e8f0",
              background: "white",
              color: "#374151",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Back to sign in
          </button>
        </div>
      </div>
    </div>
  );
}
