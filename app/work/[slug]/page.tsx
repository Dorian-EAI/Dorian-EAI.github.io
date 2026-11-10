import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { profile, projects } from "@/content/profile";

export const dynamicParams = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} — ${profile.name}`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — ${profile.name}`,
      description: project.summary,
      type: "article",
      locale: "zh_CN",
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);

  if (index === -1) {
    notFound();
  }

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <SiteHeader />

      <main className="detail">
        <article>
          <header className="container detail-header">
            <a className="detail-back" href="/#work">
              <span aria-hidden="true">←</span> 返回作品
            </a>

            <div className="detail-visual-wrap">
              <div
                className="detail-visual"
                style={
                  {
                    "--g1": project.accent[0],
                    "--g2": project.accent[1],
                    viewTransitionName: `project-${project.slug}`,
                  } as CSSProperties
                }
                aria-hidden="true"
              />
            </div>

            <div className="detail-heading">
              <p className="eyebrow detail-eyebrow">
                {project.year} — Case study {project.index}
              </p>

              <h1 className="detail-title">{project.title}</h1>
              <p className="detail-subtitle">{project.subtitle}</p>

              <div className="detail-meta">
                <span>
                  <em>角色</em>
                  {project.role}
                </span>
                <span>
                  <em>状态</em>
                  {project.status}
                </span>
                <span>
                  <em>年份</em>
                  {project.year}
                </span>
              </div>
            </div>
          </header>

          <div className="container detail-content">
            <p className="detail-lede">{project.summary}</p>
            <p className="detail-intro">{project.detail}</p>

            <div className="detail-chapters">
              {project.chapters.map((chapter, chapterIndex) => (
                <section className="detail-chapter reveal" key={chapter.title}>
                  <span className="detail-chapter-index">
                    {String(chapterIndex + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2>{chapter.title}</h2>
                    <p>{chapter.body}</p>
                  </div>
                </section>
              ))}
            </div>

            <ul className="project-stack detail-stack" aria-label="使用到的能力">
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="detail-cta">
              <p>如果你在做类似的东西，或者想聊聊其中的取舍。</p>
              <a className="btn btn-primary" href={`mailto:${profile.email}`}>
                写一封邮件 <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </article>

        <nav className="container detail-next" aria-label="下一个案例">
          <p className="detail-next-label">Next case — {next.index}</p>
          <a className="detail-next-link" href={`/work/${next.slug}/`}>
            <span>{next.title}</span>
            <span aria-hidden="true">→</span>
          </a>
          <Link className="detail-next-home" href="/#work">
            全部作品
          </Link>
        </nav>
      </main>

      <SiteFooter />
    </>
  );
}
