import Link from "next/link";
import { profile } from "@/content/profile";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link className="brand" href="/" aria-label="回到首页">
          <span className="brand-mark" aria-hidden="true" />
          {profile.name} / Portfolio
        </Link>

        <nav className="nav" aria-label="页面导航">
          <Link href="/#work">作品</Link>
          <Link href="/#approach">方法</Link>
          <Link href="/#contact" className="nav-cta">
            联系
          </Link>
        </nav>
      </div>
    </header>
  );
}
