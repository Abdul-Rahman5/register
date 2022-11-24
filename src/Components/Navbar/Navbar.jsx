import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ userData, logOut }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg  ">
        <div className="container-fluid text-white">
          <Link className="navbar-brand text-white" to="">
            Movies
          </Link>
          <button
            className="navbar-toggler bg-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon  "></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userData ? (
              <ul className="navbar-nav me-auto mb-2 mx-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link text-white active"
                    aria-current="page"
                    to=""
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white active"
                    aria-current="page"
                    to="movies"
                  >
                    Movies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white active"
                    aria-current="page"
                    to="tv"
                  >
                    Tv
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white active"
                    aria-current="page"
                    to="people"
                  >
                    People
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}
            <div className="d-flex"></div>
            <div className="icon">
              <i className="fab fa-facebook mx-2"></i>
              <i className="fab fa-instagram mx-2"></i>
              <i className="fab fa-twitter mx-2"></i>
              <i className="fab fa-spotify mx-2"></i>
              <i className="fab fa-youtube mx-2"></i>
            </div>
            <ul className="navbar-nav d-flex  justifycontent-flex-end  mb-2 mx-2 mb-lg-0">
              {userData ? (
                <li className="nav-item d-flex">
                  {" "}
                  <Link
                    onClick={logOut}
                    className="nav-link  text-white active"
                    aria-current="page"
                    to=""
                  >
                    LogOut
                  </Link>
                  <br />
                  <Link to="profile" className="mx-2 text-white mt-2">
                    Welocm{userData.first_name}
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-white active"
                      aria-current="page"
                      to="login"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-white active"
                      aria-current="page"
                      to="register"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
