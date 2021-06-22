import { GOOGLE_AUTH_SUCCESS } from "../constants/googleConstans";
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "../constants/userConstants";

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };

    case USER_SIGNIN_SUCCESS:
      localStorage.setItem("userInfo", JSON.stringify(action.data || action.payload));
      // localStorage.setItem("userInfo", JSON.stringify(action.payload));
      // localStorage.setItem("userInfo", JSON.stringify(action.payload) || JSON.stringify(action.data) );
      console.log(action.data);
      console.log(action.payload);
      return {...state, userInfo: action.data || action.payload , loading: false};

      // case GOOGLE_AUTH_SUCCESS:
      //   localStorage.setItem("userInfo", JSON.stringify(action.data));
      //   return {...state, userInfo: action.data, loading: false};

    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_SIGNOUT:
      return {};

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_REGISTER_FAIL:
      return { loading: false, error: 'Email already used'};

    default:
      return state;
  }
};
