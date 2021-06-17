import Axios from "axios";
import { CART_ADD_INCREMENT, CART_ADD_DECREMENT, CART_ADD_ITEM, CART_TOGGLE, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from "../constants/cartConstants";

export const addToCart = (item, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      data,
      item,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const cartIncrement = (id) => async (dispatch, getState) => {
    console.log(id);
    dispatch({
        type: CART_ADD_INCREMENT,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

}

export const cartDecrement = (id) => async (dispatch, getState) => {
  console.log(id);
  dispatch({
      type: CART_ADD_DECREMENT,
      payload: id
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

}

export const cartToggle = () => async (dispatch) => {
  dispatch({type: CART_TOGGLE})
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({type: CART_SAVE_SHIPPING_ADDRESS, payload: data })
  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({type: CART_SAVE_PAYMENT_METHOD, payload: data })
}
