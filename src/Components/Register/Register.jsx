import Axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
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
      `https://route-egypt-api.herokuapp.com/signup`,
      user
    );
    if (data.message === "success") {
      navigate("/login");
      setLoding(false);
    } else {
      setError(data.message);
      setLoding(false);
    }
  }
  function submitRegisterForm(e) {
    e.preventDefault();
    setLoding(true);
    let validation = validateRegisterForm();
    if (validation.error) {
    setLoding(false);

      setErrorList(validation.error.details);
    } else {
    setLoding(false);
      sendUserDataToApi();
    }
  }
  function validateRegisterForm() {
    let scheme = Joi.object({
      first_name: Joi.string().min(3).max(10).required(),
      last_name: Joi.string().min(3).max(10).required(),
      age: Joi.number().min(16).max(80).required(),
      email: Joi.string().email({ tlds: { allow: ["com", "net"] } }),
      password: Joi.string().pattern(/^[A-Z][a-z]{3,5}/),
    });
    return scheme.validate(user, { abortEarly: false });
  }
  return (
    <div className="w-75 m-auto py-2">
      <h3 className="my-4">Register Form</h3>
      {error.length > 0 ? (
        <p className="text-danger alert-danger">{error}</p>
      ) : (
        ""
      )}
      {/* {errorList.map((error, index) => {
        if (error.context.label === "password") {
          return (
            <div key={index} className="alert py-1 alert-danger">
              password must start with me upperCase....
            </div>
          );
        }
      })} */}
      <form onSubmit={submitRegisterForm}>
        <label htmlFor="first_name">first_name :</label>
        <input
          onChange={getUserData}
          type="text"
          className="form-control my-2 myinput"
          name="first_name"
          id="first_name"
        />
        <p className="text-danger">
          {" "}
          {
            errorList.filter((error) => error.context.label === "first_name")[0]
              ?.message
          }{" "}
        </p>{" "}
        <label htmlFor="last_name">last_name :</label>
        <input
          onChange={getUserData}
          type="text"
          className="form-control my-2 myinput"
          name="last_name"
          id="last_name"
        />
        <p className="text-danger">
          {" "}
          {
            errorList.filter((error) => error.context.label === "last_name")[0]
              ?.message
          }{" "}
        </p>{" "}
        <label htmlFor="age">Age :</label>
        <input
          onChange={getUserData}
          type="number"
          className="form-control my-2 myinput"
          name="age"
          id="age"
        />
        <p className="text-danger">
          {" "}
          {
            errorList.filter((error) => error.context.label === "age")[0]
              ?.message
          }{" "}
        </p>{" "}
        <label htmlFor="email">Email :</label>
        <input
          onChange={getUserData}
          type="email"
          className="form-control my-2 myinput"
          name="email"
          id="email"
        />
        <p className="text-danger">
          {" "}
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
          {/* {" "}
          {
            errorList.filter((error) => error.context.label === "password")[0]
              ?.message
          } */}
          {errorList.map((error, index) => {
            if (error.context.label === "password") {
              return (
                <p key={index} className="text-danger">
                  password must start with me upperCase....
                </p>
              );
            }
          })}
        </p>{" "}
        <button type="submit" className="btn btn-info">
          {loding ? <i className="fas  fa-spinner fa-spinn"></i> : "Register"}
        </button>
      </form>
    </div>
  );
}
