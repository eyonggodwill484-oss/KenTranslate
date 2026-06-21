"use client";

import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface ToggleState {
  darkMode: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  translationHistory: boolean;
  autoTranslate: boolean;
  saveHistory: boolean;
  analyticsOptIn: boolean;
  biometricLogin: boolean;
}

export default function SettingsPage() {
  const { isDark, toggleTheme } = useTheme();
  const [toggles, setToggles] = useState<ToggleState>({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
    translationHistory: true,
    autoTranslate: false,
    saveHistory: true,
    analyticsOptIn: true,
    biometricLogin: false,
  });
  const [language, setLanguage] = useState("English");
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  const toggle = (key: keyof ToggleState) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async (section: string) => {
    setSaving(section);
    await new Promise((r) => setTimeout(r, 1200));
    setSaving(null);
    setSaved(section);
    setTimeout(() => setSaved(null), 2500);
  };

  return (
    <div className="page-padding" style={{ padding: "28px 28px", maxWidth: '720px', width: '100%', margin: "0 auto" }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "var(--kt-text)", letterSpacing: "-0.3px" }}>
          Settings
        </h1>
        <p style={{ fontSize: 14, color: "var(--kt-text-2)", marginTop: 4 }}>
          Manage your preferences and account settings.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

        {/* General / Appearance */}
        <SettingsSection
          title="Appearance"
          icon="🎨"
          onSave={() => handleSave("appearance")}
          saving={saving === "appearance"}
          saved={saved === "appearance"}
        >
          <ToggleRow
            label="Dark Mode"
            desc="Switch to a dark color scheme for the entire app"
            value={isDark}
            onChange={toggleTheme}
          />
          <ToggleRow
            label="Auto Translate"
            desc="Translate text as you type without pressing the button"
            value={toggles.autoTranslate}
            onChange={() => toggle("autoTranslate")}
          />
        </SettingsSection>

        {/* Language Preferences */}
        <SettingsSection
          title="Language Preferences"
          icon="🌐"
          onSave={() => handleSave("language")}
          saving={saving === "language"}
          saved={saved === "language"}
        >
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--kt-text)", marginBottom: 4 }}>
              Default Interface Language
            </p>
            <p style={{ fontSize: 13, color: "var(--kt-text-2)", marginBottom: 10 }}>
              The language used for menus and interface elements
            </p>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1.5px solid var(--kt-border)",
                fontSize: 14,
                color: "var(--kt-text)",
                background: "var(--kt-input-bg)",
                outline: "none",
                cursor: "pointer",
                minWidth: 0,
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => { e.target.style.borderColor = "#012D5A"; }}
              onBlur={(e) => { e.target.style.borderColor = "var(--kt-border)"; }}
            >
              <option>English</option>
              <option>Kɛnyaŋ</option>
            </select>
          </div>
          <Divider />
          <ToggleRow
            label="Save Translation History"
            desc="Keep a record of all your translations"
            value={toggles.saveHistory}
            onChange={() => toggle("saveHistory")}
          />
          <ToggleRow
            label="Translation History Visible"
            desc="Allow history to appear on dashboard"
            value={toggles.translationHistory}
            onChange={() => toggle("translationHistory")}
          />
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection
          title="Notifications"
          icon="🔔"
          onSave={() => handleSave("notifications")}
          saving={saving === "notifications"}
          saved={saved === "notifications"}
        >
          <ToggleRow
            label="Email Notifications"
            desc="Receive updates and announcements via email"
            value={toggles.emailNotifications}
            onChange={() => toggle("emailNotifications")}
          />
          <ToggleRow
            label="Push Notifications"
            desc="In-app notifications for translation updates"
            value={toggles.pushNotifications}
            onChange={() => toggle("pushNotifications")}
          />
        </SettingsSection>

        {/* Privacy */}
        <SettingsSection
          title="Privacy & Security"
          icon="🔒"
          onSave={() => handleSave("privacy")}
          saving={saving === "privacy"}
          saved={saved === "privacy"}
        >
          <ToggleRow
            label="Analytics Opt-in"
            desc="Help us improve KenTranslate by sharing usage data"
            value={toggles.analyticsOptIn}
            onChange={() => toggle("analyticsOptIn")}
          />
          <ToggleRow
            label="Biometric Login"
            desc="Use fingerprint or face recognition to sign in"
            value={toggles.biometricLogin}
            onChange={() => toggle("biometricLogin")}
            badge="Pro"
          />
        </SettingsSection>

        {/* Account Management */}
        <div style={{
          background: "var(--kt-card)",
          borderRadius: 16,
          padding: "22px 24px",
          boxShadow: "var(--kt-shadow-sm)",
          border: "1px solid var(--kt-border)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <span style={{ fontSize: 18 }}>⚙️</span>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--kt-text)" }}>Account Management</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Change Password", desc: "Update your account password", icon: "🔑" },
              { label: "Export My Data", desc: "Download all your translation data", icon: "📦" },
              { label: "Clear History", desc: "Permanently delete all translation history", icon: "🗑️", danger: true },
              { label: "Delete Account", desc: "Permanently delete your KenTranslate account", icon: "⚠️", danger: true },
            ].map((action) => (
              <button
                key={action.label}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 16px",
                  borderRadius: 12,
                  border: `1px solid ${action.danger ? "#fecaca" : "#f1f5f9"}`,
                  background: action.danger ? "#fef2f2" : "var(--kt-bg-2)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.18s",
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = action.danger ? "#fee2e2" : "var(--kt-bg-3)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = action.danger ? "#f87171" : "#012D5A40";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = action.danger ? "#fef2f2" : "var(--kt-bg-2)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = action.danger ? "#fecaca" : "#f1f5f9";
                }}
              >
                <span style={{ fontSize: 18 }}>{action.icon}</span>
                <div>
                  <p style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: action.danger ? "#ef4444" : "var(--kt-text)",
                  }}>
                    {action.label}
                  </p>
                  <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{action.desc}</p>
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{ marginLeft: "auto", color: "#94a3b8", flexShrink: 0 }}
                >
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* App info */}
        <div style={{ textAlign: "center", padding: "12px 0", color: "var(--kt-text-3)", fontSize: 12 }}>
          KenTranslate v1.0.0 · Built with ❤️ for Kɛnyaŋ language preservation
        </div>
      </div>

      <style>{`@keyframes spin-set { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function SettingsSection({
  title, icon, children, onSave, saving, saved,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
  onSave: () => void;
  saving: boolean;
  saved: boolean;
}) {
  return (
    <div style={{
      background: "var(--kt-card)",
      borderRadius: 16,
      padding: "22px 24px",
      boxShadow: "var(--kt-shadow-sm)",
      border: "1px solid var(--kt-border)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 18 }}>{icon}</span>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--kt-text)" }}>{title}</h2>
        </div>
        <button
          onClick={onSave}
          disabled={saving}
          style={{
            padding: "7px 16px",
            borderRadius: 9,
            border: "none",
            background: saved ? "#059669" : saving ? "#94a3b8" : "#012D5A",
            color: "white",
            fontSize: 13,
            fontWeight: 700,
            cursor: saving ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: 7,
            transition: "background 0.2s",
            boxShadow: saved || saving ? "none" : "0 3px 10px rgba(1,45,90,0.25)",
          }}
          onMouseOver={(e) => {
            if (!saving && !saved) (e.currentTarget as HTMLButtonElement).style.background = "#F07814";
          }}
          onMouseOut={(e) => {
            if (!saving && !saved) (e.currentTarget as HTMLButtonElement).style.background = "#012D5A";
          }}
        >
          {saving && (
            <div style={{
              width: 13, height: 13, borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white",
              animation: "spin-set 0.7s linear infinite",
            }} />
          )}
          {saving ? "Saving…" : saved ? "✓ Saved" : "Save"}
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {children}
      </div>
    </div>
  );
}

function ToggleRow({
  label, desc, value, onChange, badge,
}: {
  label: string;
  desc: string;
  value: boolean;
  onChange: () => void;
  badge?: string;
}) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 0",
      borderBottom: "1px solid var(--kt-border-2)",
      gap: 16,
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "var(--kt-text)" }}>{label}</p>
          {badge && (
            <span style={{
              fontSize: 10, fontWeight: 700,
              background: badge === "Pro" ? "#F07814" : "#e2e8f0",
              color: badge === "Pro" ? "white" : "#64748b",
              padding: "2px 8px", borderRadius: 100,
            }}>
              {badge}
            </span>
          )}
        </div>
        <p style={{ fontSize: 12, color: "var(--kt-text-3)", marginTop: 2 }}>{desc}</p>
      </div>
      <button
        onClick={onChange}
        data-on={value.toString()}
        style={{
          position: "relative",
          width: 48,
          height: 26,
          borderRadius: 13,
          border: "none",
          cursor: "pointer",
          background: value ? "#012D5A" : "#cbd5e1",
          transition: "background 0.25s",
          flexShrink: 0,
          padding: 0,
        }}
      >
        <div style={{
          position: "absolute",
          top: 3,
          left: value ? 25 : 3,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "white",
          transition: "left 0.25s cubic-bezier(0.34,1.56,0.64,1)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
        }} />
      </button>
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "var(--kt-border)", margin: "4px 0" }} />;
}
