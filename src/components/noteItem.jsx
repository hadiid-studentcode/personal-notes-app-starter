export default function NoteItem({ id, title, createdAt, body }) {
  return (
    <>
      <article className="note-item">
        <h3 className="note-item__title">
          <a href={`/notes/${id}`}>{title}</a>
        </h3>
        <p className="note-item__createdAt">{createdAt}</p>
        <p className="note-item__body">{body}</p>
      </article>
    </>
  );
}
