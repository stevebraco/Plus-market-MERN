import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import LoadingBox from './LoadingBox';

const Register = ({props}) => {
  const infoUser = {name: '', email: '', password: '', confirmPassword: ''}
  const [formData, setFormData] = useState(infoUser);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

   //How can we know on which input are we currently ? with the name
   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

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
     if (formData.password !== formData.confirmPassword) {
       alert("Password and confirm password are not match");
     } else {
       dispatch(register(formData.name, formData.email, formData.password));
     }
  }

  return (
    <form className="form" onSubmit={submitHandler}>
      <span className="form__text">Create your account.</span>
        {loading && <LoadingBox></LoadingBox>}
        {error && <p> {error} </p>}
        <div className="form__group">
          <label htmlFor="name">full name</label>
          <input
            type="text"
            placeholder="Enter Name"
            id="name"
            name="name"
            required
            onChange={handleChange}
            autoFocus
          />
        </div>
        <div className="form__group">
          <label htmlFor="email">email</label>
          <input
            type="email"
            placeholder="Enter Email"
            id="email"
            name="email"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form__group">
          <label htmlFor="password">password</label>
          <input
            type="password"
            placeholder="Enter Password"
            id="password"
            name="password"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form__group">
          <label htmlFor="confirmPassword">confirm password</label>
          <input
            type="password"
            placeholder="Enter Password"
            id="confirmPassword"
            name="confirmPassword"
            required
            onChange={handleChange}
          />
        </div>
        <button className="btn btn--submit" type="submit">
          Register
        </button>
        {/* <div>
          <p className="link-register">
            {" "}
            Already have an account ?{" "}
            <Link to={`/signin?redirect=${redirect}`}>sign in</Link>
          </p>
        </div> */}
      </form>
  )
}

export default Register
