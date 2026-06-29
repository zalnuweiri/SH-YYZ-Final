import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Button from "../components/Button";
import Reveal from "../lib/motion/Reveal";
import Parallax from "../lib/motion/Parallax";
import { useOTWidget } from "../components/OTwidget.jsx";
import { T, M, BTN_OUTLINE } from "../styles/figmaTokens";
import MenuCarousel from "../components/MenuCarousel";


// Outlined Secondary button (cream border, label fades cream→pink on hover). Renders a
// <Link> when `to` is set, else a <button> (for actions like the booking widget). Pass
// width/height via `size`, e.g. size="w-[16.875vw] h-[3.75vw]".
function OutlineButton({ to, onClick, size = "", children }) {
  const cls = `${BTN_OUTLINE} ${size}`;
  return to ? (
      <Link to={to} className={cls}>{children}</Link>
  ) : (
      <button onClick={onClick} className={cls}>{children}</button>
  );
}

// ── Silent H Home — Desktop pixel-exact rebuild from Figma ground-truth ──
// Design frame: 1280×4842. Scale rule: 1px @1280 = 0.078125vw (full-bleed vw).
// Every desktop measurement below is px × 0.078125. Fonts: Mondwest headings
// (font-display), NeueBit body/UI (font-body), Monoglyphic chef-quote 2nd line.
// Colors are the RESOLVED Figma style: SH-Off-white #ece1d4 → text-sh-cream,
// SH-Light-Beige #dfa867 → text-sh-gold, SH-Pink #eb4660 → text-sh-pink.
// The page is dark (black body); the global DustGate shows through transparent
// sections, except where Figma has photos / gradients (handled per-section).

// Menú grid — Frame 1435 @(167,1060). Three cards in a row (Frame 1434, gap21):
//   Frame 1431 269×370 (fig-dsc-4248)  |  Frame 1432 366×371 (Carbelle Djossa)
//   |  Frame 1433 269×371 (DSC9358). Each card: photo r4 + "PRODUCT NAME" caption.
// Then Frame 1417: 8 pagination dots (gap8), the 4th pink (#eb4660), rest grey #9a9a9a.
// Exact De Monterrey arch path (decoded from Figma vector blob 648, "Vector 2", 365×639).
// Used to clip the Monterrey map VIDEO and to stroke the 20px gold OUTSIDE frame (+ thin black).
// Start at the TOP-CENTRE (a smooth curve point), not a corner. A dashed stroke caps (flat) at the
// path start/end — if that point is the bottom-RIGHT corner the gold miter-square never renders
// there while the bottom-left (mid-path) one does. Starting at the top makes BOTH bottom corners
// normal mid-path joins, so both gold squares render. (Same shape, just reordered + clockwise.)
const DM_ARCH = "M 181.6 0 C 279.17 0 344.52 50.62 365 75.93 L 365 639 L 0 639 L 0 75.93 C 19.88 50.62 84.02 0 181.6 0 Z";

const MENU_CARDS = [
  { src: "/redesign/fig-dsc-4248-1.jpg", w: "21.02vw", h: "28.91vw", pos: "object-[50%_50%]" },
  { src: "/redesign/fig-01-06-23-carbelle-djossa-tt-54-w.jpg", w: "28.59vw", h: "28.98vw", pos: "object-[50%_40%]" },
  { src: "/redesign/fig--dsc9358-enhanced-nr-1.jpg", w: "21.02vw", h: "28.98vw", pos: "object-[50%_50%]" },
];

export default function Home() {
  const { setShowWidget } = useOTWidget();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Silent H",
    url: "https://www.silenth.ca",
    telephone: "+14169003535",
    servesCuisine: "Mexican",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "461 King St W",
      addressLocality: "Toronto",
      addressRegion: "ON",
      postalCode: "M5V 1K4",
      addressCountry: "CA",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "17:00",
        closes: "00:00",
      },
    ],
    sameAs: [
      "https://www.instagram.com/silenth.to/",
      "https://www.tiktok.com/@silenth.to",
      "https://www.facebook.com/silenth.to/",
    ],
    menu: "https://www.silenth.ca/menu",
    hasMap: "https://www.google.com/maps?q=Silent+H+Toronto",
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.5", reviewCount: "1251" },
  };

  return (
      <>
        <SEO
            title="Silent H Toronto | Modern Mexican Cuisine"
            description="Authentic yet modern Mexican dining in the heart of Toronto."
            url="https://www.silenth.ca/"
            jsonLd={jsonLd}
        />
        <main className="relative z-10 font-body text-sh-cream">
          {/* Shared SVG tone-curve filter for the Private Dining photo (gamma 2.8 — preserves
            highlights, crushes mids). Lives here (always rendered) so BOTH the desktop and
            mobile photos can reference url(#pdTone); was previously trapped in the desktop-only
            block (display:none on mobile → filter didn't apply → bright photo). */}
          <svg width="0" height="0" className="absolute" aria-hidden>
            <filter id="pdTone" colorInterpolationFilters="sRGB">
              <feComponentTransfer>
                <feFuncR type="gamma" amplitude="1" exponent="2.8" offset="0" />
                <feFuncG type="gamma" amplitude="1" exponent="2.8" offset="0" />
                <feFuncB type="gamma" amplitude="1" exponent="2.8" offset="0" />
              </feComponentTransfer>
            </filter>
          </svg>
          {/* ════════════════════════════ 1. HERO ════════════════════════════
            Layer_1 sun graphic @(-284,-268) 971×1193 bleeds off top-left.
            Frame 1427 text @(453,283) 660w, gap32: H1 "Mexican flavours, refined"
            Mondwest Bold 64px ls4.48 cream + paragraph NeueBit 22px cream +
            SecondaryButton 216×48 r4. The hero dust is the global DustGate. */}
          <section className="relative w-full overflow-hidden">
            <div className="relative hidden md:block w-full h-[73vw]">
              {/* Layer_1 @(-284,-268) 971×1193 → left -22.19vw, top -20.94vw, w 75.86vw */}
              <Parallax speed={-0.18} className="absolute left-[-22.19vw] top-[-20.94vw] w-[75.86vw]">
                <img src="/redesign/home-hero.png" alt="" className="w-full h-auto select-none" draggable="false" />
              </Parallax>
              {/* Frame 1427 @(453,283) → left 35.39vw, top 22.11vw, w 51.56vw; gap32 = 2.5vw */}
              <Parallax speed={0.1} className="absolute left-[35.39vw] top-[22.11vw] w-[51.56vw]">
                <Reveal>
                  <div className="flex flex-col items-start gap-[2.5vw]">
                    {/* Mondwest Bold 64px ls4.48 lh64 → text 5vw, ls 0.35vw, leading-1 */}
                    <h1 className={`${T.hero} text-sh-cream leading-[1] font-bold`}>
                      Mexican flavours, refined
                    </h1>
                    {/* Desktop/Subtitle (NeueBit 22, ls 20%) */}
                    <p className={`w-full ${T.subtitle} text-sh-cream leading-[1.2] font-bold`}>
                      A vibrant blend of tradition and modern edge, where bold personalities gather.
                      Chef Gerardo brings Mexico&apos;s street flavours to Toronto. Elevated, authentic,
                      and made to keep you coming back.
                    </p>
                    {/* SecondaryButton 216×48 r4 → 16.875vw × 3.75vw */}
                    <OutlineButton onClick={() => setShowWidget(true)} size="w-[16.875vw] h-[3.75vw] font-bold">
                      Book Your Experience
                    </OutlineButton>
                  </div>
                </Reveal>
              </Parallax>
            </div>

            {/* Mobile — Figma mobile frame: Layer_1 sun graphic 633×776 @(-153,-194) bleeding off the
              top-left (scaled with vw so it bleeds proportionally), then Frame 1427 @(40,528) w321:
              heading Mobile/Hero (Monoglyphic Bold 40 UPPERCASE ls5, left-aligned, wraps to 3 lines),
              paragraph (NeueBit 18 ls10), SecondaryButton 216×48. (Was a small centered image +
              40px mixed-case heading.) */}
            <div className="md:hidden relative w-full overflow-hidden pb-16">
              {/* sun graphic — 633/393=161vw wide, left -153/393=-39vw, top -194/393=-49.4vw */}
              <img src="/redesign/home-hero.png" alt="" className="pointer-events-none absolute left-[-39vw] top-[-49.4vw] w-[161vw] max-w-none select-none" draggable="false" />
              {/* spacer pushes the copy to .fig y528 (=134vw), scaling with the graphic */}
              <div aria-hidden className="h-[134vw]" />
              <Reveal className="relative w-full max-w-[321px] mx-auto flex flex-col items-start">
                <h1 className="font-display font-bold uppercase text-sh-cream text-[40px] leading-[1] tracking-[0.05em] font-bold">
                  Mexican flavours, refined
                </h1>
                {/* NeueBit REGULAR (not bold), ls12.5%. mt-5 sits it closer to the heading (was a
                  32px gap); leading-1.3 for the reference's slightly looser line spacing. */}
                <p className="mt-2 font-body text-sh-cream text-[18px] leading-[1.3] tracking-[0.125em] font-bold">
                  A vibrant blend of tradition and modern edge, where bold personalities gather.
                  Chef Gerardo brings Mexico&apos;s street flavours to Toronto. Elevated, authentic,
                  and made to keep you coming back.
                </p>
                <button onClick={() => setShowWidget(true)} className="mt-8 inline-flex items-center justify-center rounded-[4px] border border-sh-cream font-body uppercase text-sh-cream text-[16px] tracking-[0.1em] w-[216px] h-[48px] hover:bg-sh-cream hover:text-sh-black transition-colors font-bold">
                  Book Your Experience
                </button>
              </Reveal>
            </div>
          </section>

          {/* ═══════════════════ 2. MENÚ EXCEPCIONAL ═══════════════════
            Frame 1436 @(167,957) 946w centered, gap32. Heading Mondwest Bold 28px
            cream centered; subtitle NeueBit Bold 22px cream centered; 3-photo grid
            (cards 269/366/269, r4) + "PRODUCT NAME" caption; 8 dots (4th pink);
            "Explore the Menu" button 184×48 centered. */}
          <section className="relative w-full">
            {/* Desktop exact composition (vw). Section width 946 @x167 → centered 73.91vw. */}
            <div className="hidden md:flex w-[73.91vw] mx-auto flex-col items-center gap-[2.5vw]">
              <Reveal className="flex flex-col items-center gap-[2.1vw] w-full">
                {/* Desktop/Body (NeueBit 22, ls 10%) */}
              </Reveal>

              {/* Frame 1435: grid + dots, gap28 = 2.19vw */}
              <div className="flex flex-col items-start gap-[2.19vw] w-full">
                {/* Frame 1434: row of 3 cards, gap21 = 1.64vw, items centered */}
                <div className="flex flex-row items-start justify-center gap-[1.64vw] w-full">
                  <MenuCarousel/>
                </div>
                {/* Frame 1417: 8 dots @8×8 (0.625vw), gap8 (0.625vw); 4th = pink, rest grey */}

              </div>

            </div>

            {/* Mobile — Figma Frame 1414, LEFT-aligned (all children at x0, like the rest of the
              page). Heading Mobile/H2 (Monoglyphic BOLD 24 UPPER ls5); paragraph hero-style
              (NeueBit 18 ls12.5); 2-up 151px card carousel with "PRODUCT NAME" (16px, 2 lines);
              8 dots LEFT (4th pink); 127px "View Menu" button LEFT. Gaps from .fig: 32/32/20/32. */}
            <div className="md:hidden w-full max-w-[321px] mx-auto py-2 flex flex-col items-start text-left">
              {/* 2-up 151px square cards, swipeable (scroll-snap) */}
              <div className="mt-8 w-full flex gap-5 overflow-x-auto snap-x snap-mandatory pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <MenuCarousel/>
              </div>
              {/* Frame 1417: 8 dots LEFT-aligned (8px, 16px pitch), 4th pink */}
            </div>
          </section>

          {/* Figma gap: Menú section → Private Dining (≈95px @1280) — keeps absolute Y in step */}
          <div aria-hidden className="hidden md:block w-full h-[7.42vw]" />

          {/* ════════════════ 3. PRIVATE DINING & EVENTS ════════════════
            Group 23 @(0,1703) 1281×572. Big photo fig-f6a34934 @(393,1703) 741×572
            on the RIGHT; gradient overlays (Rect 184 top-fade / 185 bottom / left
            black→transparent). Text block left @(162,1822): small photo
            fig-silenth (366×294, gap60), heading "Private dining & events" Mondwest
            Bold 28px cream + paragraph NeueBit Bold 22px cream + button 164×48. */}
          <section className="relative w-full overflow-hidden">
            {/* Desktop: 1281×572 @top → h 44.69vw */}
            <div className="relative hidden md:block w-full h-[44.69vw]">
              {/* Tone curve (SVG gamma) instead of a flat brightness: brightness-0.42 crushed the
                bar LIGHTS along with the darks (measured max 0.35 vs figma's 0.70). Figma puts NO
                brightness on the image — darkness is only the MULTIPLY edge gradients. A gamma≈2
                curve crushes mids/shadows but PRESERVES highlights (0.85^2≈0.72), so the lights
                blaze like the reference while the muted regions stay dark. Verified vs the export
                luminance histogram (figtools _pdcap). */}
              {/* Big photo @(393,1703) 741×572 → left 30.7vw, w 57.89vw, full section height */}
              <Parallax speed={-0.08} className="absolute left-[30.7vw] top-0 h-full w-[57.89vw] overflow-hidden">
                {/* scale-[1.28] = the .fig image-fill CROP zoom; gamma curve via #pdTone; saturate for vibrance. */}
                <img src="/redesign/fig-f6a34934-3a10-4a12-9605-968d11fd.png" alt="Private dining at Silent H" className="h-full w-full object-cover scale-[1.28]" style={{ filter: "url(#pdTone) saturate(0.8) brightness(0.82)" }} />
              </Parallax>
              {/* Rect184 (top 242px=18.91vw) + Rect185 (bottom 316px=24.69vw) fade to PURE black,
                + a left scrim over the text (kept for legibility). */}
              <div className="absolute inset-x-0 top-0 h-[18.91vw] bg-gradient-to-b from-black to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-[24.69vw] bg-gradient-to-t from-black to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

              {/* Frame 1589 @(162,1822) 565×269, gap60 = 4.69vw: small photo + text col */}
              <Reveal className="absolute left-[12.66vw] top-[9.30vw] w-[44.14vw] flex flex-row items-start gap-[4.69vw]">
                {/* Frame 1428: text col, gap32 = 2.5vw, width 565 → constrained */}
                <div className="flex flex-col items-start gap-[2.5vw]">
                  {/* Heading — Monoglyphic Bold (Desktop/H1), UPPERCASE. (My "Mondwest" read was a
                    low-res misjudge; the design system + ground truth say Monoglyphic.) */}
                  <h2 className={`${T.h1} uppercase text-sh-cream leading-[1.1]`}>
                    Private dining &amp; events
                  </h2>
                  {/* Paragraph — NeueBit REGULAR 22px (Desktop/Body), ls 10% */}
                  <p className={`${T.body} text-sh-cream leading-[1.25]`}>
                    Plan your celebración auténtica in our vibrant space. Book your holiday event before
                    October 31st and receive a $100 gift card. Terms apply.
                  </p>
                  {/* SecondaryButton 164×48 → 12.81vw × 3.75vw */}
                  <OutlineButton to="/events" size="w-[12.81vw] h-[3.75vw] font-bold">
                    Start planning
                  </OutlineButton>
                </div>
              </Reveal>
            </div>

            {/* Mobile — exact from Figma mobile frame (Home 6107:1011):
                Group 26 banner: full-bleed photo 393×283 + top fade (Rect184) + bottom fade (Rect185)
                Frame 1414 text @x36 w321: heading Mobile/H2 24 UPPER + body Mobile/Body 18 + button 164×48.
              The banner photo uses the .fig image-fill CROP reproduced EXACTLY in CSS (not "cover"):
                fill transform m00=.669 m02=.191 m11=.775 m12=.120 →
                bg-size 100/m00 % × 100/m11 %  ·  bg-pos m02/(1-m00) % × m12/(1-m11) %
                = 149.5% 129.0% @ 57.7% 53.3%. This zooms into the bright bar (matching the
                reference) instead of showing the dark side-walls a "cover" fit exposes. */}
            <div className="md:hidden w-full flex flex-col pb-28">
              {/* Bar + copy share ONE column (w-321 / 82% / mx-auto) so their LEFT and RIGHT edges
                line up exactly on every screen width (separate mx-auto containers drifted). */}
              <div className="w-full max-w-[321px] mx-auto flex flex-col">
                {/* Photo banner — aspect 362×280, full width of the shared text column */}
                <div className="relative w-full aspect-[362/280] overflow-hidden">
                  <div
                      role="img"
                      aria-label="Private dining at Silent H"
                      className="absolute inset-0 bg-no-repeat"
                      style={{
                        backgroundImage: "url(/redesign/fig-f6a34934-3a10-4a12-9605-968d11fd.png)",
                        // downscale (149.5→142%) with the visible LEFT edge held fixed by raising
                        // position-x to 64.5% (to keep the left at the same image fraction, position-x
                        // must rise as size shrinks) — pulls the right edge further into the dark wall,
                        // giving more breathing room on the right while the left stays put.
                        backgroundSize: "164% 141.5%",
                        backgroundPosition: "62% 53%",
                        filter: "url(#pdTone) saturate(0.62) brightness(0.82)",
                      }}
                  />
                  {/* Darkening scrim IN FRONT — the desktop photo reads darker than the raw filtered
                  image because it carries front overlays (a left black/70 scrim + heavy fades).
                  Mobile text sits BELOW, so a gentle uniform scrim matches the reference's mood
                  (measured: ref luma 16 vs un-scrimmed 19 → ~15% knock-down). */}
                  <div className="absolute inset-0 bg-black/15" />
                  {/* Rect184 top fade + Rect185 bottom fade (→ pure black, like desktop) */}
                  <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-black to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-[24%] bg-gradient-to-t from-black to-transparent" />
                </div>
                {/* Frame 1414 text — 46px below the banner; button .fig 164×48, left-aligned */}
                <Reveal className="mt-[46px] flex flex-col items-start gap-6">
                  <h2 className={`${M.h2} uppercase text-sh-cream leading-[1.2]`}>
                    Private dining &amp; events
                  </h2>
                  {/* break at sentence boundaries (matches the reference) instead of wrapping mid-phrase */}
                  {/* ls 14% breaks line 1 after "our" (stable 12.5–15%); leading-1.4 for the looser
                  vertical rhythm the reference has on this block. */}
                  <p className="font-body text-[18px] tracking-[0.14em] text-sh-cream leading-[1.4]">
                    Plan your celebración auténtica in our vibrant space.<br />
                    Book your holiday event before October<br />31st and receive a $100 gift card.<br />
                    Terms apply.
                  </p>
                  <Link to="/events" className="inline-flex items-center justify-center rounded-[4px] border border-sh-cream font-body uppercase text-sh-cream text-[16px] tracking-[0.1em] w-[164px] h-[48px] hover:bg-sh-cream hover:text-sh-black transition-colors">
                    Start planning
                  </Link>
                </Reveal>
              </div>
            </div>
          </section>

          {/* Figma gap: Private Dining → De Monterrey (≈70px @1280) */}
          <div aria-hidden className="hidden md:block w-full h-[5.47vw] bg-sh-black" />

          {/* ═══════════════ 4. DE MONTERREY PARA EL MUNDO ═══════════════
            Mountain bg fig-beautiful-kathmandu @(-1,2764) 1283×490 + pink→black
            gradient (Rect 174 @2341, Rect 176 @3063). LEFT: curved gold "DE MONTERREY"
            over map @(167,2486) + "PARA EL MUNDO" Mondwest Bold 64px GOLD centered
            @(69,3174). RIGHT @(650,2722): quote line1 Mondwest Bold 22px + line2
            Monoglyphic Regular 22px (both cream) + "Chef Gerardo Alvarez" NeueBit
            Bold 22px cream + outlined SecondaryButton 306×51. */}
          {/* NO opaque section bg — the global DUST (Spline sparks, fixed z-0 behind the page)
            must show through the De Monterrey sky like the figma reference ("sparks above the
            mountains"). Darkness comes from the black body behind the transparent dust; the
            mountain photo (opaque, lower band) ends the sparks. */}
          <section className="relative w-full overflow-hidden">
            {/* Section spans Figma y2341..3434 (Rect174 top → Blog start) = 1093px → 85.39vw. */}
            <div className="relative hidden md:block w-full h-[85.39vw]">
              {/* very faint twilight wash — keeps a purple tone WITHOUT hiding the dust sparks */}
              <div className="absolute inset-0 bg-[#0b0712]/20" />
              {/* Rectangle 174 #eb4660→transparent — VERTICAL linear gradient, drawn BEHIND the
                mountain so the ridge reads as a silhouette against it. Peak ~#923542 at the
                mountain's top edge (~46% of the section). 2D-sampled from ground truth. */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_8%,#330d15_30%,#7a2230_42%,#8d2d3b_46%,#300d17_50%,transparent_56%)]" />
              {/* Kathmandu mountains @(-1,2764) 1283×490 → top 33.05vw. WEBP keeps the ALPHA: the
                transparent sky ABOVE the jagged ridge lets the glow + dust sparks show through,
                so the ridge reads as a silhouette and the city lights sit below it. (The old .jpg
                lost the alpha → the sky went opaque black and the mountain "disappeared".) */}
              <div className="absolute left-[-0.08vw] top-[33.05vw] w-[100.23vw] h-[38.28vw]">
                <img src="/redesign/monterrey-mountain.webp" alt="Mountains of Monterrey, México" className="w-full h-full object-cover object-top brightness-[0.72]" />
                {/* Smooth dark zone UNDER the ridge so the mountain (dark) fades into the city (dark)
                  as the SAME black — no hard seam — and the city lights only read at the bottom. */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_6%,#0b0712_26%,#0b0712_50%,transparent_78%)]" />
              </div>
              {/* Rectangle 176 @(0,3063): soft bottom seal over the city's lower edge */}
              <div className="absolute inset-x-0 top-[56.41vw] h-[16.17vw] bg-gradient-to-b from-transparent to-black/85" />
              {/* solid black floor below the mountain to the blog */}
              <div className="absolute inset-x-0 top-[71.33vw] bottom-0 bg-sh-black" />

              {/* ── Arch @(167,2486) 365×639. Map VIDEO (Monterrey 1) clipped to the arch,
                + Vector 2 gold 20px OUTSIDE frame + Vector 1 black 4px OUTSIDE edge,
                + DE MONTERREY arced over the top. SVG units = design px (1u = 0.078125vw)
                so geometry is exact; overflow-visible lets the outside strokes + text show. */}
              <Parallax speed={-0.05} className="absolute left-[13.05vw] top-[11.33vw] w-[28.52vw]">
                <svg viewBox="0 0 365 639" className="w-full h-auto" style={{ overflow: "visible", filter: "drop-shadow(0 1vw 2vw rgba(0,0,0,0.55))" }}>
                  <defs>
                    <clipPath id="dmArch"><path d={DM_ARCH} /></clipPath>
                    {/* DE MONTERREY arc: tighter radius = more curve (figma curves more) */}
                    <path id="dmTextArc" d="M -14 46 A 315 315 0 0 1 379 46" />
                  </defs>
                  {/* Cream parchment matte (Vector 2 fill) */}
                  <path d={DM_ARCH} fill="#ece1d4" />
                  {/* Vector 2 gold frame = DASHED TEETH ONLY — figma has NO continuous rim, just the
                    spikes. Drawn 40 wide so 20px of teeth show outside after the map covers the
                    inner half. (Removed the solid-band+comb that I wrongly added a rim with.) */}
                  <path d={DM_ARCH} fill="none" stroke="#dfa867" strokeWidth="34" strokeDasharray="1.8 3" strokeLinejoin="miter" />
                  {/* Map VIDEO clipped to the arch. VINTAGE = darker + warmer but COLOUR INTACT
                    (figma is muted-but-saturated, not a faded sepia wash). */}
                  <foreignObject x="0" y="0" width="365" height="639" clipPath="url(#dmArch)">
                    <div className="relative w-full h-full">
                      <video src="/redesign/monterrey-map.mp4" poster="/redesign/monterrey-map-poster.jpg" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" style={{ filter: "saturate(1.2) brightness(0.98) contrast(1.03)" }} />
                      {/* WARM-BEIGE multiply = aged "treasure map" paper. Multiply turns the white
                        paper into beige (white×tan=tan) while keeping the illustration colour. */}
                      <div className="absolute inset-0 bg-[#d6b274] mix-blend-multiply opacity-60" />
                    </div>
                  </foreignObject>
                  {/* Vector 1 thin black edge on the arch outline (drawn over the map edge) */}
                  <path d={DM_ARCH} fill="none" stroke="#0a0608" strokeWidth="3" strokeLinejoin="miter" />
                  {/* DE MONTERREY — Monoglyphic, gold #dfa867, ls 7%, centered. Lighter weight +
                    slightly smaller than before (figma is thinner) and a tighter arc (more curve). */}
                  <text fill="#dfa867" className="font-display" fontSize="37" fontWeight="500" letterSpacing="2.6">
                    <textPath href="#dmTextArc" startOffset="50%" textAnchor="middle">DE MONTERREY</textPath>
                  </text>
                </svg>
              </Parallax>

              {/* PARA EL MUNDO @(69,3174) 560×28 — Monoglyphic Bold 64 gold, centered, ls 7% */}
              <p className={`absolute left-[5.39vw] top-[65.08vw] w-[43.75vw] text-center ${T.h1} text-sh-gold leading-[1] whitespace-nowrap`}>
                PARA EL MUNDO
              </p>

              {/* Frame 1649 quote — every element ABSOLUTE at its EXACT figma Y (no flex-gap
                approximation): L1 @2722, L2 @2796, Chef @2883, Button @2926 (rel section 2341). */}
              <Reveal className="absolute left-[50.78vw] top-[29.77vw] w-[36.17vw]">
                {/* Line 1 — Monoglyphic Regular, the STYLE value Desktop/H2 = 28px (I was wrongly
                  using the node's stale 22px). ls 7% of 28 = 0.153vw. */}
                {/* Line 1 — Monoglyphic Regular, EXACT figma STYLE values (verified in-browser):
                  28px (2.1875vw), letterSpacing 2% (0.044vw), lineHeight 1.2. At 2% ls
                  "I believe the best ingredient" = 438px, fits 463px → explicit break holds. */}
                <p className={`${T.h2} text-sh-cream leading-[1.2]`}>
                  &ldquo;I believe the best ingredient<br />is nostalgia,
                </p>
                {/* Line 2 — NeueBit REGULAR 22 / ls 20% / lh 1.0. (Style/bake say Bold but the
                  live file is Regular — the .fig is a STALE export from when it was Bold; proof:
                  baked line width 400.8px ≈ Bold 398.8, not Regular 387.) Explicit breaks at the
                  reference's points: "México" is a knife-edge wrap (466px vs 463 box) that natural
                  wrap flip-flops per viewport, so force it after "to" to match Figma at all widths. */}
                <p className={`absolute top-[5.78vw] w-full ${T.subtitle} text-sh-cream leading-[1] font-bold`}>
                  which is reflected in every dish on this<br />menu. It is a tribute to my family, to<br />México and to my culture.&rdquo;
                </p>
                {/* Chef — NeueBit Regular @ y2883, 22px (1.72vw), ls 10%. DIMMED to ~0.6 opacity:
                  figma renders the chef attribution at ~0.57× the quote's brightness (muted), so
                  full-cream made it stand out too much, but 0.36 was too muted — ~0.6 (chef reads
                  ~0.6x the quote's brightness). */}
                <p className={`absolute top-[12.57vw] ${T.body} text-sh-cream leading-[1.2] opacity-60`}>
                  Chef Gerardo Alvarez
                </p>
                {/* SecondaryButton @ y2926 (top 15.94vw), 306×51 → 23.91vw × 3.98vw */}
                <Link
                    to="/story"
                    className="absolute top-[15.94vw] inline-flex items-center justify-center rounded-[4px] border border-sh-cream/70 font-body font-bold uppercase text-sh-cream text-[round(1.71875vw,1px)] tracking-[0.2em] w-[23.91vw] h-[3.98vw] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-sh-pink"
                >
                  A taste of our story
                </Link>
              </Reveal>
            </div>

            {/* Mobile — exact from Figma mobile frame (Home 6107:1011):
                Group 28 arch tombstone (map + gold dashed frame + curved DE MONTERREY), centered.
                Group 27 mountain/city BAND placed 192px below the arch top, overlapping its lower
                  half — three plain layers (NOT the old over-dark gradient stack that hid them):
                    Rect174  pink #eb4660 → transparent           (sky,  393×198 @ band-y0)
                    photo    beautiful-kathmandu (vert-crop .778)  (393×150 @ band-y130)
                    Rect176  rgba(0,0,0,.3) → black                (seal, 394×63  @ band-y222)
                PARA EL MUNDO over the seal; Frame 1649 quote below.
              Positions are absolute at the .fig mobile Y (arch-top = 0), mirroring the desktop. */}
            {/* pt-14 gives the curved "DE MONTERREY" headroom — its arc bulges ~13px above the
              SVG box (overflow-visible), so with the section's overflow-hidden it would clip
              against the top edge (the "black box" artifact) without padding above it. */}
            <div className="md:hidden relative w-full overflow-hidden pt-14 pb-16 flex flex-col items-center">
              {/* Arch + band region — h = arch-top→quote-top = 494px (.fig 2184→2678) */}
              <div className="relative w-full h-[494px]">
                {/* Group 27 mountain/city band — full-bleed, behind the arch (z-0). Figma geometry
                  (band 285 tall: Rect174 sky 0–198, mountain photo 130–280, seal 222–285) with
                  VISIBLE colours sampled from the reference: rose-twilight sky peaking ~#8d2d3b
                  (rgb 128,38,52) and the night-cityscape webp (ridge silhouette + warm city
                  lights) shown at near-full brightness — its transparent sky lets the rose
                  through above the ridge. (My prior band buried both → invisible.) */}
                <div aria-hidden className="absolute inset-x-0 top-[150px] h-[345px] overflow-hidden">
                  <div className="absolute inset-0 bg-[#0b0712]/25" />
                  {/* rose/purple twilight sky — its BRIGHT peak (#8d2d3b) sits AT the ridge line so the
                    dark mountains silhouette against it (before, the rose's dark tail was behind the
                    ridge → dark-on-dark → no visible mountain). */}
                  <div className="absolute inset-x-0 top-[40px] h-[185px] bg-[linear-gradient(to_bottom,transparent_0%,#4a1a30_28%,#8d2d3b_54%,#5a1c28_76%,transparent_100%)]" />
                  {/* night cityscape — object-TOP keeps the mountain ridge (it's at the photo's top;
                    object-center had cropped it off); transparent sky lets the rose show above the
                    ridge, the warm city lights read below. */}
                  <img
                      src="/redesign/monterrey-mountain.webp"
                      alt="Mountains and city of Monterrey, México"
                      className="absolute inset-x-0 top-[135px] h-[150px] w-full object-cover object-top"
                      style={{ filter: "contrast(1.3) brightness(0.4)" }}
                  />
                  {/* base seal to black — small, so the warm city lights at the photo's bottom still
                    read (a 70px seal had faded them out → city looked thin/over-darkened) */}
                  <div className="absolute inset-x-0 bottom-0 h-[32px] bg-gradient-to-b from-transparent to-black" />
                </div>

                {/* Arch tombstone (same DM_ARCH construction as desktop), centered, on top.
                  NO drop-shadow filter here: a CSS filter on an overflow-visible SVG clips the
                  teeth that extend OUTSIDE the box on iOS Safari → only one corner survived. The
                  dash is also coarsened ("4 3.5" vs desktop "1.8 3") because at 210px the desktop
                  pattern shrinks to ~1px teeth that devices drop; coarser teeth render reliably. */}
                <div className="absolute left-1/2 top-0 z-10 w-[210px] -translate-x-1/2">
                  <svg viewBox="0 0 365 639" className="w-full h-auto" style={{ overflow: "visible" }}>
                    <defs>
                      <clipPath id="dmArchM"><path d={DM_ARCH} /></clipPath>
                      <path id="dmTextArcM" d="M -14 32 A 315 315 0 0 1 379 32" />
                    </defs>
                    <path d={DM_ARCH} fill="#ece1d4" />
                    <path d={DM_ARCH} fill="none" stroke="#dfa867" strokeWidth="34" strokeDasharray="4 3.5" strokeLinejoin="miter" />
                    <foreignObject x="0" y="0" width="365" height="639" clipPath="url(#dmArchM)">
                      <div className="relative w-full h-full">
                        <video src="/redesign/monterrey-map.mp4" poster="/redesign/monterrey-map-poster.jpg" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" style={{ filter: "saturate(1.2) brightness(0.98) contrast(1.03)" }} />
                        <div className="absolute inset-0 bg-[#d6b274] mix-blend-multiply opacity-60" />
                      </div>
                    </foreignObject>
                    <path d={DM_ARCH} fill="none" stroke="#0a0608" strokeWidth="3" strokeLinejoin="miter" />
                    {/* bottom-corner squares = the miter outer block (strokeWidth/2 = 17u) at the
                      OUTER corner. The dash only lands one at the bottom-right; pin BOTH at the same
                      size/spot so they're symmetric (the BR one just overlaps its existing miter). */}
                    <rect x="-17" y="639" width="17" height="17" fill="#dfa867" />
                    <rect x="365" y="639" width="17" height="17" fill="#dfa867" />
                    <text fill="#dfa867" className="font-display" fontSize="37" fontWeight="700" letterSpacing="3.4">
                      <textPath href="#dmTextArcM" startOffset="50%" textAnchor="middle">DE MONTERREY</textPath>
                    </text>
                  </svg>
                </div>

                {/* PARA EL MUNDO — Monoglyphic Bold ~22, gold, centered; hugs the tombstone base */}
                <p className="absolute inset-x-0 top-[388px] z-10 text-center font-display font-bold text-sh-gold text-[22px] leading-[1] tracking-[0.1em]">
                  PARA EL MUNDO
                </p>
              </div>

              {/* Frame 1649 quote — centered column, w320; line2 = Mobile/Subtitle (NeueBit BOLD 26) */}
              <blockquote className="relative z-10 mx-auto w-full max-w-[321px] text-center">
                {/* Line 1 — ALL CAPS in the reference */}
                <span className={`block ${M.h2} uppercase text-sh-cream leading-[1.2]`}>
                &ldquo;I believe the best ingredient is nostalgia,
              </span>
                {/* Line 2 — NeueBit REGULAR 26 (the Mobile/Subtitle style is Bold, but NeueBit-Bold
                  falls back to Regular in the real render; user confirms L2 is NOT bold, L1 IS). */}
                <span className="block font-body text-[26px] tracking-[0.2em] text-sh-cream leading-[1] mt-3">
                which is reflected in every dish on this menu. It is a tribute to my family, to México
                and to my culture.&rdquo;
              </span>
              </blockquote>
              <p className={`relative z-10 mt-5 ${M.body} text-sh-cream`}>Chef Gerardo Alvarez</p>
              <Link to="/story" className="relative z-10 mt-5 inline-flex items-center justify-center rounded-[4px] border border-sh-cream font-body uppercase text-sh-cream text-[18px] tracking-[0.1em] w-[306px] max-w-[88vw] h-[51px] hover:bg-sh-cream hover:text-sh-black transition-colors">
                A taste of our story
              </Link>
            </div>
          </section>

          {/* ═══════════════ 5. A BLOG FULL OF EXPERIENCES ═══════════════
            Frame 1436 @(70,3434) 1140w centered, gap32. Heading "A blog full of
            experiences" Mondwest Bold 40px cream centered; subtitle NeueBit Regular
            22px cream centered; 4 cards 270w gap20 bottom-aligned: fig photo 270×180
            r4 + Mondwest Bold 22px title + small outlined "Read more" pill;
            "View all stories" NeueBit Regular 22px PINK left-aligned. */}
          <section className="relative w-full">
            {/* Desktop: Frame 1436 1140w @x70 → centered 89.06vw, gap32 = 2.5vw */}
            <div className="hidden md:flex w-[89.06vw] mx-auto flex-col items-center gap-[2.5vw]">
              <Reveal className="flex flex-col items-center gap-[2.5vw] w-full">
                {/* Mondwest Bold 40px ls2.8 lh40 → 3.125vw / 0.219vw */}
                <h2 className={`${T.h1} uppercase text-sh-cream text-center leading-[1]`}>
                  A blog full of experiences
                </h2>
                {/* Desktop/Body (NeueBit 22, ls 10%) */}
                <p className={`${T.body} text-sh-cream text-center leading-[1.2]`}>
                  A closer look at the flavours, culture, and experiences behind Silent H.
                </p>
              </Reveal>

              {/* Frame 1648: 4 cards row, gap20 = 1.56vw, bottom-aligned (C:MAX). */}
              <div className="flex flex-row items-end justify-start gap-[1.56vw] w-full">
                {BLOG_CARDS.map((card, i) => (
                    <Reveal key={i} delay={i * 0.08} className="w-[21.09vw] flex flex-col gap-[1.56vw]">
                      {/* photo 270×180 r4 → h 14.06vw */}
                      <a href={card.href} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-[4px] h-[14.06vw]">
                        <img src={card.img} alt={card.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </a>
                      {/* Frame 1499: title (Monoglyphic Reg 22) + byline + category tag */}
                      <div className="flex flex-col items-start gap-[1vw]">
                        <h3 className={`${T.h3} text-sh-cream leading-[1.2]`}>
                          {card.title}
                        </h3>
                        <div className="flex flex-col items-start gap-[0.2vw]">
                          {/* Desktop/Subtitle (NeueBit 22, ls 20%), grey */}
                          <p className={`${T.subtitle} text-[#bfb7af]`}>Silent H team</p>
                          {/* Caption 2 (NeueBit 14, ls 20%), grey */}
                          <p className={`${T.caption2} text-[#bfb7af]`}>5 days ago</p>
                        </div>
                        {/* category tag pill — Caption 2 (NeueBit 14, ls 20%) UPPER, grey outline */}
                        <span className={`inline-flex items-center justify-center rounded-[4px] border border-[#4a4a4a] ${T.caption2} uppercase text-[#9a9a9a] px-[0.9vw] h-[1.9vw]`}>
                      {card.category}
                    </span>
                      </div>
                    </Reveal>
                ))}
              </div>

              {/* "View all stories" NeueBit Bold 22px PINK UPPER, align LEFT → 1.72vw */}
              <Link
                  to="/story"
                  className={`self-start ${T.button} uppercase text-sh-pink transition-opacity hover:opacity-80`}
              >
                View all stories
              </Link>
            </div>

            {/* Mobile: Figma mobile Frame 1436 — H1 32 UPPER + body 18; cards w/ title (Mobile/H3
              18 Mono), author (Mobile/Subtitle 26), date + category (Caption 2 14). */}
            <div className="md:hidden w-full max-w-[321px] mx-auto py-12 flex flex-col items-center gap-6">
              <h2 className="font-display font-bold uppercase text-sh-cream text-center leading-[1.05] text-[32px] tracking-[0.05em]">
                A blog full of experiences
              </h2>
              <p className="font-body text-sh-cream text-center text-[18px] leading-[1.3] tracking-[0.1em]">
                A closer look at the flavours, culture, and experiences behind Silent H.
              </p>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8">
                {BLOG_CARDS.map((card, i) => (
                    <a key={i} href={card.href} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-3 text-left">
                      <div className="overflow-hidden rounded-[4px] aspect-[3/2]">
                        <img src={card.img} alt={card.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <h3 className="font-display text-sh-cream text-[18px] leading-[1.2] tracking-[0.05em]">{card.title}</h3>
                      <p className="font-body text-[#bfb7af] text-[26px] tracking-[0.2em] leading-[1]">Silent H team</p>
                      <p className="font-body text-[#bfb7af] text-[14px] tracking-[0.2em] -mt-1">5 days ago</p>
                      <span className="inline-flex w-fit items-center justify-center rounded-[4px] border border-[#4a4a4a] font-body uppercase text-[#9a9a9a] text-[14px] tracking-[0.2em] px-3 py-1">{card.category}</span>
                    </a>
                ))}
              </div>
              <Link to="/story" className="self-start font-body uppercase text-sh-pink text-[16px] tracking-[0.1em]">
                View all stories
              </Link>
            </div>
          </section>

          {/* Figma gap: Blog → Footer (≈162px @1280) so the footer lands at design Y4092 */}
          <div aria-hidden className="hidden md:block w-full h-[12.66vw]" />
        </main>
      </>
  );
}

// Blog cards — Frame 1648. Photos extracted by their real fill hashes from the .fig (the layer
// names "marijuana/woman/herbal" are stale — the actual images are cactus / cocktail / skulls /
// cooking). Each card: title (Monoglyphic Reg), "Silent H team", "5 days ago", category tag.
const BLOG_CARDS = [
  { img: "/redesign/fig-blog-1.jpg", title: "The best for you to try at home", category: "Ingredients", href: "https://www.instagram.com/silenth.to/" },
  { img: "/redesign/fig-blog-2.jpg", title: "It’s drinks o’clock in Mexico", category: "Drinks", href: "https://www.instagram.com/silenth.to/" },
  { img: "/redesign/fig-blog-3.jpg", title: "Culture and food in one dish", category: "Culture", href: "https://www.instagram.com/silenth.to/" },
  { img: "/redesign/fig-blog-4.jpg", title: "The best for you to try at home", category: "Ingredients", href: "https://www.instagram.com/silenth.to/" },
];
