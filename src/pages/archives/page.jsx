import { useEffect, useState } from "react";
import { notesService } from "../../services/notes.service";
import { showFormattedDate } from "../../utils";
import NoteItem from "../../components/noteItem";

export default function ArchivesPage() {
  const [archiveNotes, setArchiveNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const archiveNotes = notesService.getArchived();
    setArchiveNotes(archiveNotes);
    setLoading(false);
  }, []);

  return (
    <>
      <section className="archives-page">
        <h2>Catatan Arsip</h2>
        <section className="search-bar">
          <input type="text" placeholder="Cari berdasarkan judul ..." />
        </section>
        <section className="notes-list">
          {archiveNotes.length > 0 ? (
            archiveNotes.map((archiveNote) => (
              <NoteItem
                key={archiveNote.id}
                id={archiveNote.id}
                title={archiveNote.title}
                createdAt={showFormattedDate(archiveNote.createdAt)}
                body={archiveNote.body}
              />
            ))
          ) : (
            <p>Tidak ada catatan arsip ...</p>
          )}
        </section>
      </section>
    </>
  );
}
