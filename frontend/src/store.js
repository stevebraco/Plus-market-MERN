import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { blogCommentCreateReducer, blogCreateReducer, blogDetailsReducer, blogListReducer, blogUpdateReducer } from './reducers/blogReducers';
import { cartReducer, cartToggleReducer } from './reducers/cartReducers';
import { productBestSellerReducer, productCategoryListReducer, productCreateReducer, productDetailsReducer, productLastReducer, productListReducer, productUpdateReducer } from './reducers/productReducers';
import { userRegisterReducer, userSigninReducer } from './reducers/userReducers';

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")  // Les articles
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },

  
};
const reducer = combineReducers({
  cart: cartReducer,
  productList: productListReducer,
  productLast: productLastReducer,
  productBestSeller: productBestSellerReducer,
  productCategoryList: productCategoryListReducer,
  productCreate: productCreateReducer,
  productDetails: productDetailsReducer,
  productUpdate: productUpdateReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  cartToggle: cartToggleReducer,
  blogList: blogListReducer,
  blogDetails: blogDetailsReducer,
  blogCreate: blogCreateReducer,
  blogCommentCreate: blogCommentCreateReducer,
  blogUpdate: blogUpdateReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;