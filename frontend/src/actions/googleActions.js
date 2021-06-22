import Axios from 'axios'
import { GOOGLE_AUTH_FAIL, GOOGLE_AUTH_REQUEST, GOOGLE_AUTH_SUCCESS } from '../constants/googleConstans';
import { USER_SIGNIN_SUCCESS } from '../constants/userConstants';


export const signinGoogle = (formData) => async (dispatch) => {
    dispatch({ type: GOOGLE_AUTH_REQUEST, payload: formData });
    console.log(formData);
    try {
      const { data } = await Axios.post("/api/users/signin", formData );
      dispatch({ type: GOOGLE_AUTH_SUCCESS, payload: data});
      // localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: GOOGLE_AUTH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };