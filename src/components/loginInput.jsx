import { Link } from "react-router-dom";

export default function LoginInput({
  handleLogin,
  state,
  handleFormChange,
  selectLanguage,
}) {
  return (
    <>
      <form onSubmit={handleLogin} className="input-login">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleFormChange}
          value={state.email}
        />
        <label htmlFor="password">
          {selectLanguage({ id: "Kata sandi", en: "Password" })}
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleFormChange}
          value={state.password}
        />
        <button type="submit">{selectLanguage({ id: "Masuk", en: "Login" })}</button>
      </form>
    </>
  );
}
