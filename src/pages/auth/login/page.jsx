import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <>
      <section className="login-page">
        <h2>Yuk, login untuk menggunakan aplikasi.</h2>
        <div className="input-login">
          <label htmlFor="email">Email</label>
          <input type="email" id="email"/>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
          <button type="button">Login</button>
        </div>
        <p>
          Belum punya akun? <Link to="/register">Daftar di sini</Link>
        </p>
      </section>
    </>
  );
}
