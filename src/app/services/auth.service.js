import { instance } from "../instance/axios.instance";
import axios from "axios";

const register = (username, email, password) => {
  return instance.post("/users", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return instance
    .post("/users/login", {
      email,
      password,
    })
    .then((response) => {
      console.log(response);
      if (response.data) {
        const { accessToken, refreshToken, name } = response.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("username", name);
      }

      return response.data;
    });
};

const logout = (refreshToken, accessToken) => {
  return instance
    .post(
      "/users/logout",
      {
        refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("username");
      }
    })
    .catch((err) => console.log(err));
};

const reissuanceToken = (refreshToken) => {
  return axios
    .post("http://localhost:8080/user/refreshToken", {
      refreshToken,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => console.log(err));
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("username"));
};

const AuthService = {
  register,
  login,
  logout,
  reissuanceToken,
  getCurrentUser,
};

export default AuthService;
