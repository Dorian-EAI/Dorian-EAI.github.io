import Link from "next/link";
import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <span>
          © 2026 {profile.name} — 用 Next.js、原生 CSS 动效和一枚 GLSL 球体搭成
        </span>
        <Link href="/#top">回到顶部 ↑</Link>
      </div>
    </footer>
  );
}
