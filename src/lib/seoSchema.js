// src/lib/seoSchema.js

/** Build a 2-level BreadcrumbList JSON-LD (Home → the given page). */
export function breadcrumb(name, url) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.silenth.ca/",
            },
            {
                "@type": "ListItem",
                position: 2,
                name,
                item: url,
            },
        ],
    };
}