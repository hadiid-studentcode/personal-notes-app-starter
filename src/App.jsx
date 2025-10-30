import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/page";
import NewNotePage from "./pages/notes/new/page";
import NoteDetailPage from "./pages/notes/id/page";
import ArchivesPage from "./pages/archives/page";
import NotFoundPage from "./pages/404/page";
import LoginPage from "./pages/auth/login/page";
import RegisterPage from "./pages/auth/register/page";

function App() {
  // ...existing code...
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  // ...existing code...

  return (
    <>
      <div className="app-container" data-theme={theme}>
        <header>
          <h1>
            {" "}
            <Link to="/notes">Aplikasi Catatan</Link>
          </h1>
          <div className="navigation">
            <ul>
              <li>
                <Link to="/archives">Arsip</Link>
              </li>
            </ul>
          </div>

          {/* Toggle theme button */}
          <button
            className="toggle-theme"
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "light" ? "🌞" : "🌙"}
          </button>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/notes" element={<HomePage />} />
            <Route path="/notes/new" element={<NewNotePage theme={theme} />} />
            <Route
              path="/notes/:id"
              element={<NoteDetailPage theme={theme} />}
            />
            <Route path="/archives" element={<ArchivesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
