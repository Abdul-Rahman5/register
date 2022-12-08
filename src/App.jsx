import logo from "./logo.svg";
import "./App.css";
import "react-router-dom";
import {
  createBrowserRouter,
  createHashRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Tv from "./Components/Tv/Tv";
import Register from "./Components/Register/Register";
import Movies from "./Components/Movies/Movies";
import People from "./Components/People/People";
import Notfound from "./Components/Notfound/Notfound";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import Profile from "./Components/Profile/Profile";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import MovieDetals from "./Components/MovieDetalise/MovieDetals";
import Moviedata from "./Components/Movies/Moviedata";
function App() {
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      saveUserData();
    }
  }, []);
  const [userData, setUserData] = useState(null);
  function logOut() {
    localStorage.removeItem("userToken");
    setUserData(null);
    return <Navigate to="/login" />;
  }
  function saveUserData() {
    let encodenToken = localStorage.getItem("userToken");
    let decodenToken = jwtDecode(encodenToken);
    setUserData(decodenToken);
  }
  let router = createHashRouter([
    {
      path: "",
      element: <Layout userData={userData} logOut={logOut} />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute saveUserData={saveUserData} userData={userData}>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: <Login saveUserData={saveUserData} />,
        },
        {
          path: "tv",
          element: (
            <ProtectedRoute saveUserData={saveUserData} userData={userData}>
              <Tv />
            </ProtectedRoute>
          ),
        },
        {
          path: "movies",
          element: (
            <ProtectedRoute saveUserData={saveUserData} userData={userData}>
              <Movies />{" "}
            </ProtectedRoute>
          ),
          children: [{ path: "moviedata", element: <Moviedata /> }],
        },
        { path: "register", element: <Register /> },

        {
          path: "people",
          element: (
            <ProtectedRoute saveUserData={saveUserData} userData={userData}>
              <People />
            </ProtectedRoute>
          ),
        },
        {
          path: "/movieDetals/:id/:media_type",
          element: (
            <ProtectedRoute saveUserData={saveUserData} userData={userData}>
              <MovieDetals />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute saveUserData={saveUserData} userData={userData}>
              {" "}
              <Profile userData={userData} />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
