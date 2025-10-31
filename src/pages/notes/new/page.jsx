import { useState } from "react";
import { notesService } from "../../../services/notes.service";
import { toast } from "react-toastify";
import FormNote from "../../../components/formNote";
import { useNavigate } from "react-router-dom";
export default function NewNotePage({ theme }) {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const navigate = useNavigate();

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

      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  return (
    <>
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
