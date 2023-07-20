import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Test = () => {
  const [content, setContent] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    UserService.getTest(accessToken).then(
      () => {
        setContent("test");
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default Test;
