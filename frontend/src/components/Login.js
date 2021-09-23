import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';


const Login = ({ props }) => {
  const infoUser = { email: '', password: '' }
  const [formData, setFormData] = useState(infoUser);
  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);


  //How can we know on which input are we currently ? with the name
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(formData));

  }
  return (
      <form className="form" onSubmit={submitHandler}>
        <span className="form__text">Login to your account.</span>
        <div className="form__group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            id="email"
            name="email"
            required
            onChange={handleChange}
            autoFocus
          />
        </div>
        <div className="form__group">
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            id="password"
            required
            onChange={handleChange}
          />
        </div>
        <button className="btn btn--submit" type="submit">
          sign in
        </button>
      </form>
  )
}

export default Login
