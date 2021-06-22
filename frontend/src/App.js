import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import './App.css';
import { BrowserRouter, Route, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { listProductCategories } from "./actions/productActions";
import { signout } from "./actions/userActions";
import LoadingBox from "./components/LoadingBox";
import HomeScreen from "./screens/HomeScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SigninScreen from "./screens/SigninScreen";
import AdminRoute from "./components/AdminRoute";
import ProductsScreen from "./screens/ProductsScreen";
import { cartDecrement, cartIncrement, cartToggle } from "./actions/cartActions";
import BlogDetailScreen from "./screens/BlogDetailScreen";
import BlogCreateScreen from "./screens/BlogCreateScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import BlogScreen from "./screens/BlogScreen";
import { Avatar } from '@material-ui/core';
import { red} from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import BlogEditScreen from "./screens/BlogEditScreen";
import ScrollToTop from "./components/ScrollToTop";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import { CART_TOGGLE_CLOSE } from "./constants/cartConstants";
import CartItems from "./components/CartItems";
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import decode from 'jwt-decode'


const useStyles = makeStyles((theme) => ({
  
  red: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[400],
  },
 
}));

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')));
  const [click, setClick] = useState(false);
  const [asideCategory, setAsideCategory] = useState(false);

  const handleClick = () => setClick(!click);


  const dispatch = useDispatch();

  const history = useHistory()

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const toggleCart = useSelector((state) => state.cartToggle);
  const { toggle } = toggleCart;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  useEffect(() => {
    dispatch(listProductCategories());
    
  }, [dispatch]);

  const signoutHandler = () => {
    dispatch(signout());
  };

  const handleClose = () => {
    dispatch({ type: CART_TOGGLE_CLOSE });
  };

  const handleIncrement = (item) => {
    dispatch(cartIncrement(item));
  };

  const handleDecrement = (item) => {
    dispatch(cartDecrement(item));
  };

  const handleCheckout = () => {
    history.push("/")
  }
  

  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  cart.totalPrice = totalPrice;

  
  const classes = useStyles();

  return (
    <BrowserRouter>
    <ScrollToTop/>
      <header className="header">
        <div className="header__hero dp-flex">
          <Link to="/" className="header__logo">
            <img
            className='header__logo'
              src="https://fontmeme.com/permalink/210610/ef36e62a4e1981ee748bc769f8161737.png"
              alt="logo"
            />
          </Link>
            <div className="wrapper-search">
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
            </div>
        </div>
        <div className="navbar dp-flex">
          <div id="menu-bar" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
          <nav className={click ? "navbar__menu active" : "navbar__menu dp-flex"}>
            
            <div>
                <button onClick={ () => setAsideCategory(!asideCategory) } className=" btn btn--back">
                <i className="fa fa-bars"></i> shop by category 
                </button>
                
              </div>
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
            <div onClick={ () => dispatch(cartToggle()) }  className="navbar__link fa fa-shopping-basket">
              {cartItems.length > 0 && (
                <span className="badge"> {cartItems.length} </span>
              )}
            </div>

            <Link to="/" className="navbar__link fa fa-heart"></Link>
            
            
            {userInfo && userInfo.isAdmin && (
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
                  </Link>{" "}
                </div>
                
              </div>
            ) : (
              <Link to="/signin" className="navbar__link">
              <Avatar  />
              </Link>
            )}
          </div>
          
        </div>
      </header>
      <aside className={asideCategory ? 'aside-category active' : 'aside-category' }>
        <div className='aside-category__container'>
                {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <p>{errorCategories}</p>
            ) : (
              categories.map((c) => (
                <Link to={`/search/category/${c}`} key={c} className="aside-category__link">
                    {c}
                </Link>
              ))
              
            )}
            </div>
                </aside>
      <aside className={toggle ? 'cart-aside active' : 'cart-aside'}>
        {cartItems.length === 0 ? (
          <div className="cart">
            <button onClick={handleClose}>
              {" "}
              <i className="fa fa-times"></i>{" "}
            </button>

            <strong> Cart is empty </strong>
          </div>
        ) : (
          <div className="cart">
            <div className='dp-flex'>
                    <h1>Cart</h1>
            <button onClick={handleClose}>
              <i className="fa fa-times"></i>{" "}
            </button>
                    </div>
            <TransitionGroup className="cart__container">
              {cartItems.map((item) => (
                 <CSSTransition
                 key={item._id}
                 timeout={500}
                 classNames="comment"
               >
                <CartItems
                key={item._id}
                  item={item}
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                />
                </CSSTransition>
                
              ))}
              </TransitionGroup>
            <div className='dp-flex'>             
                <Link to={'/signin?redirect=shipping'} className='btn btn--green'> Checkout</Link>

            <strong className="cart__total">
              {" "}
              TOTAL : <strong>${totalPrice.toFixed(2)} </strong>
            </strong>
            </div>
          </div>
        )}
        </aside>
      
      <main className={toggle ? 'main active': 'main'}>
        
        <Route path="/signin" component={SigninScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/products" component={ProductsScreen} />
        <Route path="/product/:id" exact component={ProductDetailsScreen} />
        <Route path="/blog" exact component={BlogScreen} />
        <Route path="/blog/:id"  exact component={BlogDetailScreen} />
        <Route path="/shipping" component={ShippingAddressScreen}></Route>
        <Route path="/payment" component={PaymentScreen}></Route>
        <Route path="/placeorder/:payment" component={PlaceOrderScreen}></Route>
        <Route path="/search/name/:name" exact component={SearchScreen} ></Route>
        <AdminRoute path="/blogcreate" component={BlogCreateScreen} />
        <AdminRoute path="/productlist" component={ProductListScreen} ></AdminRoute>
         <AdminRoute path="/product/:id/edit" exact component={ProductEditScreen} ></AdminRoute>
        <AdminRoute path="/blog/:id/edit" component={BlogEditScreen} ></AdminRoute>
        <Route path="/" exact component={HomeScreen} />
      </main>
    </BrowserRouter>
  );
}

export default App;
