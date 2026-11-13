import { SITE_URL, faqPageJsonLd, organizationJsonLd } from "@/lib/site";
import { HUB, HUB_PATH, ROLES, ROLES_UPDATED, type Role } from "@/lib/roles";

function breadcrumb(id: string, items: [string, string][]) {
  return {
    "@type": "BreadcrumbList",
    "@id": id,
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };
}

export function hubJsonLd() {
  const url = `${SITE_URL}${HUB_PATH}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: HUB.title,
        description: HUB.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#roles` },
        dateModified: ROLES_UPDATED,
        inLanguage: "en-US",
      },
      breadcrumb(`${url}#breadcrumb`, [
        ["Home", "/"],
        ["AI or hire?", HUB_PATH],
      ]),
      {
        "@type": "ItemList",
        "@id": `${url}#roles`,
        name: "AI or hire? Guides by role",
        itemListElement: ROLES.map((r, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: r.question,
          url: `${SITE_URL}${HUB_PATH}/${r.slug}`,
        })),
      },
      faqPageJsonLd(HUB.faqs, `${url}#faq`),
    ],
  };
}

export function roleJsonLd(role: Role) {
  const url = `${SITE_URL}${HUB_PATH}/${role.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: role.question,
        headline: role.question,
        description: role.description,
        abstract: role.answer,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        about: { "@type": "Occupation", name: role.name },
        citation: role.sources.map((s) => ({ "@type": "CreativeWork", name: s.label, url: s.url })),
        dateModified: ROLES_UPDATED,
        inLanguage: "en-US",
      },
      breadcrumb(`${url}#breadcrumb`, [
        ["Home", "/"],
        ["AI or hire?", HUB_PATH],
        [role.short, `${HUB_PATH}/${role.slug}`],
      ]),
      faqPageJsonLd(role.faqs, `${url}#faq`),
    ],
  };
}
