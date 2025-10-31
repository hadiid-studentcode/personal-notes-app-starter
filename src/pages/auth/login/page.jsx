import { Link, useNavigate } from "react-router-dom";
import LoginInput from "../../../components/loginInput";
import { useContext, useState } from "react";
import { authService } from "../../../services/auth.service";
import { toast } from "react-toastify";
import LocaleContext from "../../../contexts/localeContext";

export default function LoginPage({ loginSuccess }) {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const { selectLanguage } = useContext(LocaleContext);

  const handleFormChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = state;

    try {
      const res = await authService.login({ email, password });
      if (res.status === "success") {
        toast(res.message);
        loginSuccess(res.data);
      } else {
        toast(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="login-page">
        <h2>
          {selectLanguage({
            id: "Yuk, login untuk menggunakan aplikasi.",
            en: "Login to use app, please.",
          })}
        </h2>
        <LoginInput
          handleLogin={handleLogin}
          state={state}
          handleFormChange={handleFormChange}
          selectLanguage={selectLanguage}
        />
        <p>
          {selectLanguage({
            id: "Belum punya akun?",
            en: "Don't have an account?",
          })}{" "}
          <Link to="/register">
            {selectLanguage({ id: "Daftar di sini", en: "Register here" })}
          </Link>
        </p>
      </section>
    </>
  );
}
