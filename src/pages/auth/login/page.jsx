import { Link, useNavigate } from "react-router-dom";
import LoginInput from "../../../components/loginInput";
import { useState } from "react";
import { authService } from "../../../services/auth.service";
import { toast } from "react-toastify";

export default function LoginPage({ loginSuccess }) {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

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
        <h2>Yuk, login untuk menggunakan aplikasi.</h2>
        <LoginInput
          handleLogin={handleLogin}
          state={state}
          handleFormChange={handleFormChange}
        />
      </section>
    </>
  );
}
