"use client";

import { useState, useMemo } from "react";
import { mockHistory } from "@/lib/mockData";

type FilterType = "all" | "text" | "speech";

export default function HistoryPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const items = useMemo(() => {
    return mockHistory.filter((item) => {
      if (deletedIds.has(item.id)) return false;
      if (filter !== "all" && item.type !== filter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return item.source.toLowerCase().includes(q) || item.target.toLowerCase().includes(q);
      }
      return true;
    });
  }, [search, filter, deletedIds]);

  const handleDelete = (id: string) => {
    setDeletedIds((prev) => new Set([...prev, id]));
  };

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="page-padding" style={{ padding: "28px 28px", maxWidth: '900px', width: '100%', margin: "0 auto" }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#012D5A", letterSpacing: "-0.3px" }}>
          Translation History
        </h1>
        <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
          All your previous translations in one place.
        </p>
      </div>

      {/* Search + Filter bar */}
      <div style={{
        display: "flex",
        gap: 12,
        marginBottom: 24,
        flexWrap: "wrap",
        alignItems: "center",
      }}>
        {/* Search input */}
        <div style={{ flex: "1 1 240px", position: "relative" }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", pointerEvents: "none" }}
          >
            <circle cx="7" cy="7" r="5" stroke="#94a3b8" strokeWidth="1.6" />
            <path d="M11 11l3 3" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search translations…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "11px 14px 11px 40px",
              borderRadius: 12,
              border: "1.5px solid #e2e8f0",
              background: "white",
              fontSize: 14,
              color: "#0f172a",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.2s, box-shadow 0.2s",
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
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 16,
              }}
            >×</button>
          )}
        </div>

        {/* Filter pills */}
        <div style={{ display: "flex", gap: 8 }}>
          {(["all", "text", "speech"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "9px 18px",
                borderRadius: 10,
                border: `1.5px solid ${filter === f ? "#012D5A" : "#e2e8f0"}`,
                background: filter === f ? "#012D5A" : "white",
                color: filter === f ? "white" : "#64748b",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.2s",
                textTransform: "capitalize",
              }}
            >
              {f === "all" ? "All" : f === "text" ? "✍️ Text" : "🎤 Speech"}
            </button>
          ))}
        </div>

        {/* Count badge */}
        <div style={{
          marginLeft: "auto",
          fontSize: 13,
          color: "#64748b",
          fontWeight: 500,
          background: "#F8FAFC",
          padding: "6px 14px",
          borderRadius: 8,
          border: "1px solid #e2e8f0",
          whiteSpace: "nowrap",
        }}>
          {items.length} result{items.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Items list */}
      {items.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "80px 20px",
          color: "#94a3b8",
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <p style={{ fontSize: 16, fontWeight: 600, color: "#64748b" }}>No translations found</p>
          <p style={{ fontSize: 13, marginTop: 4 }}>
            {search ? `No results for "${search}"` : "Start translating to build your history."}
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((item, i) => (
            <HistoryCard
              key={item.id}
              item={item}
              index={i}
              onCopy={() => handleCopy(`${item.source}\n\n${item.target}`, item.id)}
              onDelete={() => handleDelete(item.id)}
              copied={copiedId === item.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function HistoryCard({
  item,
  index,
  onCopy,
  onDelete,
  copied,
}: {
  item: typeof mockHistory[0];
  index: number;
  onCopy: () => void;
  onDelete: () => void;
  copied: boolean;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      style={{
        background: "white",
        borderRadius: 16,
        padding: "20px 22px",
        boxShadow: hovered
          ? "0 4px 6px rgba(0,0,0,0.06), 0 12px 32px rgba(1,45,90,0.1)"
          : "0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(1,45,90,0.06)",
        border: `1px solid ${hovered ? "#012D5A20" : "#f1f5f9"}`,
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        animation: `cardIn 0.4s ease ${index * 60}ms both`,
      }}
    >
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Type icon */}
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: item.type === "text" ? "#012D5A" : "#F07814",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, flexShrink: 0,
          }}>
            {item.type === "text" ? "✍️" : "🎤"}
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                fontSize: 11, fontWeight: 700, color: "#012D5A",
                background: "#e0ecff", padding: "2px 9px", borderRadius: 100,
              }}>
                {item.direction}
              </span>
              <span style={{
                fontSize: 11, fontWeight: 600,
                color: item.type === "text" ? "#012D5A" : "#F07814",
                background: item.type === "text" ? "#012D5A18" : "#F0781418",
                padding: "2px 9px", borderRadius: 100, textTransform: "capitalize",
              }}>
                {item.type}
              </span>
            </div>
            <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 3 }}>
              {item.date} at {item.time}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {!confirmDelete ? (
            <>
              <Chip onClick={onCopy} active={copied}>
                {copied ? "✓ Copied" : "Copy"}
              </Chip>
              <Chip onClick={() => setConfirmDelete(true)} danger>
                Delete
              </Chip>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, color: "#ef4444", fontWeight: 600 }}>Delete?</span>
              <Chip onClick={onDelete} danger>Yes</Chip>
              <Chip onClick={() => setConfirmDelete(false)}>No</Chip>
            </div>
          )}
        </div>
      </div>

      {/* Source text */}
      <div style={{
        padding: "12px 14px",
        borderRadius: 10,
        background: "#F8FAFC",
        marginBottom: 8,
        borderLeft: "3px solid #012D5A",
      }}>
        <p style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Source
        </p>
        <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.5 }}>{item.source}</p>
      </div>

      {/* Target text */}
      <div style={{
        padding: "12px 14px",
        borderRadius: 10,
        background: "#fff8f3",
        borderLeft: "3px solid #F07814",
      }}>
        <p style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Translation
        </p>
        <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.5 }}>{item.target}</p>
      </div>

      <style>{`@keyframes cardIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}

function Chip({
  children, onClick, active, danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "5px 12px",
        borderRadius: 8,
        border: danger ? "1px solid #fecaca" : active ? "1px solid #012D5A" : "1px solid #e2e8f0",
        background: danger ? "#fef2f2" : active ? "#012D5A" : "white",
        color: danger ? "#ef4444" : active ? "white" : "#64748b",
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.18s",
        whiteSpace: "nowrap",
      }}
      onMouseOver={(e) => {
        if (danger) {
          (e.currentTarget as HTMLButtonElement).style.background = "#fee2e2";
          (e.currentTarget as HTMLButtonElement).style.color = "#dc2626";
        } else if (!active) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#012D5A";
          (e.currentTarget as HTMLButtonElement).style.color = "#012D5A";
        }
      }}
      onMouseOut={(e) => {
        if (danger) {
          (e.currentTarget as HTMLButtonElement).style.background = "#fef2f2";
          (e.currentTarget as HTMLButtonElement).style.color = "#ef4444";
        } else if (!active) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#e2e8f0";
          (e.currentTarget as HTMLButtonElement).style.color = "#64748b";
        }
      }}
    >
      {children}
    </button>
  );
}
