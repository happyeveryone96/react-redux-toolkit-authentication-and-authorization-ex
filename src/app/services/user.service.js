import { instance } from "../instance/axios.instance";

const getPublicContent = () => {
  return instance.get("all");
};

const getTest = (accessToken) => {
  return instance
    .get("test", {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : accessToken,
      },
    })
    .then((response) => {
      return response.data;
    });
};

const getUserProfile = (accessToken) => {
  return instance.get("user", {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : accessToken,
    },
  });
};

const editProfile = (username, password, accessToken) => {
  return instance
    .put(
      "user",
      {
        username,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => {
      const { username } = response.data;
      if (response.status === 200) {
        localStorage.setItem("username", username);
      }
      return response.data;
    });
};

const getModeratorBoard = () => {
  return instance.get("mod");
};

const getAdminBoard = () => {
  return instance.get("admin");
};

const UserService = {
  getPublicContent,
  getUserProfile,
  editProfile,
  getModeratorBoard,
  getAdminBoard,
  getTest,
};

export default UserService;
