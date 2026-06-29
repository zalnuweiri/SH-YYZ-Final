// generate-sitemap.js
import { SitemapStream, streamToPromise } from "sitemap";
import { writeFileSync } from "fs";
import path from "path";

const siteUrl = "https://silenth.netlify.app"; // <-- change this to your domain

// List of all routes on your site
const routes = [
    "/",
    "/menu",
    "/events",
    "/story",
    "/happy-hour",
    "/reservations"
];

async function generateSitemap() {
    const sitemap = new SitemapStream({ hostname: siteUrl });

    for (const url of routes) {
        sitemap.write({ url, changefreq: "weekly", priority: 0.8 });
    }

    sitemap.end();

    const xml = (await streamToPromise(sitemap)).toString();

    // Save into the /public directory so it's deployed with the site
    const filePath = path.resolve("./public/sitemap.xml");
    writeFileSync(filePath, xml);
    console.log(`✅ Sitemap created at: ${filePath}`);
}

generateSitemap().catch(console.error);
