"use client";

import { useState } from "react";

type HoverVideoPreviewProps = {
  provider: "bilibili" | "youtube";
  videoId: string;
  href: string;
  label: string;
};

export default function HoverVideoPreview({ provider, videoId, href, label }: HoverVideoPreviewProps) {
  const [isPreviewing, setIsPreviewing] = useState(false);
  const encodedId = encodeURIComponent(videoId);
  const playerUrl = provider === "youtube"
    ? `https://www.youtube.com/embed/${encodedId}?autoplay=${isPreviewing ? "1" : "0"}&mute=1&playsinline=1&controls=1&rel=0`
    : `https://player.bilibili.com/player.html?bvid=${encodedId}&poster=1&autoplay=${isPreviewing ? "1" : "0"}&muted=1&danmaku=0`;

  return (
    <div
      className="project-detail-video"
      onMouseEnter={() => setIsPreviewing(true)}
      onMouseLeave={() => setIsPreviewing(false)}
      onFocus={() => setIsPreviewing(true)}
      onBlur={() => setIsPreviewing(false)}
    >
      <iframe
        src={playerUrl}
        title={`${label} video preview`}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
      <a
        className="project-video-link"
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Watch ${label} on Bilibili`}
      >
        <span>{label}</span>
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
