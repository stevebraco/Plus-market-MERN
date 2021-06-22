import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/userActions";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";
import { GoogleLogin } from 'react-google-login';
import { signinGoogle } from "../actions/googleActions";
import { USER_SIGNIN_SUCCESS } from "../constants/userConstants";
import { GOOGLE_AUTH_SUCCESS } from "../constants/googleConstans";


const SigninScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  
  const redirect = props.location.search
  ? props.location.search.split("=")[1]
  : "/";
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin({email, password}));
  };

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  const googleSuccess = async (res) => {
    if(res) {
      const result = res.profileObj
      const token = res.tokenId
      console.log(result);
      console.log(token);
    
     try {
    // dispatch(signinGoogle({result, token}));
    dispatch({ type: USER_SIGNIN_SUCCESS, data:{result, token} });
     } catch (error) {
       console.log(error);
     }
  }
}
  const googleError = () => {}

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
        <button className="btn btn--back" type="submit">
          sign in
        </button>
        <GoogleLogin
        className='btn btn--google'
        clientId='8044367583-c6hmj7bnu6hui01g1fkgeehdbfpn4pr2.apps.googleusercontent.com'
        buttonText='Google Login'
        onSuccess={googleSuccess}
        onFailure={googleError}
        cookiePolicy="single_host_origin"
        ></GoogleLogin>
        <div>
            New customer?
            <Link to={`/register?redirect=${redirect}`}>
              Create your account
            </Link>
          </div>      </form>
    </div>
    </FadeIn>
  );
};

export default SigninScreen;
