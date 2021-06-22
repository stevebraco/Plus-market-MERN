import { GOOGLE_AUTH_FAIL, GOOGLE_AUTH_REQUEST, GOOGLE_AUTH_SUCCESS } from "../constants/googleConstans";

export const googleSigninReducer = (state = {authData: null}, action) => {
    switch (action.type) {
      case GOOGLE_AUTH_REQUEST:
        return { loading: true };
      case GOOGLE_AUTH_SUCCESS:
        localStorage.setItem("userInfo", JSON.stringify(action.data));
        return {...state, authData: action.data, loading: false};
      case GOOGLE_AUTH_FAIL:
        return { loading: false, error: action.payload };
    //   case USER_SIGNOUT:
    //     return {};
      default:
        return state;
    }
  };