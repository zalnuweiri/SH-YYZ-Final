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

export default function SEO({
                                title,
                                description,
                                jsonLd,
                                url,
                                index = true,
                            }) {
    return (
        <>
            <title>{title}</title>

            {description && (
                <meta name="description" content={description} />
            )}

            {url && (
                <link rel="canonical" href={url} />
            )}

            <meta
                name="robots"
                content={index ? "index, follow" : "noindex, nofollow"}
            />

            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </>
    );
}