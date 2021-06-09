import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/userActions";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";


const SigninScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const redirect = props.location.search
  ? props.location.search.split("=")[1]
  : "/";
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <FadeIn>
    <div className="signin">
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1 className="heading">Sign In</h1>
        </div>
        <div className="form__group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
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
        <button className="btn" type="submit">
          sign in
        </button>
      <Link className='link-register' to="/register"> create your account </Link>
      </form>
    </div>
    </FadeIn>
  );
};

export default SigninScreen;
