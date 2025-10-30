import { register } from "../utils/network-data";

export const authService = {
  register: async ({ name, email, password }) => {
    try {
      const response = await register({
        name,
        email,
        password,
      });

      return response.status === "success"
        ? { status: "success", message: response.message }
        : { status: "warning", message: response.message };
    } catch (error) {
      return { status: "error", message: "Terjadi kesalahan" };
    }
  },
};
