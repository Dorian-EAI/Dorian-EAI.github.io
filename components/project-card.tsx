"use client";

import { useRef } from "react";
import type { CSSProperties, PointerEvent } from "react";
import type { Project } from "@/content/profile";
import { useReducedMotion } from "@/components/use-reduced-motion";

export function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const reducedMotion = useReducedMotion();

  function handlePointerMove(event: PointerEvent<HTMLAnchorElement>) {
    const card = cardRef.current;
    if (!card || reducedMotion || event.pointerType !== "mouse") return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    card.style.setProperty("--tilt-x", `${(0.5 - y) * 2.6}deg`);
    card.style.setProperty("--tilt-y", `${(x - 0.5) * 3.4}deg`);
    card.style.setProperty("--glare-x", `${x * 100}%`);
    card.style.setProperty("--glare-y", `${y * 100}%`);
  }

  function resetTilt() {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <a
      ref={cardRef}
      className="project reveal"
      href={`/work/${project.slug}/`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <span className="project-glare" aria-hidden="true" />

      <div className="project-index" aria-hidden="true">
        {project.index}
      </div>

      <div className="project-main">
        <p className="project-kicker">
          {project.year} — {project.status}
        </p>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="project-summary">{project.summary}</p>

        <span className="project-cta">
          查看案例 <span aria-hidden="true">→</span>
        </span>
      </div>

      <div className="project-side">
        <div
          className="project-glyph"
          style={
            {
              "--g1": project.accent[0],
              "--g2": project.accent[1],
              viewTransitionName: `project-${project.slug}`,
            } as CSSProperties
          }
          aria-hidden="true"
        />
        <p className="project-role">{project.role}</p>
      </div>
    </a>
  );
}
