import { addNote, archiveNote, deleteNote, editNote, getActiveNotes, getAllNotes, getArchivedNotes, getNote, unarchiveNote } from "../utils/local-data";

export const notesServiceLocal = {
  getAll: getAllNotes,
  getActive: getActiveNotes,
  getArchived: getArchivedNotes,
  delete: deleteNote,
  edit: editNote,
  getById: getNote,
  archive: archiveNote,
  unarchive: unarchiveNote,
  add: addNote,
};
