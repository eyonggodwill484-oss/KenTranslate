"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import KenTranslateLogo from "@/components/KenTranslateLogo";

type AuthMode = "login" | "register";

/* ── Inline SVG icons ── */
function IconUser() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <circle cx="8.5" cy="5.5" r="3" stroke="#94a3b8" strokeWidth="1.6" />
      <path d="M2 15c0-3.314 2.91-6 6.5-6s6.5 2.686 6.5 6" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <rect x="2" y="4" width="13" height="9" rx="2" stroke="#94a3b8" strokeWidth="1.6" />
      <path d="M2 6.5l6.5 4.5 6.5-4.5" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconLock() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <rect x="3.5" y="7.5" width="10" height="7" rx="2" stroke="#94a3b8" strokeWidth="1.6" />
      <path d="M5.5 7.5V5.5a3 3 0 0 1 6 0v2" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="8.5" cy="11" r="1.1" fill="#94a3b8" />
    </svg>
  );
}
function IconEye({ open }: { open: boolean }) {
  return open ? (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d="M1 8.5C1 8.5 4 3 8.5 3S16 8.5 16 8.5 13 14 8.5 14 1 8.5 1 8.5z" stroke="#94a3b8" strokeWidth="1.6" />
      <circle cx="8.5" cy="8.5" r="2" stroke="#94a3b8" strokeWidth="1.6" />
    </svg>
  ) : (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d="M2 2l13 13M7 4.1A7 7 0 0 1 8.5 4C13 4 16 8.5 16 8.5s-.9 1.7-2.5 3M5 5.5C3 7 1 8.5 1 8.5s3 5.5 7.5 5.5c1.2 0 2.3-.3 3.2-.8" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.96l3.007 2.332C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}

/* ── Spinner ── */
function Spinner({ size = 18, color = "white" }: { size?: number; color?: string }) {
  return (
    <>
      <div style={{
        width: size, height: size, borderRadius: "50%",
        border: `2px solid ${color}35`, borderTopColor: color,
        animation: "spin-a 0.7s linear infinite", flexShrink: 0,
      }} />
      <style>{`@keyframes spin-a { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}

/* ── Input field with left icon + optional eye toggle ── */
function Field({
  label, icon, type: typeProp, placeholder, value, onChange, error, showToggle,
}: {
  label: string;
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  showToggle?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const inputType = showToggle ? (visible ? "text" : "password") : typeProp;
  const hasError = !!error;

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#374151", marginBottom: 5, letterSpacing: "0.01em" }}>
        {label}
      </label>

      <div style={{ position: "relative" }}>
        {/* Left icon */}
        <div style={{
          position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)",
          pointerEvents: "none", zIndex: 1,
          color: hasError ? "#ef4444" : "#94a3b8",
          display: "flex", alignItems: "center",
        }}>
          {icon}
        </div>

        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            width: "100%",
            padding: showToggle ? "12px 44px 12px 42px" : "12px 14px 12px 42px",
            borderRadius: 11,
            border: `1.5px solid ${hasError ? "#ef4444" : "#e2e8f0"}`,
            fontSize: 14,
            color: "#0f172a",
            outline: "none",
            background: hasError ? "#fef2f2" : "#fafafa",
            transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
            boxSizing: "border-box",
            fontFamily: "Inter, sans-serif",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = hasError ? "#ef4444" : "#012D5A";
            e.target.style.boxShadow = hasError
              ? "0 0 0 3px rgba(239,68,68,0.1)"
              : "0 0 0 3px rgba(1,45,90,0.1)";
            e.target.style.background = "white";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = hasError ? "#ef4444" : "#e2e8f0";
            e.target.style.boxShadow = "none";
            e.target.style.background = hasError ? "#fef2f2" : "#fafafa";
          }}
        />

        {/* Right eye toggle */}
        {showToggle && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            style={{
              position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", cursor: "pointer", padding: 4,
              display: "flex", alignItems: "center",
              color: "#94a3b8",
              borderRadius: 6,
              transition: "color 0.18s",
            }}
            onMouseOver={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#012D5A"; }}
            onMouseOut={(e)  => { (e.currentTarget as HTMLButtonElement).style.color = "#94a3b8"; }}
            tabIndex={-1}
          >
            <IconEye open={visible} />
          </button>
        )}
      </div>

      {error && (
        <p style={{ marginTop: 4, fontSize: 11.5, color: "#ef4444", fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="#ef4444" strokeWidth="1.3" />
            <path d="M6 4v2.5M6 8h.01" stroke="#ef4444" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

/* ── Main page ── */
export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });

  const validate = () => {
    const e: Record<string, string> = {};
    if (mode === "register" && !form.name.trim()) e.name = "Full name is required";
    if (!form.email.includes("@")) e.email = "Enter a valid email address";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (mode === "register" && form.password !== form.confirm) e.confirm = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    router.push("/dashboard");
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setGoogleLoading(false);
    router.push("/dashboard");
  };

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((err) => { const c = { ...err }; delete c[k]; return c; });
  };

  const switchMode = (m: AuthMode) => { setMode(m); setErrors({}); setForm({ name: "", email: "", password: "", confirm: "" }); };

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
          <p style={{ color: "#64748b", fontSize: 13, textAlign: "center", maxWidth: 400 }}>
            Bridging English &amp; Kɛnyaŋ Through AI
          </p>
        </div>
        <div style={{
          width: "100%",
          background: "white",
          borderRadius: 22,
          padding: "28px 26px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.04), 0 20px 48px rgba(1,45,90,0.12)",
          border: "1px solid #e8edf3",
        }}>
          {/* Tab switcher */}
          <div style={{
            display: "flex",
            background: "#F1F5F9",
            borderRadius: 13,
            padding: 4,
            marginBottom: 26,
            gap: 2,
          }}>
            {(["login", "register"] as AuthMode[]).map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className="auth-tab-text"
                style={{
                  flex: 1,
                  padding: "10px 0",
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: 13.5,
                  transition: "all 0.22s cubic-bezier(0.34,1.56,0.64,1)",
                  background: mode === m ? "#012D5A" : "transparent",
                  color: mode === m ? "white" : "#64748b",
                  boxShadow: mode === m ? "0 3px 10px rgba(1,45,90,0.28)" : "none",
                  letterSpacing: "0.01em",
                }}
              >
                {m === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {/* Heading */}
          <div style={{ marginBottom: 22 }}>
            <h2 className="auth-heading" style={{ fontSize: 21, fontWeight: 800, color: "#0f172a", marginBottom: 4, letterSpacing: "-0.3px" }}>
              {mode === "login" ? "Welcome back 👋" : "Join KenTranslate 🚀"}
            </h2>
            <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.5 }}>
              {mode === "login"
                ? "Sign in to continue your translation journey"
                : "Create your free account and start translating today"}
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Name – register only */}
            {mode === "register" && (
              <Field
                label="Full Name"
                icon={<IconUser />}
                type="text"
                placeholder="e.g. Kennedy Ayuk"
                value={form.name}
                onChange={update("name")}
                error={errors.name}
              />
            )}

            {/* Email */}
            <Field
              label="Email Address"
              icon={<IconMail />}
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={update("email")}
              error={errors.email}
            />

            {/* Password */}
            <Field
              label="Password"
              icon={<IconLock />}
              type="password"
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={update("password")}
              error={errors.password}
              showToggle
            />

            {/* Confirm password – register only */}
            {mode === "register" && (
              <Field
                label="Confirm Password"
                icon={<IconLock />}
                type="password"
                placeholder="Re-enter your password"
                value={form.confirm}
                onChange={update("confirm")}
                error={errors.confirm}
                showToggle
              />
            )}

            {/* Forgot password link */}
            {mode === "login" && (
              <div style={{ textAlign: "right", marginBottom: 18, marginTop: -6 }}>
                <button
                  type="button"
                  onClick={() => router.push("/auth/forgot-password")}
                  style={{
                    background: "none", border: "none", color: "#F07814",
                    fontSize: 12.5, fontWeight: 600, cursor: "pointer", padding: 0,
                  }}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Terms – register only */}
            {mode === "register" && (
              <p style={{ fontSize: 11.5, color: "#94a3b8", marginBottom: 14, lineHeight: 1.5 }}>
                By creating an account you agree to our{" "}
                <span style={{ color: "#F07814", fontWeight: 600, cursor: "pointer" }}>Terms of Service</span>
                {" "}and{" "}
                <span style={{ color: "#F07814", fontWeight: 600, cursor: "pointer" }}>Privacy Policy</span>.
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "13px 0",
                borderRadius: 12,
                border: "none",
                background: loading ? "#94a3b8" : "#012D5A",
                color: "white",
                fontWeight: 700,
                fontSize: 15,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 9,
                transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
                boxShadow: loading ? "none" : "0 5px 18px rgba(1,45,90,0.32)",
                marginBottom: 14,
                letterSpacing: "0.01em",
              }}
              onMouseOver={(e) => { if (!loading) { (e.currentTarget as HTMLButtonElement).style.background = "#F07814"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 5px 18px rgba(240,120,20,0.4)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; } }}
              onMouseOut={(e)  => { if (!loading) { (e.currentTarget as HTMLButtonElement).style.background = "#012D5A"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 5px 18px rgba(1,45,90,0.32)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; } }}
            >
              {loading ? (
                <><Spinner size={17} color="white" /> {mode === "login" ? "Signing in…" : "Creating account…"}</>
              ) : (
                <>
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                    {mode === "login"
                      ? <path d="M6 14H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3M11 11l4-3-4-3M15 8H7" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      : <><circle cx="8.5" cy="8.5" r="6.5" stroke="white" strokeWidth="1.7" /><path d="M8.5 5.5v6M5.5 8.5h6" stroke="white" strokeWidth="1.7" strokeLinecap="round" /></>
                    }
                  </svg>
                  {mode === "login" ? "Sign In" : "Create Account"}
                </>
              )}
            </button>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
              <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500, whiteSpace: "nowrap" }}>or continue with</span>
              <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
            </div>

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={googleLoading}
              style={{
                width: "100%",
                padding: "12px 0",
                borderRadius: 12,
                border: "1.5px solid #e2e8f0",
                background: "white",
                color: "#374151",
                fontWeight: 600,
                fontSize: 14,
                cursor: googleLoading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
              }}
              onMouseOver={(e) => { if (!googleLoading) { (e.currentTarget as HTMLButtonElement).style.borderColor = "#012D5A"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 10px rgba(1,45,90,0.1)"; (e.currentTarget as HTMLButtonElement).style.background = "#fafafa"; } }}
              onMouseOut={(e)  => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#e2e8f0"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; (e.currentTarget as HTMLButtonElement).style.background = "white"; }}
            >
              {googleLoading ? <Spinner size={17} color="#5f6368" /> : <GoogleIcon />}
              Continue with Google
            </button>
          </form>

          <p style={{ marginTop: 20, fontSize: 13, color: "#64748b", textAlign: "center" }}>
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => switchMode(mode === "login" ? "register" : "login")}
              style={{ background: "none", border: "none", color: "#F07814", fontWeight: 700, cursor: "pointer", fontSize: 13 }}
            >
              {mode === "login" ? "Create one free" : "Sign in"}
            </button>
          </p>
        </div>

        <style>{`
          @keyframes slideInPhrase {
            from { opacity: 0; transform: translateX(-16px); }
            to   { opacity: 1; transform: translateX(0); }
          }
        `}</style>
      </div>
    </div>
  );
}
