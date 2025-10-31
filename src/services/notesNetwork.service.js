import {
  addNote,
  archiveNote,
  deleteNote,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  unarchiveNote,
} from "../utils/network-data";

export const notesServiceNetwork = {
  addNote: async ({ title, body }) => {
    try {
      const response = await addNote({ title, body });

      return response.error === false
        ? { status: "success", message: response.message, data: response.data }
        : { status: "warning", message: response.message, data: null };
    } catch (error) {
      return { status: "error", message: error.message, data: null };
    }
  },

  getActiveNotes: async () => {
    try {
      const response = await getActiveNotes();
      return response.error === false
        ? { status: "success", message: response.message, data: response.data }
        : { status: "warning", message: response.message, data: null };
    } catch (error) {
      return { status: "error", message: error.message, data: null };
    }
  },

  getArchivedNotes: async () => {
    try {
      const response = await getArchivedNotes();
      return response.error === false
        ? { status: "success", message: response.message, data: response.data }
        : { status: "warning", message: response.message, data: null };
    } catch (error) {
      return { status: "error", message: error.message, data: null };
    }
  },
  getNote: async (id) => {
    try {
      const response = await getNote(id);
      return response.error === false
        ? { status: "success", message: response.message, data: response.data }
        : { status: "warning", message: response.message, data: null };
    } catch (error) {
      return { status: "error", message: error.message, data: null };
    }
  },
  archiveNote: async (id) => {
    try {
      const response = await archiveNote(id);
      return response.error === false
        ? { status: "success", message: response.message, data: response.data }
        : { status: "warning", message: response.message, data: null };
    } catch (error) {
      return { status: "error", message: error.message, data: null };
    }
  },
  unarchiveNote: async (id) => {
    try {
      const response = await unarchiveNote(id);
      return response.error === false
        ? { status: "success", message: response.message, data: response.data }
        : { status: "warning", message: response.message, data: null };
    } catch (error) {
      return { status: "error", message: error.message, data: null };
    }
  },
  deleteNote: async (id) => {
    try {
      const response = await deleteNote(id);
      return response.error === false
        ? { status: "success", message: response.message, data: response.data }
        : { status: "warning", message: response.message, data: null };
    } catch (error) {
      return { status: "error", message: error.message, data: null };
    }
  },
};
