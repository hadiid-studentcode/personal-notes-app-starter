import { useState } from "react";
import { notesService } from "../../../services/notes.service";
import { ToastContainer, toast } from "react-toastify";
import FormNote from "../../../components/formNote";
export default function NewNotePage() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSaveNotes = (e) => {
    e.preventDefault();
    const { title, body } = formData;
    if (title && body) {
      notesService.add({ title, body });
      toast("Catatan berhasil disimpan");
      setFormData({
        title: "",
        body: "",
      });

      const data = notesService.getActive();
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />{" "}
      <section className="add-new-page">
        <FormNote
          formData={formData}
          handleFormChange={handleFormChange}
          handleSaveNotes={handleSaveNotes}
        />
      </section>
    </>
  );
}
