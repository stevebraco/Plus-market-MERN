import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route} from "react-router-dom";
import { Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SigninScreen from "./screens/SigninScreen";
import AdminRoute from "./components/AdminRoute";
import ProductsScreen from "./screens/ProductsScreen";
import { cartDecrement, cartIncrement } from "./actions/cartActions";
import BlogDetailScreen from "./screens/BlogDetailScreen";
import BlogCreateScreen from "./screens/BlogCreateScreen";
import ProductFavoritesScreen from "./screens/ProductFavoritesScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import BlogScreen from "./screens/BlogScreen";
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
import TestScreen from "./screens/TestScreen";
import NavBar from "./components/NavBar";

function App(props) {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')));
  
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const toggleCart = useSelector((state) => state.cartToggle);
  const { toggle } = toggleCart;

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
    dispatch({ type: CART_TOGGLE_CLOSE });
  }
  
  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  cart.totalPrice = totalPrice;

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
        <NavBar />
      </header>
      
      <aside className={toggle ? 'cart-aside active' : 'cart-aside'}>
          <div className="cart">
            <div className='dp-flex col cart__wrapper'>
              <div className='dp-flex'>
                    <h1>Cart</h1>
            <button className='btn btn--back' onClick={handleClose}>
              continue shopping
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
                    </div>
            <div className='cart__checkout dp-flex'>             
                <Link onClick={handleCheckout} to={'/signin?redirect=shipping'} className='btn btn--green'> Checkout</Link>
            <strong className="cart__total">
              TOTAL : <strong>${totalPrice.toFixed(2)} </strong>
            </strong>
            </div>
          </div>

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
        <Route path="/favoriteslist" component={ProductFavoritesScreen} ></Route>
        <AdminRoute path="/blogcreate" component={BlogCreateScreen} />
        <AdminRoute path="/productlist" component={ProductListScreen} ></AdminRoute>
         <AdminRoute path="/product/:id/edit" exact component={ProductEditScreen} ></AdminRoute>
        <AdminRoute path="/blog/:id/edit" component={BlogEditScreen} ></AdminRoute>
        <Route path="/test" exact component={TestScreen} />
        <Route path="/" exact component={HomeScreen} />
      </main>
    </BrowserRouter>
  );
}

export default App;
