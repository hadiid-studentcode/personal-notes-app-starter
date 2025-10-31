import { useEffect, useState, useMemo, useContext } from "react"; // 1. Impor useMemo
import { showFormattedDate } from "../../utils";
import NoteItem from "../../components/noteItem";
import { useSearchParams } from "react-router-dom";
import { notesServiceNetwork } from "../../services/notesNetwork.service";
import LocaleContext from "../../contexts/localeContext";

export default function ArchivesPage() {
  // 2. State ini untuk menyimpan SEMUA catatan arsip, jangan diubah
  const [allArchivedNotes, setAllArchivedNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectLanguage } = useContext(LocaleContext);

  const initialKeyword = searchParams.get("keyword") || "";
  const [keyword, setKeyword] = useState(initialKeyword);

  useEffect(() => {
    notesServiceNetwork.getArchivedNotes().then((response) => {
      setAllArchivedNotes(response.data);
      setLoading(false);
    });
  }, []);

  const filteredNotes = useMemo(() => {
    return allArchivedNotes.filter((note) =>
      note.title.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [allArchivedNotes, keyword]);

  const handleSearch = (newKeyword) => {
    setKeyword(newKeyword);
    setSearchParams({ keyword: newKeyword });
  };

  if (loading) {
    return (
      <p>
        {selectLanguage({ id: "Memuat Catatan...", en: "Loading notes..." })}
      </p>
    );
  }

  return (
    <>
      <section className="archives-page">
        <h2>Catatan Arsip</h2>
        <section className="search-bar">
          <input
            type="text"
            placeholder={selectLanguage({
              id: "Cari berdasarkan judul ...",
              en: "Search by title ...",
            })}
            name="keyword"
            id="keyword"
            value={keyword}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </section>
        <section className="notes-list">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((archiveNote) => (
              <NoteItem
                key={archiveNote.id}
                id={archiveNote.id}
                title={archiveNote.title}
                createdAt={showFormattedDate(archiveNote.createdAt)}
                body={archiveNote.body}
              />
            ))
          ) : (
            <p>
              {selectLanguage({
                id: "Tidak ada catatan arsip ...",
                en: "No archived notes ...",
              })}
            </p>
          )}
        </section>
      </section>
    </>
  );
}
