import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Login from '../components/Login';
import Register from '../components/Register';
import { GoogleLogin } from 'react-google-login';
import { USER_SIGNIN_SUCCESS } from '../constants/userConstants';
import { FaShuttleVan } from 'react-icons/fa'
import { AiOutlineAlert, AiFillStar } from 'react-icons/ai'

const TestScreen = (props) => {
  const [isLogin, setisLogin] = useState(true)
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


  const googleSuccess = async (res) => {
    if (res) {
      const result = res.profileObj
      const token = res.tokenId
      console.log(result);
      console.log(token);

      try {
        // dispatch(signinGoogle({result, token}));
        dispatch({ type: USER_SIGNIN_SUCCESS, data: { result, token } });
      } catch (error) {
        console.log(error);
      }
    }
  }
  const googleError = () => { }

  return (
    <section className='container'>
      <div className='dp-flex just-center container__formFlex'>
        <div className='container__form'>
          <div className='container__form__btn'>
            <button className={isLogin ? 'switch-btn-active' : 'switch-btn'} onClick={() => setisLogin(true)}>Login</button>
            <button className={!isLogin ? 'switch-btn-active' : 'switch-btn'} onClick={() => setisLogin(false)}>Register</button>
          </div>
          {isLogin ? (
            <Login props={props} />
          ) : (
            <Register props={props} />
          )}
          <span className='form__text'> Or login with : </span>
          <GoogleLogin
            className='btn btn--google'
            clientId='8044367583-c6hmj7bnu6hui01g1fkgeehdbfpn4pr2.apps.googleusercontent.com'
            buttonText='Google Login'
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          ></GoogleLogin>
        </div>
        <div className='advantages-account'>
          <h2 className='heading'>Advantages of becoming a member</h2>
          <p className='advantages-account__text'><strong> Plus Market </strong> buyer protection has you covered from click to delivery.</p>
          <p>Sign up or sign in and you will be able to :</p>
          <div className='advantages-account__container'>
            <p className='advantages-account__desc'> <span className='advantages-account__icon'> <FaShuttleVan /> </span> Easily Track Orders, Hassle free Returns</p>
            <p className='advantages-account__desc'> <span className='advantages-account__icon'> <AiOutlineAlert /> </span> Get Relevant Alerts and Recommendation</p>
            <p className='advantages-account__desc'> <span className='advantages-account__icon'> <AiFillStar /> </span> Whishlist, Reviews, Ratings and more.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestScreen
