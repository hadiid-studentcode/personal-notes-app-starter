import { useState } from "react";
import { toast } from "react-toastify";
import FormNote from "../../../components/formNote";
import { useNavigate } from "react-router-dom";
import { notesServiceNetwork } from "../../../services/notesNetwork.service";
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
      notesServiceNetwork.addNote({ title, body });
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
