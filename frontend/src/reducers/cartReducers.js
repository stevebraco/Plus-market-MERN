import {
  CART_ADD_DECREMENT,
  CART_ADD_INCREMENT,
  CART_ADD_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_TOGGLE,
  CART_TOGGLE_CLOSE,
  CART_TOGGLE_OPEN,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload.item;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x._id === existItem._id ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case CART_ADD_INCREMENT:
      let addedItem = state.cartItems.find(
        (item) => item._id === action.payload
      );
      addedItem.quantity += 1;
      return { ...state };
    case CART_ADD_DECREMENT:
      let takeOffItem = state.cartItems.find(
        (item) => item._id === action.payload
      );
      takeOffItem.quantity -= 1;
      if (takeOffItem.quantity === 0) {
        takeOffItem.quantity = 1;
        return {
          ...state,
          cartItems: state.cartItems.filter((x) => x._id !== action.payload),
        };
      } else {
        return {
          ...state,
        };
      }

    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };

    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload};

    default:
      return state;
  }
};

export const cartToggleReducer = (state = { toggle: false }, action) => {
  switch (action.type) {
    case CART_TOGGLE:
      return { ...state, toggle: !state.toggle };
    case CART_TOGGLE_OPEN:
      return { toggle: true };
    case CART_TOGGLE_CLOSE:
      return { toggle: false };

    default:
      return state;
  }
};
