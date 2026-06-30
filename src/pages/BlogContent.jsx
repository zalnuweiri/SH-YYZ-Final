// src/pages/BlogContent.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabaseClient";

const BLOG_IMAGE_BUCKET = "blog-images";

function BackArrow() {
    return (
        <svg className="shrink-0 size-[24px]" fill="none" viewBox="0 0 24 24">
            <path
                d="M15 18L9 12L15 6"
                stroke="#EB4660"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    );
}

function isFullImageUrl(value) {
    return /^https?:\/\//i.test(value);
}

function resolveImageUrl(value) {
    if (!value) return "/placeholder.jpg";

    const cleanValue = String(value).trim();

    if (isFullImageUrl(cleanValue)) return cleanValue;

    const cleanPath = cleanValue.replace(/^\/+/, "");

    const { data } = supabase.storage
        .from(BLOG_IMAGE_BUCKET)
        .getPublicUrl(cleanPath);

    return data?.publicUrl || "/placeholder.jpg";
}

function splitBodyText(bodyText) {
    return String(bodyText || "")
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);
}

export default function BlogContent() {
    const { slug } = useParams();

    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let ignore = false;

        async function loadArticle() {
            setIsLoading(true);
            setErrorMessage("");

            const { data, error } = await supabase
                .from("blog_posts")
                .select(`
                    id,
                    title,
                    slug,
                    status,
                    blog_post_content (
                        title,
                        image_url,
                        body_text
                    )
                `)
                .eq("slug", slug)
                .eq("status", "published")
                .maybeSingle();

            if (ignore) return;

            if (error) {
                console.error("[BlogContent] Failed to load article:", error);
                setErrorMessage("We couldn't load this article.");
                setArticle(null);
                setIsLoading(false);
                return;
            }

            if (!data || !data.blog_post_content) {
                setErrorMessage("Article not found.");
                setArticle(null);
                setIsLoading(false);
                return;
            }

            setArticle({
                id: data.id,
                slug: data.slug,
                title: data.blog_post_content.title || data.title,
                imageUrl: resolveImageUrl(data.blog_post_content.image_url),
                bodyText: data.blog_post_content.body_text,
            });

            setIsLoading(false);
        }

        loadArticle();

        return () => {
            ignore = true;
        };
    }, [slug]);

    const paragraphs = useMemo(
        () => splitBodyText(article?.bodyText),
        [article?.bodyText]
    );

    return (
        <>
        <SEO
            title={`${article.title} | Silent H Toronto`}
            description="Read the latest from Silent H Toronto."
            url={`https://www.silenth.ca/blogs/${article.slug}`}
            jsonLd={breadcrumb(article.title, `https://www.silenth.ca/blogs/${article.slug}`)}
        />
        <div className="bg-[#ece1d4] min-h-screen w-full text-[#0b0b0b]">


            <main className="w-full px-6 pt-[100px] pb-32">
                <div className="mx-auto w-full max-w-[946px]">
                    <Link
                        to="/blogs"
                        className="inline-flex items-center gap-3 mb-10 group"
                    >
                        <BackArrow/>

                        <span
                            className="text-[#eb4660] text-[16px] tracking-[1.6px] uppercase leading-none"
                            style={{
                                fontFamily: "'NeueBit', sans-serif",
                                fontWeight: 700,
                            }}
                        >
                Back to articles
            </span>
                    </Link>

                    {isLoading && (
                        <p
                            className="text-[22px] tracking-[2.2px] leading-[1.2]"
                            style={{
                                fontFamily: "'NeueBit', sans-serif",
                                fontWeight: 400,
                            }}
                        >
                            Loading article...
                        </p>
                    )}

                    {!isLoading && errorMessage && (
                        <div>
                            <h1
                                className="text-[28px] tracking-[0.56px] leading-[1.2]"
                                style={{
                                    fontFamily: "'_Monoglyphic', sans-serif",
                                    fontWeight: 400,
                                }}
                            >
                                {errorMessage}
                            </h1>

                            <Link
                                to="/blogs"
                                className="mt-8 inline-flex text-[#eb4660] text-[16px] tracking-[1.6px] uppercase"
                                style={{
                                    fontFamily: "'NeueBit', sans-serif",
                                    fontWeight: 700,
                                }}
                            >
                                Return to articles
                            </Link>
                        </div>
                    )}

                    {!isLoading && article && (
                        <>
                            <div className="flex flex-col gap-8 mb-10 w-full">
                                <p
                                    className="text-[22px] tracking-[2.2px] leading-[1.2] uppercase"
                                    style={{
                                        fontFamily: "'NeueBit', sans-serif",
                                        fontWeight: 400,
                                    }}
                                >
                                    A blog full of experiences
                                </p>

                                <h1
                                    className="text-[28px] tracking-[0.56px] leading-[1.2]"
                                    style={{
                                        fontFamily: "'_Monoglyphic', sans-serif",
                                        fontWeight: 400,
                                    }}
                                >
                                    {article.title}
                                </h1>
                            </div>

                            <div className="w-full mb-12 rounded-[4px] overflow-hidden">
                                <img
                                    src={article.imageUrl}
                                    alt={article.title}
                                    className="w-full h-[clamp(280px,46.875vw,600px)] object-cover"
                                />
                            </div>

                            <article
                                className="w-full text-[22px] tracking-[2.2px] leading-[1.2] flex flex-col gap-[1em]"
                                style={{
                                    fontFamily: "'NeueBit', sans-serif",
                                    fontWeight: 400,
                                }}
                            >
                                {paragraphs.map((paragraph, index) => (
                                    <p key={`${paragraph.slice(0, 24)}-${index}`}>
                                        {paragraph}
                                    </p>
                                ))}
                            </article>
                        </>
                    )}
                </div>
            </main>


        </div>
        </>
    );
}