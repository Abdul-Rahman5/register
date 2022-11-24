import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Login from "../Login/Login";

export default function ProtectedRoute({ userData , children , saveUserData }) {
  let navigate = useNavigate();
    if (userData === null) {
        return <Login saveUserData={saveUserData } />;

    } else {
        return children;
  }
}
