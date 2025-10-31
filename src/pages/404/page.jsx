import { useContext } from "react";
import LocaleContext from "../../contexts/localeContext";

export default function NotFoundPage() {
  const { selectLanguage } = useContext(LocaleContext);

  return (
    <>
      <h1>404</h1>
      <p>
        {selectLanguage({
          id: "Halaman tidak ditemukan",
          en: "Page not found",
        })}
      </p>
    </>
  );
}
