import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [content, setContent] = useState("");
  const username = localStorage.getItem("username");
  const isLogin = username && username.length > 0;

  useEffect(() => {
    setContent(username);
  }, []);

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>name: {content}</h3>
      </header>
    </div>
  );
};

export default Home;
