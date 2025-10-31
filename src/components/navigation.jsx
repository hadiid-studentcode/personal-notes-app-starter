import { useContext } from "react";
import ThemeContext from "../contexts/themeContext";
import LocaleContext from "../contexts/localeContext";
import { FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import { SiGoogletranslate } from "react-icons/si";
import { Link } from "react-router-dom";

export default function Navigation({ logout, name }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { toggleLocale, selectLanguage } = useContext(LocaleContext);

  return (
    <>
      <h1>
        {" "}
        <Link to="/">
          {selectLanguage({ id: "Aplikasi Catatan", en: "Notes App" })}
        </Link>
      </h1>
      {logout !== undefined && (
        <nav className="navigation">
          <ul>
            <li>
              <Link to="/archives">
                {selectLanguage({ id: "Terarsip", en: "Archived" })}
              </Link>
            </li>
          </ul>
        </nav>
      )}

      {/* Toggle theme button */}
      <button className="toggle-locale" onClick={toggleLocale}>
        <SiGoogletranslate />
      </button>
      <button className="toggle-theme" onClick={toggleTheme}>
        {theme === "light" ? <FiMoon /> : <FiSun />}
      </button>
      {logout !== undefined && (
        <button className="button-logout" onClick={logout} title="Logout">
          <FiLogOut /> {name}
        </button>
      )}
    </>
  );
}
