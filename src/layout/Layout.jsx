import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DustGate from "../components/DustGate";
import EnterAitchTab from "../components/EnterAitchTab";
import ScrollManager from "./ScrollManager";
import SmoothScroll from "../lib/smoothScroll/SmoothScroll";

// Routes that get the falling-dust overlay (NOT /menu).
const DUST_ROUTES = new Set(["/", "/events", "/story", "/happy-hour"]);

export default function Layout() {
  const { pathname } = useLocation();
  const dustEnabled = DUST_ROUTES.has(pathname);

  return (
    <SmoothScroll>
      <ScrollManager />
      {/* z-0 fixed dust behind everything; page content is z-10 via each page's <main> */}
      <DustGate enabled={dustEnabled} />
      <Navbar />
      {/* Enter-Aitch side tab only on the home page (not menu/events/story/etc.) */}
      {pathname === "/" && <EnterAitchTab />}
      <Outlet />        {/* page changes here; Navbar/Footer/Dust do NOT remount */}
      <Footer />
    </SmoothScroll>
  );
}
