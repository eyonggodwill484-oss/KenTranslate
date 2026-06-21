"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { mockUser, mockHistory, dashboardStats } from "@/lib/mockData";

function StatCard({ stat, delay }: { stat: typeof dashboardStats[0]; delay: number }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const end = stat.value;
    const duration = 1200;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [visible, stat.value]);

  return (
    <div
      style={{
        background: "var(--kt-card)",
        borderRadius: 16,
        padding: "24px",
        boxShadow: "var(--kt-shadow-sm)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        transitionDelay: `${delay}ms`,
        border: "1px solid var(--kt-border)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: `${stat.color}15`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <StatIcon icon={stat.icon} color={stat.color} />
        </div>
        <span style={{
          fontSize: 12,
          fontWeight: 700,
          color: "#059669",
          background: "#ecfdf5",
          padding: "3px 9px",
          borderRadius: 100,
        }}>
          {stat.change}
        </span>
      </div>
      <div>
        <p style={{ fontSize: 30, fontWeight: 800, color: stat.color, lineHeight: 1 }}>
          {count.toLocaleString()}
        </p>
        <p style={{ fontSize: 13, color: "var(--kt-text-2)", fontWeight: 500, marginTop: 4 }}>
          {stat.label}
        </p>
      </div>
    </div>
  );
}

function StatIcon({ icon, color }: { icon: string; color: string }) {
  const icons: Record<string, React.ReactElement> = {
    globe: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="9" stroke={color} strokeWidth="1.8" />
        <path d="M11 2C11 2 8 6.5 8 11s3 9 3 9M11 2s3 4.5 3 9-3 9-3 9M2 11h18" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    type: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 6h14M4 10h8M4 14h10" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    mic: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="8" y="2" width="6" height="10" rx="3" stroke={color} strokeWidth="1.8" />
        <path d="M5 11a6 6 0 0 0 12 0" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="11" y1="17" x2="11" y2="20" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    calendar: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="4" width="16" height="15" rx="3" stroke={color} strokeWidth="1.8" />
        <path d="M7 2v4M15 2v4M3 10h16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="8" cy="14" r="1" fill={color} />
        <circle cx="11" cy="14" r="1" fill={color} />
        <circle cx="14" cy="14" r="1" fill={color} />
      </svg>
    ),
  };
  return icons[icon] ?? null;
}

export default function DashboardPage() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  useEffect(() => {
    const t = setTimeout(() => setPageLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const recentItems = mockHistory.slice(0, 5);

  return (
    <div className="page-padding" style={{ padding: "28px 28px", maxWidth: '1100px', width: '100%', margin: "0 auto" }}>

      {/* Page header */}
      <div
        style={{
          marginBottom: 32,
          opacity: pageLoaded ? 1 : 0,
          transform: pageLoaded ? "translateY(0)" : "translateY(-16px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <p style={{ fontSize: 14, color: "#F07814", fontWeight: 600, marginBottom: 4 }}>
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--kt-text)", letterSpacing: "-0.5px" }}>
          {greeting}, {mockUser.name.split(" ")[0]}! 👋
        </h1>
        <p style={{ fontSize: 15, color: "var(--kt-text-2)", marginTop: 4 }}>
          Here&apos;s what&apos;s happening with your translations today.
        </p>
      </div>

      {/* Stats grid */}
      <div
        className="stats-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 28,
        }}
      >
        {dashboardStats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} delay={i * 100} />
        ))}
      </div>

      {/* Quick actions */}
      <div
        style={{
          background: "var(--kt-card)",
          borderRadius: 16,
          padding: "24px",
          boxShadow: "var(--kt-shadow-sm)",
          border: "1px solid var(--kt-border)",
          marginBottom: 28,
          opacity: pageLoaded ? 1 : 0,
          transform: pageLoaded ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.5s ease 0.35s, transform 0.5s ease 0.35s",
        }}
      >
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--kt-text)", marginBottom: 18 }}>
          Quick Actions
        </h2>
        <div className="quick-actions-flex" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {[
            { href: "/dashboard/text-translation", label: "Text Translation", desc: "Translate written text", color: "#012D5A", emoji: "✍️" },
            { href: "/dashboard/speech-translation", label: "Speech Translation", desc: "Speak and translate", color: "#F07814", emoji: "🎤" },
            { href: "/dashboard/history", label: "View History", desc: "Recent translations", color: "#0369a1", emoji: "📋" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              style={{
                flex: "1 1 160px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "16px 18px",
                borderRadius: 12,
                background: `${action.color}08`,
                border: `1.5px solid ${action.color}18`,
                textDecoration: "none",
                transition: "transform 0.18s, box-shadow 0.18s, background 0.18s",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 8px 24px ${action.color}20`;
                (e.currentTarget as HTMLAnchorElement).style.background = `${action.color}14`;
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                (e.currentTarget as HTMLAnchorElement).style.background = `${action.color}08`;
              }}
            >
              <div style={{
                width: 42, height: 42, borderRadius: 10,
                background: action.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, flexShrink: 0,
                boxShadow: `0 4px 12px ${action.color}40`,
              }}>
                {action.emoji}
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: action.color }}>{action.label}</p>
                <p style={{ fontSize: 12, color: "var(--kt-text-2)", marginTop: 1 }}>{action.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent translations */}
      <div
        style={{
          background: "var(--kt-card)",
          borderRadius: 16,
          padding: "24px",
          boxShadow: "var(--kt-shadow-sm)",
          border: "1px solid var(--kt-border)",
          opacity: pageLoaded ? 1 : 0,
          transform: pageLoaded ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--kt-text)" }}>Recent Translations</h2>
          <Link href="/dashboard/history" style={{ fontSize: 13, color: "#F07814", fontWeight: 600, textDecoration: "none" }}>
            View all →
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {recentItems.map((item, i) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                gap: 14,
                padding: "14px 16px",
                borderRadius: 12,
                background: "var(--kt-bg-2)",
                border: "1px solid var(--kt-border)",
                opacity: pageLoaded ? 1 : 0,
                transition: `opacity 0.4s ease ${0.6 + i * 0.07}s`,
                alignItems: "flex-start",
              }}
            >
              <div style={{
                flexShrink: 0,
                width: 34,
                height: 34,
                borderRadius: 9,
                background: item.type === "text" ? "#012D5A" : "#F07814",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <span style={{ fontSize: 14 }}>{item.type === "text" ? "✍️" : "🎤"}</span>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#012D5A",
                    background: "#e0ecff",
                    padding: "2px 8px",
                    borderRadius: 100,
                  }}>
                    {item.direction}
                  </span>
                  <span style={{ fontSize: 11, color: "var(--kt-text-3)" }}>
                    {item.date} · {item.time}
                  </span>
                </div>
                <p style={{
                  fontSize: 13, color: "var(--kt-text)", fontWeight: 500,
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                  {item.source}
                </p>
                <p style={{
                  fontSize: 13, color: "var(--kt-text-2)",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  marginTop: 2,
                }}>
                  {item.target}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
