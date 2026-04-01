import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AnimeAtlasPage from "./AnimeAtlasPage";
import PlacesPage from "./PlacesPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

export default function App() {
  const [language, setLanguage] = useState(() => {
    return window.localStorage.getItem("site-language") || "en";
  });

  useEffect(() => {
    window.localStorage.setItem("site-language", language);
    document.documentElement.lang = language;
  }, [language]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/anime-atlas"
          element={<AnimeAtlasPage language={language} setLanguage={setLanguage} />}
        />
        <Route
          path="/places"
          element={<PlacesPage language={language} setLanguage={setLanguage} />}
        />
        <Route path="*" element={<Navigate to="/anime-atlas" replace />} />
      </Routes>
    </>
  );
}
