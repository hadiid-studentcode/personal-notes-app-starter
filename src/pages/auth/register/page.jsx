import { Link, useNavigate } from "react-router-dom";
import RegistrasiInput from "../../../components/registrasiInput";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { authService } from "../../../services/auth.service";
export default function RegisterPage({ theme }) {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

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
      toast("Terjadi kesalahan");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />{" "}
      <section className="regsiter-page">
        <h2>Isi form untuk mendaftar akun.</h2>
        <RegistrasiInput
          handleRegister={handleRegister}
          state={state}
          handleFormChange={handleFormChange}
        />
        <p>
          Sudah punya akun? <Link to="/">Login di sini</Link>
        </p>
      </section>
    </>
  );
}
