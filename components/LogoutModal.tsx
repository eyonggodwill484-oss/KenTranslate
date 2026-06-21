"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LogoutModal({ open, onClose }: LogoutModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { isDark } = useTheme();

  if (!open) return null;

  const handleLogout = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    router.push("/auth");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      {/* Backdrop */}
      <div
        onClick={!loading ? onClose : undefined}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(1,45,90,0.45)",
          backdropFilter: "blur(6px)",
          animation: "fadeInBackdrop 0.2s ease",
        }}
      />

      {/* Modal card */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: "var(--kt-card)",
          borderRadius: 20,
          padding: "36px 36px 28px",
          maxWidth: 400,
          width: "100%",
          boxShadow: "var(--kt-shadow-md)",
          animation: "scaleInModal 0.25s cubic-bezier(0.34,1.56,0.64,1)",
          textAlign: "center",
        }}
      >
        {/* Icon */}
        <div style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "#fef2f2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
          border: "2px solid #fee2e2",
        }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M10 22H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5M19 18l5-4-5-4M24 14H11" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--kt-text)", marginBottom: 8 }}>
          Sign out of KenTranslate?
        </h2>
        <p style={{ fontSize: 14, color: "var(--kt-text-2)", lineHeight: 1.6, marginBottom: 28 }}>
          Are you sure you want to log out? You can always sign back in to continue translating.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={onClose}
            disabled={loading}
            style={{
              flex: 1,
              padding: "12px 0",
              borderRadius: 12,
              border: "1.5px solid var(--kt-border)",
              background: "var(--kt-bg-2)",
              color: "var(--kt-text)",
              fontWeight: 600,
              fontSize: 14,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s, border-color 0.2s",
              opacity: loading ? 0.5 : 1,
            }}
            onMouseOver={(e) => {
              if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "var(--kt-bg-3)";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--kt-bg-2)";
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleLogout}
            disabled={loading}
            style={{
              flex: 1,
              padding: "12px 0",
              borderRadius: 12,
              border: "none",
              background: loading ? "#f97316" : "#F07814",
              color: "white",
              fontWeight: 700,
              fontSize: 14,
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "background 0.2s, transform 0.15s",
              boxShadow: "0 4px 14px rgba(240,120,20,0.4)",
            }}
            onMouseOver={(e) => {
              if (!loading) {
                (e.currentTarget as HTMLButtonElement).style.background = "#d4660f";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
              }
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#F07814";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: 16, height: 16, borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white",
                  animation: "spin-logout 0.7s linear infinite",
                }} />
                Signing out…
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 14H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3M10 11l4-3-4-3M14 8H6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Logout
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInBackdrop { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleInModal {
          from { opacity: 0; transform: scale(0.88) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes spin-logout { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
