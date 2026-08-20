"use client";

import { useEffect, useState } from "react";

const visitorApiBase = "https://gang-yang-visitor-stats.lalayang-123456.chatgpt.site";

type VisitorStats = {
  pageViews: number;
  countries: number;
  countryCodes: string[];
};

export default function VisitorMap() {
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    if (!visitorApiBase) return;

    const shouldCount = window.location.hostname === "lalayang123456-ctrl.github.io";
    fetch(`${visitorApiBase}/api/visitors`, {
      method: shouldCount ? "POST" : "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Visitor service unavailable");
        return response.json() as Promise<VisitorStats>;
      })
      .then(setStats)
      .catch(() => setIsOnline(false));
  }, []);

  const mapSource = stats
    ? `${visitorApiBase}/api/visitor-map.svg?v=${stats.pageViews}`
    : "/assets/images/visitor-world-map.svg";

  return (
    <aside className="visitor-map" aria-label="Global visitor statistics">
      <div className="visitor-map-heading">
        <span>Global visitors</span>
        <span className="visitor-map-status">
          <i aria-hidden="true" /> {isOnline ? (stats ? "Live" : "Connecting") : "Offline"}
        </span>
      </div>
      <div className="visitor-map-canvas">
        <img
          src={mapSource}
          alt="World map highlighting countries represented in the visitor statistics"
        />
      </div>
      <div className="visitor-map-stats" aria-live="polite">
        <span>Page views <b>{stats ? stats.pageViews.toLocaleString("en-US") : "—"}</b></span>
        <span>Countries <b>{stats ? stats.countries.toLocaleString("en-US") : "—"}</b></span>
      </div>
    </aside>
  );
}
