"use client";

import { useState } from "react";
import { mockUser } from "@/lib/mockData";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: mockUser.name,
    email: mockUser.email,
    language: mockUser.language,
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSaving(false);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const stats = [
    { label: "Total Translations", value: mockUser.stats.total, color: "#012D5A", emoji: "🌐" },
    { label: "Text Translations", value: mockUser.stats.text, color: "#0369a1", emoji: "✍️" },
    { label: "Speech Translations", value: mockUser.stats.speech, color: "#F07814", emoji: "🎤" },
    { label: "This Week", value: mockUser.stats.thisWeek, color: "#059669", emoji: "📅" },
  ];

  return (
    <div className="page-padding" style={{ padding: "28px 28px", maxWidth: '760px', width: '100%', margin: "0 auto" }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#012D5A", letterSpacing: "-0.3px" }}>
          My Profile
        </h1>
        <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
          Manage your account information and preferences.
        </p>
      </div>

      {/* Profile card */}
      <div style={{
        background: "white",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 16px 40px rgba(1,45,90,0.1)",
        border: "1px solid #f1f5f9",
        marginBottom: 24,
      }}>
        {/* Cover banner */}
        <div style={{
          height: 110,
          background: "linear-gradient(135deg, #012D5A 0%, #01448a 50%, #0161c2 100%)",
          position: "relative",
        }}>
          {/* Decorative dots */}
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              left: `${10 + i * 20}%`,
              top: `${20 + (i % 3) * 25}%`,
            }} />
          ))}
        </div>

        <div style={{ padding: "0 28px 28px" }}>
          {/* Avatar */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20 }}>
            <div style={{
              width: 84,
              height: 84,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #F07814, #f59240)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 800,
              color: "white",
              border: "4px solid white",
              marginTop: -42,
              boxShadow: "0 4px 16px rgba(240,120,20,0.35)",
              flexShrink: 0,
            }}>
              {form.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
            </div>

            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                style={{
                  marginTop: 10,
                  padding: "9px 20px",
                  borderRadius: 10,
                  border: "1.5px solid #012D5A",
                  background: "white",
                  color: "#012D5A",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
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
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                Edit Profile
              </button>
            ) : (
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button
                  onClick={() => { setEditing(false); setForm({ name: mockUser.name, email: mockUser.email, language: mockUser.language }); }}
                  style={{
                    padding: "9px 16px", borderRadius: 10,
                    border: "1.5px solid #e2e8f0", background: "white",
                    color: "#64748b", fontWeight: 600, fontSize: 13, cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  style={{
                    padding: "9px 20px", borderRadius: 10,
                    border: "none",
                    background: saving ? "#94a3b8" : "#012D5A",
                    color: "white", fontWeight: 700, fontSize: 13,
                    cursor: saving ? "not-allowed" : "pointer",
                    display: "flex", alignItems: "center", gap: 8,
                    transition: "background 0.2s",
                    boxShadow: saving ? "none" : "0 4px 12px rgba(1,45,90,0.3)",
                  }}
                >
                  {saving && (
                    <div style={{
                      width: 14, height: 14, borderRadius: "50%",
                      border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white",
                      animation: "spin-prof 0.7s linear infinite",
                    }} />
                  )}
                  {saving ? "Saving…" : "Save Changes"}
                </button>
              </div>
            )}
          </div>

          {/* Success toast */}
          {saved && (
            <div style={{
              padding: "10px 16px", borderRadius: 10, background: "#ecfdf5",
              border: "1px solid #a7f3d0", color: "#059669", fontSize: 13, fontWeight: 600,
              marginBottom: 16, display: "flex", alignItems: "center", gap: 8,
              animation: "toastIn 0.3s ease",
            }}>
              ✓ Profile updated successfully
            </div>
          )}

          {/* Name & Role */}
          {!editing && (
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", marginBottom: 2 }}>{form.name}</h2>
              <p style={{ fontSize: 14, color: "#64748b" }}>{form.email}</p>
              <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                <Tag color="#012D5A">KenTranslate Pro</Tag>
                <Tag color="#059669">Active</Tag>
                <Tag color="#7c3aed">Member since {mockUser.joinDate}</Tag>
              </div>
            </div>
          )}

          {/* Edit form */}
          {editing && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <ProfileField
                label="Full Name"
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              />
              <ProfileField
                label="Email Address"
                value={form.email}
                type="email"
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              />
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                  Language Preference
                </label>
                <select
                  value={form.language}
                  onChange={(e) => setForm((f) => ({ ...f, language: e.target.value }))}
                  style={{
                    width: "100%", padding: "11px 14px", borderRadius: 12,
                    border: "1.5px solid #e2e8f0", fontSize: 14, color: "#0f172a",
                    outline: "none", background: "white", cursor: "pointer",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "#012D5A"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; }}
                >
                  <option>English</option>
                  <option>Kɛnyaŋ</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#012D5A", marginBottom: 16 }}>
          Your Statistics
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                background: "white",
                borderRadius: 16,
                padding: "20px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(1,45,90,0.07)",
                border: "1px solid #f1f5f9",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: `${s.color}15`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18,
              }}>
                {s.emoji}
              </div>
              <p style={{ fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</p>
              <p style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin-prof { to { transform: rotate(360deg); } }
        @keyframes toastIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

function ProfileField({
  label, value, onChange, type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%", padding: "11px 14px", borderRadius: 12,
          border: "1.5px solid #e2e8f0", fontSize: 14, color: "#0f172a",
          outline: "none", background: "white",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxSizing: "border-box",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#012D5A";
          e.target.style.boxShadow = "0 0 0 3px rgba(1,45,90,0.1)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#e2e8f0";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

function Tag({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span style={{
      fontSize: 12, fontWeight: 600, color: color,
      background: `${color}15`, padding: "3px 10px",
      borderRadius: 100, border: `1px solid ${color}20`,
    }}>
      {children}
    </span>
  );
}
