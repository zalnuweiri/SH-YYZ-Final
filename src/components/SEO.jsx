// src/components/SEO.jsx

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