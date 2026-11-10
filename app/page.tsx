import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroCanvas } from "@/components/hero-canvas";
import { LocalClock } from "@/components/local-clock";
import { ProjectCard } from "@/components/project-card";
import { CopyEmail } from "@/components/copy-email";
import { capabilities, principles, profile, projects } from "@/content/profile";

export default function Home() {
  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <SiteHeader />

      <main>
        <section className="hero" id="top">
          <HeroCanvas />

          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="eyebrow rise d1">
                Portfolio 2026 — {profile.location}
              </p>

              <h1 className="hero-name rise d2">
                {profile.name}
                <span className="hero-name-dot">.</span>
              </h1>

              <p className="hero-role rise d3">{profile.role}</p>

              <p className="hero-tagline rise d4">{profile.tagline}</p>

              <p className="hero-intro rise d5">{profile.intro}</p>

              <div className="hero-actions rise d6">
                <a className="btn btn-primary" href="#work">
                  查看作品 <span aria-hidden="true">↓</span>
                </a>
                <a className="btn btn-ghost" href={`mailto:${profile.email}`}>
                  聊聊合作
                </a>
              </div>
            </div>

            <aside className="hero-card glass rise d6" aria-label="当前状态">
              <p className="hero-card-label">Now</p>
              <p className="hero-card-value">{profile.now}</p>

              <div className="hero-card-row">
                <span className="status-dot">{profile.availability}</span>
              </div>

              <div className="hero-card-row">
                <span>Asia/Shanghai</span>
                <LocalClock />
              </div>
            </aside>
          </div>

          <div className="hero-scroll" aria-hidden="true">
            <span className="hero-scroll-line" />
            Scroll
          </div>
        </section>

        <section className="section" id="work">
          <div className="container">
            <div className="section-head reveal">
              <p className="section-index">01 / Selected work</p>
              <div>
                <h2 className="section-title">选出来的三件事</h2>
                <p className="section-lead">
                  不是全部作品，是最近真正投入时间的三件。点开可以看我当时做了什么判断，以及哪些地方还在验证。
                </p>
              </div>
            </div>

            <div className="work-list">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="approach">
          <div className="container approach">
            <div className="approach-sticky">
              <div className="section-head reveal">
                <div>
                  <p className="section-index">02 / Approach</p>
                  <h2 className="section-title">我的工作方式</h2>
                </div>
              </div>

              <p className="section-lead">
                我通常一个人从想法做到上线。这意味着设计不能只停在图上，代码也不能等到最后才考虑。
              </p>

              <ul className="capability-list" aria-label="能力范围">
                {capabilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="principle-list">
              {principles.map((item) => (
                <article className="principle reveal" key={item.index}>
                  <span className="principle-index">{item.index}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="container">
            <p className="contact-eyebrow">03 / Contact</p>

            <h2 className="contact-title reveal">
              如果你也在做一件小而具体的事
            </h2>

            <p className="contact-body">
              我开放产品合作、界面与前端实现，也愿意和早期项目聊聊定位和取舍。写信时简单说一句你在做什么就好。
            </p>

            <div className="contact-row">
              <a className="contact-email" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>

              <div className="contact-actions">
                <CopyEmail email={profile.email} />
                <a className="btn btn-ghost" href={`mailto:${profile.email}`}>
                  写一封邮件 <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <div className="contact-meta">
              <span>Based in {profile.location}</span>
              {profile.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  {...(social.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
