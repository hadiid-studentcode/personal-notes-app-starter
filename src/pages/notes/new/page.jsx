import { useState } from "react";
import { addNote, getAllNotes } from "../../../utils/local-data";

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
      addNote({ title, body });
      setFormData({
        title: "",
        body: "",
      });
      alert("Catatan berhasil disimpan");
      const data = getAllNotes();
      console.log(data);
    }
  };

  return (
    <>
      <section className="add-new-page">
        <form>
          <div className="add-new-page__input">
            <input
              className="add-new-page__input__title"
              type="text"
              placeholder="Catatan Rahasia"
              name="title"
              onChange={handleFormChange}
              value={formData.title}
            ></input>
            <textarea
              className="add-new-page__input__body"
              placeholder="Sebenarnya saya adalah ...."
              onChange={handleFormChange}
              value={formData.body}
              name="body"
            ></textarea>
          </div>
          <div className="add-new-page__action">
            <button
              className="action"
              type="submit"
              onClick={handleSaveNotes}
              title="Simpan"
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
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
              </svg>
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
