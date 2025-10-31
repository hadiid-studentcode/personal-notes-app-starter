import { Link, useNavigate } from "react-router-dom";
import RegistrasiInput from "../../../components/registrasiInput";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { authService } from "../../../services/auth.service";
import LocaleContext from "../../../contexts/localeContext";
export default function RegisterPage({ theme }) {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { selectLanguage } = useContext(LocaleContext);

  const handleFormChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword: confirm } = state;

    if (password !== confirm) {
      toast("Password dan konfirmasi password harus sama");
      return;
    }

    try {
      const res = await authService.register({
        name: name,
        email: email,
        password: password,
      });
      if (res.status === "success") {
        toast(res.message);
        setState({ name: "", email: "", password: "", confirmPassword: "" });
        setTimeout(() => navigate("/"), 3000);
      } else {
        toast(res.message);
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      <section className="regsiter-page">
        <h2>
          {selectLanguage({
            id: "Isi form untuk mendaftar akun.",
            en: "Fill out the form to register an account.",
          })}
        </h2>
        <RegistrasiInput
          handleRegister={handleRegister}
          state={state}
          handleFormChange={handleFormChange}
          selectLanguage={selectLanguage}
        />
        <p>
          {selectLanguage({
            id: "Sudah punya akun?",
            en: "Already have an account?",
          })}
          <Link to="/">
            {selectLanguage({
              id: " Login di sini",
              en: " Login here",
            })}
          </Link>
        </p>
      </section>
    </>
  );
}
