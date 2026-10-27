"use client";

import React, { useMemo } from "react";
import { TOUR_CHAPTERS, TourChapter } from "@/data/hotelData";
import { BedIcon, PauseIcon, PlayIcon } from "./Icons";

interface TourChapterOverlayProps {
  currentFrame: number;
  totalFrames?: number;
  onReserveSuite: (suiteId?: string) => void;
  onSelectChapter?: (chapter: TourChapter) => void;
  isAutoTour?: boolean;
  onToggleAutoTour?: () => void;
}

export default function TourChapterOverlay({
  currentFrame,
  onReserveSuite,
  onSelectChapter,
  isAutoTour = false,
  onToggleAutoTour,
}: TourChapterOverlayProps) {
  // Determine which chapter is active based on current frame
  const activeChapter = useMemo(() => {
    return (
      TOUR_CHAPTERS.find(
        (ch) => currentFrame >= ch.startFrame && currentFrame <= ch.endFrame
      ) || TOUR_CHAPTERS[0]
    );
  }, [currentFrame]);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-start p-6 sm:p-10 select-none">
      {/* Top HUD: Chapter Name & Suite Callout */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pt-16 sm:pt-20">
        <div className="pointer-events-auto max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/40 text-amber-300 text-[10px] font-mono tracking-widest uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>
              Chapter {activeChapter.number} of 05 • {activeChapter.title}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif text-white tracking-wide leading-tight drop-shadow-md">
            {activeChapter.subtitle}
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 mt-2 font-light leading-relaxed drop-shadow line-clamp-2 sm:line-clamp-none max-w-md">
            {activeChapter.description}
          </p>

          {/* Chapter Feature Pills */}
          <div className="flex flex-wrap gap-2 mt-3">
            {activeChapter.specs.map((spec, i) => (
              <span
                key={i}
                className="text-[10px] px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-sm border border-white/10 text-zinc-200 font-mono"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Top Right Quick Reserve for This Space */}
        <div className="pointer-events-auto flex items-center gap-2 self-start">
          <button
            onClick={() => onReserveSuite(activeChapter.suiteId)}
            className="px-4 py-2 rounded-full bg-black/65 backdrop-blur-md border border-amber-400/50 hover:border-amber-300 text-amber-300 hover:text-white text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg hover:bg-amber-400/20"
          >
            <BedIcon size={14} />
            <span>Book This Space</span>
          </button>
          {onToggleAutoTour && (
            <button
              onClick={onToggleAutoTour}
              aria-pressed={isAutoTour}
              className="px-4 py-2 rounded-full bg-black/65 backdrop-blur-md border border-white/30 hover:border-amber-300 text-white text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg"
            >
              {isAutoTour ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
              <span>{isAutoTour ? "Pause Tour" : "Auto Tour"}</span>
            </button>
          )}
        </div>
      </div>
      {onSelectChapter && (
        <nav
          aria-label="Tour chapters"
          className="pointer-events-auto mt-4 flex flex-wrap gap-2"
        >
          {TOUR_CHAPTERS.map((chapter) => {
            const isActive = chapter.id === activeChapter.id;
            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => onSelectChapter(chapter)}
                aria-current={isActive ? "step" : undefined}
                className={`rounded-full border px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${
                  isActive
                    ? "border-amber-300 bg-amber-400/20 text-amber-200"
                    : "border-white/30 bg-black/50 text-zinc-200 hover:border-amber-300 hover:text-white"
                }`}
              >
                {chapter.number} {chapter.title}
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}
