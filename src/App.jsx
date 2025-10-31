import { useEffect, useMemo, useState } from "react";
import {Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/page";
import NewNotePage from "./pages/notes/new/page";
import NoteDetailPage from "./pages/notes/id/page";
import ArchivesPage from "./pages/archives/page";
import NotFoundPage from "./pages/404/page";
import LoginPage from "./pages/auth/login/page";
import RegisterPage from "./pages/auth/register/page";
import { ToastContainer } from "react-toastify";
import ThemeContext from "./contexts/themeContext";
import { authService } from "./services/auth.service";
import Navigation from "./components/navigation";
import LocaleContext from "./contexts/localeContext";

function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [locale, setLocale] = useState(localStorage.getItem("locale") || "id");

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === "id" ? "en" : "id";
      localStorage.setItem("locale", newLocale);
      return newLocale;
    });
  };

  const selectLanguage = ({ id, en }) => {
    if (id === undefined || en === undefined) {
      return "language options is empty";
    }
    return locale === "id" ? id : en;
  };

  const localeContextValue = useMemo(() => {
    return {
      locale,
      toggleLocale,
      selectLanguage,
    };
  }, [locale]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const themeContextValue = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    authService.getUserLogged().then(({ data }) => {
      setAuthedUser(data);
      setInitializing(false);
    });
  }, []);

  const onLoginSuccess = async ({ accessToken }) => {
    authService.putAccessToken(accessToken);
    const { data } = await authService.getUserLogged();
    setAuthedUser(data);
  };
  const onLogout = () => {
    setAuthedUser(null);
    authService.putAccessToken("");
  };

  if (initializing) {
    return null;
  }

  if (!authedUser) {
    return (
      <>
        <LocaleContext.Provider value={localeContextValue}>
          <ThemeContext.Provider value={themeContextValue}>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={theme}
            />{" "}
            <div className="app-container">
              <header>
                <Navigation />
              </header>

              <main>
                <Routes>
                  <Route
                    path="/*"
                    element={<LoginPage loginSuccess={onLoginSuccess} />}
                  />
                  <Route
                    path="/register"
                    element={<RegisterPage theme={theme} />}
                  />
                </Routes>
              </main>
            </div>
          </ThemeContext.Provider>
        </LocaleContext.Provider>
      </>
    );
  }
  return (
    <>
      <LocaleContext.Provider value={localeContextValue}>
        <ThemeContext.Provider value={themeContextValue}>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={theme}
          />{" "}
          <div className="app-container">
            <header>
              <Navigation
                logout={onLogout}
                name={authedUser.name}
                toggleTheme={toggleTheme}
              />
            </header>

            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />

                <Route
                  path="/notes/new"
                  element={<NewNotePage theme={theme} />}
                />
                <Route
                  path="/notes/:id"
                  element={<NoteDetailPage theme={theme} />}
                />
                <Route path="/archives" element={<ArchivesPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
        </ThemeContext.Provider>
      </LocaleContext.Provider>
    </>
  );
}

export default App;
