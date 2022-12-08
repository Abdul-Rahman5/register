import Axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ saveUserData }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [errorList, setErrorList] = useState([]);
  const [loding, setLoding] = useState(false);
  function getUserData(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
    console.log(myUser);
  }
  async function sendUserDataToApi() {
    let { data } = await Axios.post(
      `https://route-movies-api.vercel.app/signin`,
      user
    );
    if (data.message === "success") {
      setLoding(false);
      localStorage.setItem("userToken", data.token);
      saveUserData()
      navigate("/");
    } else {
      setError(data.message);
      setLoding(false);
    }
  }
  function submitLoginForm(e) {
    e.preventDefault();
    setLoding(true);
    let validation = validateRegisterForm();
    if (validation.error) {
    setLoding(false);

      setErrorList(validation.error.details);
    } else {
      sendUserDataToApi();
    setLoding(false);

    }
  }
  function validateRegisterForm() {
    let scheme = Joi.object({
      email: Joi.string().email({ tlds: { allow: ["com", "net"] } }),
      password: Joi.string().pattern(/^[A-Z][a-z]{3,5}$/),
    });
    return scheme.validate(user, { abortEarly: false });
  }
  return (
    <div className="w-75 m-auto py-2">
      <h3 className="my-4">Login Form</h3>
      {error.length > 0 ? (
        <p className="text-danger alert-danger">{error}</p>
      ) : (
        ""
      )}
      <form onSubmit={submitLoginForm}>
        <label htmlFor="email">Email :</label>
        <input
          onChange={getUserData}
          type="email"
          className="form-control my-2 myinput"
          name="email"
          id="email"
        />
        <p className="text-danger">
          {
            errorList.filter((error) => error.context.label === "email")[0]
              ?.message
          }{" "}
        </p>{" "}
        <label htmlFor="password">password :</label>
        <input
          onChange={getUserData}
          type="password"
          className="form-control my-2 myinput"
          name="password"
          id="password"
        />
        <p className="text-danger">
          {errorList.map((error, index) => {
            if (error.context.label === "password") {
              return (
                <p key={index} className="text-danger">
                  password must start with me upperCase....
                </p>
              );
            }
          })}
        </p>
       
        <button type="submit" className="btn btn-info">
          {loding ? <i className="fas  fa-spinner fa-spinn"></i> : "Login"}
        </button>
      </form>
    </div>
  );
}
