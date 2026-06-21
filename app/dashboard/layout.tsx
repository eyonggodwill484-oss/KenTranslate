"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { KenTranslateIcon } from "@/components/KenTranslateLogo";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--kt-bg-2)" }}>

      {/* Sidebar – hidden on mobile via CSS, shown on lg+ */}
      <div className="sidebar-desktop" style={{ display: "flex", flexShrink: 0 }}>
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
          mobileOpen={false}
          onMobileClose={() => {}}
        />
      </div>

      {/* Mobile sidebar overlay */}
      <div className="sidebar-mobile-overlay">
        <Sidebar
          collapsed={false}
          onToggle={() => {}}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

        {/* Mobile top-bar */}
        <header style={{
          height: 58,
          background: "var(--kt-card)",
          borderBottom: "1px solid var(--kt-border)",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 12,
          position: "sticky",
          top: 0,
          zIndex: 30,
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}
          className="show-mobile-only"
        >
          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              border: "1.5px solid #e2e8f0",
              background: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#012D5A",
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 5h14M2 9h10M2 13h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <KenTranslateIcon size={30} />
            <span style={{ fontWeight: 800, fontSize: 16, color: "#012D5A", letterSpacing: "-0.2px" }}>
              <span style={{ color: "#F07814" }}>Kɛn</span>Translate
            </span>
          </div>

          {/* Avatar */}
          <div style={{ marginLeft: "auto" }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "linear-gradient(135deg, #F07814, #f59240)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, color: "white",
              boxShadow: "0 2px 8px rgba(240,120,20,0.35)",
            }}>
              KA
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, overflowY: "auto" }}>
          {children}
        </main>
      </div>

      <style>{`
        /* Desktop: show sidebar div, hide mobile overlay and mobile header */
        @media (min-width: 1024px) {
          .sidebar-desktop      { display: flex !important; }
          .sidebar-mobile-overlay { display: none !important; }
          .show-mobile-only     { display: none !important; }
        }
        /* Mobile: hide desktop sidebar wrapper, show mobile overlay + header */
        @media (max-width: 1023px) {
          .sidebar-desktop      { display: none !important; }
          .sidebar-mobile-overlay { display: block !important; }
          .show-mobile-only     { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
