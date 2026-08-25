import Link from "next/link";

type SiteHeaderProps = {
  active?: "insights";
};

export function SiteHeader({ active }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <Link className="brand" href="/#top" aria-label="Anoop Tej Thotapalli, home">
        <span className="brand-mark">AT</span>
        <span className="brand-name">
          Anoop Tej
          <small>Independent DevOps &amp; AIOps Architect</small>
        </span>
      </Link>
      <nav className="nav-links" aria-label="Primary navigation">
        <Link href="/#expertise">Expertise</Link>
        <Link href="/#work">Selected work</Link>
        <Link href="/#approach">Approach</Link>
        <Link
          className={active === "insights" ? "nav-link-active" : undefined}
          href="/insights/"
        >
          Writing &amp; Talks
        </Link>
        <a
          href="https://www.linkedin.com/in/anooptej-t-a3754b77"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <a
          className="nav-cta nav-start"
          href="mailto:anooptejthotapalli@gmail.com?subject=Freelance%20Architecture%20Enquiry"
        >
          Start a conversation
        </a>
        <a
          className="nav-cta nav-fiverr"
          href="https://www.fiverr.com/anooptejt"
          target="_blank"
          rel="noreferrer"
        >
          Hire me on Fiverr
        </a>
      </nav>
    </header>
  );
}
