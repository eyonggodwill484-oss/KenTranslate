"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";
import KenTranslateLogo, { KenTranslateIcon } from "./KenTranslateLogo";
import LogoutModal from "./LogoutModal";

const navItems = [
  {
    id: "dashboard", label: "Dashboard", href: "/dashboard",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="7" height="7" rx="2" fill="currentColor" opacity=".85" />
        <rect x="11" y="2" width="7" height="7" rx="2" fill="currentColor" opacity=".6" />
        <rect x="2" y="11" width="7" height="7" rx="2" fill="currentColor" opacity=".6" />
        <rect x="11" y="11" width="7" height="7" rx="2" fill="currentColor" opacity=".4" />
      </svg>
    ),
  },
  {
    id: "text", label: "Text Translation", href: "/dashboard/text-translation",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 5h9M3 9h6M3 13h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="10" y="9" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 11.5l2 4 2-4M13.5 13.5h1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "speech", label: "Speech Translation", href: "/dashboard/speech-translation",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="7" y="2" width="6" height="10" rx="3" fill="currentColor" opacity=".7" />
        <path d="M4 10a6 6 0 0 0 12 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="10" y1="16" x2="10" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="7" y1="18" x2="13" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "history", label: "History", href: "/dashboard/history",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "profile", label: "Profile", href: "/dashboard/profile",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="6.5" r="3.5" fill="currentColor" opacity=".8" />
        <path d="M3.5 17c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "settings", label: "Settings", href: "/dashboard/settings",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.7" />
        <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();
  const [showLogout, setShowLogout] = useState(false);

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  const navigate = (href: string) => { router.push(href); onMobileClose(); };

  const sidebarBg  = isDark ? "var(--kt-sidebar)" : "#012D5A";
  const sidebarBg2 = isDark ? "var(--kt-sidebar-2)" : "#011f40";
  const borderClr  = isDark ? "var(--kt-sidebar-border)" : "rgba(255,255,255,0.08)";

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={onMobileClose}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 40, backdropFilter: "blur(3px)" }}
        />
      )}

      <aside
        className={`kt-sidebar ${mobileOpen ? "open" : ""}`}
        style={{
          width: collapsed ? 72 : 240,
          minHeight: "100vh",
          background: sidebarBg,
          display: "flex",
          flexDirection: "column",
          transition: "width 0.28s cubic-bezier(0.4,0,0.2,1)",
          overflow: "hidden",
          flexShrink: 0,
          position: "relative",
          zIndex: 50,
        }}
      >
        {/* ── Logo header ── */}
        <div style={{
          padding: collapsed ? "18px 16px" : "18px 18px",
          borderBottom: `1px solid ${borderClr}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
          minHeight: 70,
        }}>
          {/* Icon-only when collapsed, full logo when expanded */}
          {collapsed ? (
            <KenTranslateIcon size={38} />
          ) : (
            <KenTranslateLogo iconSize={38} showText horizontal textSize={16} />
          )}

          {/* Collapse toggle */}
          <button
            onClick={onToggle}
            className="hide-lg"
            style={{
              marginLeft: "auto",
              width: 28, height: 28,
              borderRadius: 8,
              border: `1px solid ${borderClr}`,
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.6)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "background 0.2s",
            }}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
              style={{ transform: collapsed ? "rotate(180deg)" : "none", transition: "transform 0.28s" }}>
              <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Mobile close button */}
        {mobileOpen && (
          <button
            onClick={onMobileClose}
            className="show-mobile-only"
            aria-label="Close sidebar"
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 36,
              height: 36,
              borderRadius: 10,
              border: `1px solid ${borderClr}`,
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.85)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 80,
              cursor: "pointer",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4L4 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* ── Nav items ── */}
        <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto", overflowX: "hidden" }}>
          {navItems.map((item, i) => {
            const active = isActive(item.href);
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.href)}
                title={collapsed ? item.label : undefined}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: collapsed ? "11px 9px" : "11px 14px",
                  borderRadius: 12,
                  border: "none",
                  cursor: "pointer",
                  marginBottom: 4,
                  background: active ? "#F07814" : "transparent",
                  color: active ? "white" : "rgba(255,255,255,0.65)",
                  boxShadow: active ? "0 4px 14px rgba(240,120,20,0.4)" : "none",
                  justifyContent: collapsed ? "center" : "flex-start",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  transition: "background 0.18s, color 0.18s, transform 0.12s",
                  animation: `sidebarItemIn 0.4s ease ${i * 55}ms both`,
                }}
                onMouseOver={(e) => { if (!active) { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.09)"; (e.currentTarget as HTMLButtonElement).style.color = "white"; }}}
                onMouseOut={(e)  => { if (!active) { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.65)"; }}}
              >
                <span style={{ flexShrink: 0 }}>{item.icon}</span>
                {!collapsed && (
                  <span style={{ fontSize: 14, fontWeight: active ? 700 : 500, overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.label}
                  </span>
                )}
                {active && !collapsed && (
                  <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.8)" }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* ── Divider ── */}
        <div style={{ margin: "0 10px", height: 1, background: borderClr }} />

        {/* ── Bottom: theme toggle, user, logout ── */}
        <div style={{ padding: "10px 10px 14px" }}>

          {/* Dark/Light toggle */}
          <button
            onClick={toggleTheme}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: collapsed ? "10px 9px" : "10px 14px",
              borderRadius: 12,
              border: `1px solid ${borderClr}`,
              background: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.7)",
              cursor: "pointer",
              justifyContent: collapsed ? "center" : "flex-start",
              marginBottom: 8,
              transition: "background 0.2s, color 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseOver={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLButtonElement).style.color = "white"; }}
            onMouseOut={(e)  => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)"; }}
          >
            {isDark ? (
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <circle cx="8.5" cy="8.5" r="4" stroke="currentColor" strokeWidth="1.6" />
                <path d="M8.5 1v1.5M8.5 14.5V16M1 8.5h1.5M14.5 8.5H16M3.3 3.3l1 1M12.7 12.7l1 1M12.7 3.3l-1 1M3.3 12.7l-1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path d="M14.5 9.5A6 6 0 0 1 7 2.5a6 6 0 1 0 7.5 7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            )}
            {!collapsed && (
              <span style={{ fontSize: 13, fontWeight: 600 }}>
                {isDark ? "Light Mode" : "Dark Mode"}
              </span>
            )}
            {!collapsed && (
              <div style={{
                marginLeft: "auto",
                width: 34, height: 18, borderRadius: 9,
                background: isDark ? "#F07814" : "rgba(255,255,255,0.2)",
                position: "relative", flexShrink: 0,
                transition: "background 0.25s",
              }}>
                <div style={{
                  position: "absolute",
                  top: 2, left: isDark ? 16 : 2,
                  width: 14, height: 14, borderRadius: "50%",
                  background: "white",
                  transition: "left 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }} />
              </div>
            )}
          </button>

          {/* User */}
          {!collapsed && (
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "9px 12px", borderRadius: 12,
              background: "rgba(255,255,255,0.05)", marginBottom: 8,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "#F07814", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, color: "white", flexShrink: 0,
                boxShadow: "0 2px 8px rgba(240,120,20,0.35)",
              }}>KA</div>
              <div style={{ overflow: "hidden" }}>
                <p style={{ color: "white", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Kennedy Ayuk</p>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11 }}>Pro Member</p>
              </div>
            </div>
          )}

          {/* Logout */}
          <button
            onClick={() => setShowLogout(true)}
            title={collapsed ? "Logout" : undefined}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: 12,
              padding: collapsed ? "10px 9px" : "10px 14px",
              borderRadius: 12,
              border: "1px solid rgba(239,68,68,0.2)",
              background: "rgba(239,68,68,0.06)",
              color: "#fca5a5",
              cursor: "pointer",
              justifyContent: collapsed ? "center" : "flex-start",
              whiteSpace: "nowrap",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseOver={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.15)"; (e.currentTarget as HTMLButtonElement).style.color = "#f87171"; }}
            onMouseOut={(e)  => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.06)"; (e.currentTarget as HTMLButtonElement).style.color = "#fca5a5"; }}
          >
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" style={{ flexShrink: 0 }}>
              <path d="M6 15H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3M11 11l4-3-4-3M15 8H6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {!collapsed && <span style={{ fontSize: 13, fontWeight: 600 }}>Logout</span>}
          </button>
        </div>
      </aside>

      <LogoutModal open={showLogout} onClose={() => setShowLogout(false)} />

      <style>{`
        @keyframes sidebarItemIn {
          from { opacity:0; transform:translateX(-10px); }
          to   { opacity:1; transform:translateX(0); }
        }
        /* Desktop: show collapse toggle */
        @media (min-width:1024px) {
          .hide-lg { display: flex !important; }
        }
        @media (max-width:1023px) {
          .hide-lg { display: none !important; }
        }
      `}</style>
    </>
  );
}
