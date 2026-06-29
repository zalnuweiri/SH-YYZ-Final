/** Build a 2-level BreadcrumbList JSON-LD (Home → the given page). */
export function breadcrumb(name, url) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.silenth.ca" },
            { "@type": "ListItem", position: 2, name, item: url },
        ],
    };
}

export default function SEO({ title, description, jsonLd, url }) {
    return (
        <>
            {/* Title */}
            <title>{title}</title>

            {/* Meta Description */}
            <meta name="description" content={description} />

            {/* Canonical */}
            {url && <link rel="canonical" href={url} />}

            {/* Robots */}
            <meta name="robots" content="index, follow" />

            {/* JSON-LD (supports single object OR array) */}
            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </>
    );
}