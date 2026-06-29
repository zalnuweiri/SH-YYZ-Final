import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Events from "./pages/Events";
import Story from "./pages/Story";
import HappyHour from "./pages/HappyHour";
import FormTest from "./pages/FormTest";
import ExternalRedirect from "./pages/ExternalRedirect";
import BlogsPage from "./pages/BlogsPage";

const Fifa26 = lazy(() => import("./pages/Fifa26")); // out-of-scope page, lazy

export default function App() {
  return (
    <Routes>
      {/* one layout route → persistent shell (Navbar + Footer + Dust + scroll mgmt) */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="events" element={<Events />} />
        <Route path="story" element={<Story />} />
        <Route path="happy-hour" element={<HappyHour />} /> {/* NEW */}
        <Route
          path="reservations"
          element={<ExternalRedirect to="https://www.opentable.ca/r/silent-h-toronto" />}
        />
        <Route path="form" element={<FormTest />} />
          <Route path="blogs" element={<BlogsPage/>}></Route>
      </Route>



      {/* Out of scope: Fifa26 keeps its own standalone chrome (own Navbar/Footer),
          so it is routed OUTSIDE the dark Layout shell to avoid double chrome. */}
      <Route
        path="fifa26"
        element={
          <Suspense fallback={null}>
            <Fifa26 />
          </Suspense>
        }
      />
    </Routes>
  );
}
