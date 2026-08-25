import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { appearances, fieldNotes, publications } from "../content";

export const metadata: Metadata = {
  title: "Writing & Talks | Anoop Tej Thotapalli",
  description:
    "Articles, field notes and technical talks on DevOps, platform engineering, AIOps, responsible AI and technology leadership.",
};

export default function InsightsPage() {
  return (
    <main>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <SiteHeader active="insights" />

      <section className="archive-hero" id="top">
        <div id="content">
          <p className="eyebrow">Writing &amp; talks</p>
          <h1>Ideas for building systems that teams can operate.</h1>
          <p>
            A complete archive of long-form articles, concise field notes and
            technical sessions grounded in real engineering work.
          </p>
        </div>
        <dl className="archive-counts" aria-label="Published content totals">
          <div>
            <dt>{String(publications.length).padStart(2, "0")}</dt>
            <dd>Articles</dd>
          </div>
          <div>
            <dt>{String(fieldNotes.length).padStart(2, "0")}</dt>
            <dd>Field notes</dd>
          </div>
          <div>
            <dt>{String(appearances.length).padStart(2, "0")}</dt>
            <dd>Talks</dd>
          </div>
        </dl>
      </section>

      <div className="archive-index-nav" aria-label="Archive sections">
        <a href="#articles">Articles</a>
        <a href="#field-notes">Field notes</a>
        <a href="#talks">Talks &amp; webinars</a>
      </div>

      <section className="archive-section archive-articles" id="articles">
        <div className="archive-section-heading">
          <p className="eyebrow">Articles</p>
          <h2>Long-form thinking and practical guidance.</h2>
        </div>
        <div className="archive-publications">
          {publications.map((publication, index) => (
            <article className="archive-publication-row" key={publication.title}>
              <div className="archive-publication-number">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <time>{publication.date}</time>
              </div>
              <div>
                <p>{publication.topic}</p>
                <h3>{publication.title}</h3>
                <span>{publication.text}</span>
              </div>
              <div className="archive-publication-links">
                {publication.links.map((link) => (
                  <a
                    href={link.href}
                    key={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="archive-section archive-notes-section" id="field-notes">
        <div className="archive-section-heading">
          <p className="eyebrow">LinkedIn field notes</p>
          <h2>Short observations from the work.</h2>
        </div>
        <ol className="archive-field-notes">
          {fieldNotes.map((note, index) => (
            <li key={note.href}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <a href={note.href} target="_blank" rel="noreferrer">
                <small>{note.topic}</small>
                <strong>{note.title}</strong>
              </a>
              <span aria-hidden="true">↗</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="archive-section archive-talks-section" id="talks">
        <div className="archive-section-heading">
          <p className="eyebrow">Talks &amp; webinars</p>
          <h2>Sharing the architecture behind delivery.</h2>
        </div>
        <div className="archive-talks">
          {appearances.map((appearance) => (
            <article key={appearance.href}>
              <div>
                <span>{appearance.type}</span>
                <time>{appearance.year}</time>
              </div>
              <h3>{appearance.title}</h3>
              <p>{appearance.text}</p>
              <a href={appearance.href} target="_blank" rel="noreferrer">
                {appearance.action} <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="archive-consulting">
        <div>
          <p className="eyebrow">Apply the thinking</p>
          <h2>Bring a platform or delivery challenge.</h2>
          <p>
            Get focused support with architecture reviews, implementation
            roadmaps and AI assisted operations.
          </p>
        </div>
        <a href="https://www.fiverr.com/anooptejt" target="_blank" rel="noreferrer">
          Hire me on Fiverr <span aria-hidden="true">↗</span>
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}
