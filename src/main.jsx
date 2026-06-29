import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { OTProvider } from "./components/OTwidget.jsx";

// Meta Pixel Loader
function MetaPixel() {
    useEffect(() => {
        // Insert the Meta Pixel script dynamically
        !(function (f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function () {
                n.callMethod
                    ? n.callMethod.apply(n, arguments)
                    : n.queue.push(arguments);
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = true;
            n.version = "2.0";
            n.queue = [];
            t = b.createElement(e);
            t.async = true;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s);
        })(
            window,
            document,
            "script",
            "https://connect.facebook.net/en_US/fbevents.js"
        );

        // Initialize with your Pixel ID
        window.fbq("init", "965298831168747");
        window.fbq("track", "PageView");
    }, []);

    // noscript fallback (kept inside React render tree)
    return (
        <noscript>
            <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src="https://www.facebook.com/tr?id=965298831168747&ev=PageView&noscript=1"
                alt="facebook pixel"
            />
        </noscript>
    );
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        {/* OTProvider mounted ONCE here (de-dup; previously also in App.jsx — G-4.4) */}
        <OTProvider>
            <BrowserRouter>
                <MetaPixel />
                <App />
            </BrowserRouter>
        </OTProvider>
    </StrictMode>
);
