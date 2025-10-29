import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { notesService } from "../../services/notes.service";
import NoteItem from "../../components/noteItem";

export default function HomePage() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const activeNotes = notesService.getActive();
    setNotes(activeNotes);
    setLoading(false);
  }, []);

  const addNote = () => {
    navigate("/notes/new");
  };

  if (loading) {
    return <p>Memuat catatan...</p>;
  }

  return (
    <>
      <section className="homepage">
        <h2>Catatan Aktif</h2>
      </section>
      <section className="search-bar">
        <input
          type="text"
          placeholder="Cari catatan berdasarkan judul..."
        ></input>
      </section>
      <section className="notes-list">
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteItem
              key={note.id}
              id={note.id}
              title={note.title}
              createdAt={note.createdAt}
              body={note.body}
            />
          ))
        ) : (
          <p>Tidak ada catatan ...</p>
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
