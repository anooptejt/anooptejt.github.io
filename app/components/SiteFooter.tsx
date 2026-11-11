import Link from "next/link";

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-brand">
        <span className="brand-mark">AT</span>
        <p>
          <strong>Anoop Tej Thotapalli</strong>
          Independent DevOps · Platform Engineering · AIOps
        </p>
      </div>
      <p className="footer-note">
        Independent architecture consulting for engineering platforms,
        delivery transformation and intelligent operations. Bengaluru, India.
      </p>
      <div className="footer-links">
        <Link href="/insights/">Writing &amp; Talks</Link>
        <a href="https://www.fiverr.com/anooptejt" target="_blank" rel="noreferrer">
          Fiverr ↗
        </a>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
