import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/page";
import NewNotePage from "./pages/notes/new/page";
import NoteDetailPage from "./pages/notes/id/page";
import ArchivesPage from "./pages/archives/page";
import NotFoundPage from "./pages/404/page";
import LoginPage from "./pages/auth/login/page";
import RegisterPage from "./pages/auth/register/page";

function App() {
  return (
    <>
      <div className="app-container" data-theme="light">
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
        </header>

        <main>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/notes" element={<HomePage />} />
            <Route path="/notes/new" element={<NewNotePage />} />
            <Route path="/notes/:id" element={<NoteDetailPage />} />
            <Route path="/archives" element={<ArchivesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
