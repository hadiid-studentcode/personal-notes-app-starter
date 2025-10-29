import { Link, useNavigate } from "react-router-dom";

export default function NoteItem({ id, title, createdAt, body }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/notes/${id}`);
  };
  return (
    <>
      <article className="note-item">
        <h3 className="note-item__title">
          <Link to={`/notes/${id}`}>{title}</Link>
        </h3>
        <p className="note-item__createdAt">{createdAt}</p>
        <p className="note-item__body">{body}</p>
      </article>
    </>
  );
}
