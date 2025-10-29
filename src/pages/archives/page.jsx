import { useEffect, useState, useMemo } from "react"; // 1. Impor useMemo
import { notesService } from "../../services/notes.service";
import { showFormattedDate } from "../../utils";
import NoteItem from "../../components/noteItem";
import { useSearchParams } from "react-router-dom";

export default function ArchivesPage() {
  // 2. State ini untuk menyimpan SEMUA catatan arsip, jangan diubah
  const [allArchivedNotes, setAllArchivedNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const initialKeyword = searchParams.get("keyword") || "";
  const [keyword, setKeyword] = useState(initialKeyword);

  useEffect(() => {
    const archiveNotes = notesService.getArchived();
    setAllArchivedNotes(archiveNotes);
    setLoading(false);
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
    return <p>Memuat Catatan...</p>;
  }

  return (
    <>
      <section className="archives-page">
        <h2>Catatan Arsip</h2>
        <section className="search-bar">
          <input
            type="text"
            placeholder="Cari berdasarkan judul ..."
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
            <p>Tidak ada catatan arsip ...</p>
          )}
        </section>
      </section>
    </>
  );
}
