export default function RegistrasiInput({
  handleRegister,
  state,
  handleFormChange,
  selectLanguage,
}) {
  return (
    <>
      <form onSubmit={handleRegister} className="input-register">
        <label htmlFor="name">
          {selectLanguage({
            id: "Nama",
            en: "Name",
          })}
        </label>
        <input type="text" id="name" name="name" onChange={handleFormChange} />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={state.email}
          onChange={handleFormChange}
        />
        <label htmlFor="password">
          {selectLanguage({
            id: "Kata Sandi",
            en: "Password",
          })}
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={state.password}
          onChange={handleFormChange}
        />
        <label htmlFor="confirmPassword">
          {selectLanguage({
            id: "Konfirmasi Kata Sandi",
            en: "Confirm Password",
          })}
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={handleFormChange}
          value={state.confirmPassword}
        />
        <button type="submit">
          {selectLanguage({
            id: "Daftar",
            en: "Register",
          })}
        </button>
      </form>
    </>
  );
}
