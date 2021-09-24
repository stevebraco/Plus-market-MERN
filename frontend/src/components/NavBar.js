import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { red} from '@material-ui/core/colors';
import { Avatar } from '@material-ui/core';
import { signout } from '../actions/userActions';
import { cartToggle } from '../actions/cartActions';



const useStyles = makeStyles((theme) => ({
  red: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[400],
  },
}));

const NavBar = () => {
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();

  let location = useLocation()
  
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  
  const handleClick = () => setClick(!click);
  
  const signoutHandler = () => {
    dispatch(signout());
  };
  
  const classes = useStyles();
  
  const isPlaceOrder = location.pathname === '/placeorder/stripe' || location.pathname === '/placeorder/paypal'   
  
  return (
    <div className="navbar dp-flex">
          <div id="menu-bar" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
          <nav className={click ? "navbar__menu active" : "navbar__menu dp-flex"}>
           
            <Link to="/products" className="navbar__link">
              product
            </Link>
            <Link to="/" className="navbar__link">
              deal
            </Link>
            <Link to="/" className="navbar__link">
              contact
            </Link>
            <Link to="/blog" className="navbar__link">
              blog 
            </Link>
               
          </nav>

          <div className="navbar__icons">
            { isPlaceOrder ? ( 
            <div className="navbar__link fa fa-shopping-basket">
              {cartItems.length > 0 && (
                <span className="badge"> {cartItems.length} </span>
              )}
            </div>

            ) : (
              <div onClick={ () => dispatch(cartToggle()) }  className="navbar__link fa fa-shopping-basket">
              {cartItems.length > 0 && (
                <span className="badge"> {cartItems.length} </span>
              )}
            </div>
            ) }
            <Link to="/favoriteslist" className="navbar__link fa fa-heart"></Link>
            {userInfo && userInfo.result.isAdmin && (
              <div className="navbar__drop-down">
              <Link to="#admin">
              <i className="navbar__link fa fa-wrench"></i> 
                </Link>
                <div className="navbar__drop-down-content">
                    <Link className='navbar__link' to="/productlist">products</Link>
                    <Link className='navbar__link' to="/blogcreate">create blog</Link>
                </div>
              </div>
            )}
            {userInfo ? (
              <div className="navbar__drop-down">
                <Link to="/signin" className="navbar__link">
                <Avatar className={classes.red} alt={`${userInfo.result.name}`.toUpperCase()} src={`${userInfo.result?.imageUrl}`}  />
                </Link>

                <div className="navbar__drop-down-content">
                  <Link className="navbar__link" to="/">
                    profile
                  </Link>
                  <Link className="navbar__link" to="/">
                    Item 2
                  </Link>
                  <Link className="navbar__link signout" to="#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </div>
                
              </div>
            ) : (
              <Link to="/signin" className="navbar__link">
              <Avatar  />
              </Link>
            )}
          </div>
          
        </div>
  )
}

export default NavBar
