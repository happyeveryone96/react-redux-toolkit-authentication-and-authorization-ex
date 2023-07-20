import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:8080/",
});

instance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  async function (error) {
    if (error.status === 401) {
      console.log(error);
      // return await resetTokenAndReattemptRequest(error);
    }
    // Do something with request error
    return Promise.reject(error);
  }
);
