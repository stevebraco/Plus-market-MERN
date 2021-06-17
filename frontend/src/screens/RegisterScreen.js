import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import FadeIn from "react-fade-in";


const RegisterScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password are not match");
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <FadeIn>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h2 className="heading">Register</h2>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <p> {error} </p>}
        <div className="form__group">
          <label htmlFor="name">full name</label>
          <input
            type="text"
            placeholder="Enter Name"
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>
        <div className="form__group">
          <label htmlFor="email">email</label>
          <input
            type="email"
            placeholder="Enter Email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="password">password</label>
          <input
            type="password"
            placeholder="Enter Password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="password">confirm password</label>
          <input
            type="password"
            placeholder="Enter Password"
            id="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="btn btn--back" type="submit">
          Register
        </button>
        <div>
          <p className="link-register">
            {" "}
            Already have an account ?{" "}
            <Link to={`/signin?redirect=${redirect}`}>sign in</Link>
          </p>
        </div>
      </form>
    </FadeIn>
  );
};

export default RegisterScreen;
