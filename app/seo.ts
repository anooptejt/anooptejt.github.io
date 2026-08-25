export const siteUrl = "https://anooptejt.github.io";
export const siteName = "Anoop Tej Thotapalli";

export const profileUrls = [
  "https://www.fiverr.com/anooptejt",
  "https://www.linkedin.com/in/anooptej-t-a3754b77",
  "https://anoopt0106.medium.com/",
  "https://github.com/anooptejt",
  "https://www.papercall.io/speakers/73756",
];

export const personStructuredData = {
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: siteName,
  alternateName: "Anoop Tej",
  url: `${siteUrl}/`,
  image: `${siteUrl}/anoop-portrait.jpg`,
  jobTitle: "Independent DevOps, Platform Engineering and AIOps Architect",
  description:
    "Independent architect helping global engineering teams design secure delivery platforms, GitOps workflows and AI assisted operations.",
  homeLocation: {
    "@type": "Place",
    name: "Bengaluru, India",
  },
  knowsAbout: [
    "DevOps architecture",
    "Platform engineering",
    "AIOps",
    "GitOps",
    "MLOps",
    "Cloud architecture",
    "Engineering Front Door",
    "Responsible AI",
  ],
  sameAs: profileUrls,
};

export const websiteStructuredData = {
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: `${siteUrl}/`,
  name: siteName,
  alternateName: "Anoop Tej DevOps and AIOps Architecture",
  description:
    "DevOps, platform engineering and AIOps architecture portfolio, consulting services, technical writing and talks.",
  inLanguage: "en",
  author: { "@id": `${siteUrl}/#person` },
};
