import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./app/components/Login";
import Register from "./app/components/Register";
import Home from "./app/components/Home";
import Profile from "./app/components/Profile";
import BoardUser from "./app/components/BoardUser";
import BoardModerator from "./app/components/BoardModerator";
import BoardAdmin from "./app/components/BoardAdmin";

import { logout, reissuanceToken } from "./app/slices/auth";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const username = localStorage.getItem("username");

  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");

  const isLogin = username && username.length > 0;

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout({ refreshToken, accessToken }));
  }, [dispatch, refreshToken, accessToken]);

  const reissuanceTokenEvent = useCallback(() => {
    dispatch(reissuanceToken({ refreshToken, accessToken }));
  }, [dispatch, refreshToken, accessToken]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles?.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles?.includes("ROLE_ADMIN"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }
  }, [currentUser]);

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            bezKoder
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {
              <li className="nav-item">
                <Link to={"/test"} className="nav-link">
                  test
                </Link>
              </li>
            }
          </div>

          {isLogin ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={reissuanceTokenEvent}>
                  reissuanceToken
                </button>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/test" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
