import { GOOGLE_AUTH_FAIL, GOOGLE_AUTH_REQUEST, GOOGLE_AUTH_SUCCESS } from "../constants/googleConstans";

export const googleSigninReducer = (state = {}, action) => {
    switch (action.type) {
      case GOOGLE_AUTH_REQUEST:
        return { loading: true };
      case GOOGLE_AUTH_SUCCESS:
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
        return { loading: false, userInfo: action.payload };
      case GOOGLE_AUTH_FAIL:
        return { loading: false, error: action.payload };
    //   case USER_SIGNOUT:
    //     return {};
      default:
        return state;
    }
  };