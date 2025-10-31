import {
  getAccessToken,
  getUserLogged,
  login,
  putAccessToken,
  register,
} from "../utils/network-data";

export const authService = {
  register: async ({ name, email, password }) => {
    try {
      const response = await register({
        name,
        email,
        password,
      });

      return response.error === false
        ? { status: "success", message: response.message }
        : { status: "warning", message: response.message };
    } catch (error) {
      return { status: "error", message: error.message };
    }
  },
  login: async ({ email, password }) => {
    try {
      const response = await login({ email, password });

      return response.error === false
        ? { status: "success", message: response.message, data: response.data }
        : { status: "warning", message: response.message, data: null };
    } catch (error) {
      return { status: "error", message: error.message, data: null };
    }
  },
  putAccessToken: (accessToken) => {
    return putAccessToken(accessToken);
  },
  getAccessToken: () => {
    return getAccessToken();
  },
  getUserLogged: async () => {
    return await getUserLogged();
  },
};
