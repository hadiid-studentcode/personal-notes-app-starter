import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import NoteItem from "../../components/noteItem";
import { showFormattedDate } from "../../utils";
import LocaleContext from "../../contexts/localeContext";
import { notesServiceNetwork } from "../../services/notesNetwork.service";

export default function HomePage() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectLanguage } = useContext(LocaleContext);

  useEffect(() => {
    notesServiceNetwork.getActiveNotes().then((response) => {
      setNotes(response.data);
      setLoading(false);
    });
  }, []);

  const addNote = () => {
    navigate("/notes/new");
  };

  const handleSearch = (keyword) => {
    setSearchParams({ keyword });

    if (keyword === "") {
      notesServiceNetwork.getActiveNotes().then((response) => {
        setNotes(response.data);
        return;
      });
    }

    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setNotes(filteredNotes);
  };

  if (loading) {
    return (
      <p>{selectLanguage({ id: "Memuat Catatan...", en: "Loading..." })}</p>
    );
  }
  return (
    <>
      <section className="hompage">
        <h2>
          {selectLanguage({
            id: "Catatan Aktif",
            en: "Active Notes",
          })}
        </h2>
      </section>
      <section className="search-bar">
        <input
          type="text"
          placeholder={selectLanguage({
            id: "Cari catatan berdasarkan judul...",
            en: "Search notes by title...",
          })}
          name="keyword"
          id="keyword"
          onChange={(e) => handleSearch(e.target.value)}
        ></input>
      </section>
      <section className="notes-list">
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteItem
              key={note.id}
              id={note.id}
              title={note.title}
              createdAt={showFormattedDate(note.createdAt)}
              body={note.body}
            />
          ))
        ) : (
          <p>
            {selectLanguage({ id: "Tidak ada catatan ...", en: "No notes" })}
          </p>
        )}
      </section>
      <div className="homepage__action">
        <button
          className="action"
          type="button"
          title="Tambah"
          onClick={addNote}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
          </svg>
        </button>
      </div>
    </>
  );
}
