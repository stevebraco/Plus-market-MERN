import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bestSellerProducts, lastProducts, listProducts } from "../actions/productActions";
import Banner from "../components/Banner";
import BoxCategory from "../components/BoxCategory";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import FadeIn from 'react-fade-in';
import { settings } from '../helpers/settingsSlider'

import {
  addToCart,
  cartDecrement,
  cartIncrement,
} from "../actions/cartActions";
import CartItems from "../components/CartItems";
import {
  CART_TOGGLE_CLOSE,
  CART_TOGGLE_OPEN,
} from "../constants/cartConstants";
import { listBlogs } from "../actions/blogActions";
import BlogCardScreen from "./BlogCardScreen";

const HomeScreen = () => {
  const [favorites, setFavorites] = useState([]);

  const dispatch = useDispatch();
  // const productBestSeller = useSelector((state) => state.productBestSeller);
  // const {
  //   loading: loadingBestSeller,
  //   products: productsBestSeller,
  //   error: errorBestSeller,
  // } = productBestSeller;

  //SELECTOR
  const cartToggle = useSelector((state) => state.cartToggle);
  const { toggle } = cartToggle;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingList,
    products,
    error: errorList,
  } = productList;

  const BestProducts = products?.sort((a, b) => b.rating - a.rating)


  // const productLast = useSelector((state) => state.productLast);
  // const {
  //   loading: loadingLast,
  //   products: productsLast,
  //   error: errorLast,
  // } = productLast;





  const blogList = useSelector((state) => state.blogList);
  const { loading: loadingBlogs, error: errorBlogs, blogs } = blogList;

  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  cart.totalPrice = totalPrice;

  useEffect(() => {
    const store = JSON.parse(localStorage.getItem("favorites"))
    if (store) {
      setFavorites(store)
    } else {
      setFavorites([])
    }
  }, []);

  useEffect(() => {
    dispatch(listProducts())
    dispatch(lastProducts());
    dispatch(bestSellerProducts());
    dispatch(listBlogs());
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [dispatch, favorites]);

  const addToCartHandler = (item) => {
    const qty = 1;
    dispatch(addToCart(item, qty));
    dispatch({ type: CART_TOGGLE_OPEN });
  };

  // const onClickHeart = (item) => {
  //   const existItem = favorites.find((existItem) => existItem._id === item._id)
  //   if(existItem) {
  //     const deleteItem = favorites.filter((existItem) => existItem._id !== item._id)
  //     setFavorites([...deleteItem])
  //   } else {
  //     const newFavorites = [...favorites, item ]
  //     setFavorites(newFavorites)
  //   }
  // }

  // const handleIncrement = (item) => {
  //   dispatch(cartIncrement(item));
  // };
  // const handleDecrement = (item) => {
  //   dispatch(cartDecrement(item));
  // };
  // const handleClick = () => {
  //   // setClick(!click)
  // };
  // const handleClose = () => {
  //   // setClick(false)
  //   dispatch({ type: CART_TOGGLE_CLOSE });
  // };

  return (
    <FadeIn>
      <section className="home container">
        <div className="home__container">
          <img className="home__img" src="./images/homepage.jpeg" alt="légume" />
          <div className="home__content">
            <h3 className="home__heading">
              active summer with juice milk 300ml
            </h3>
            <span className="home__fresh">
              new arrivals with nature fruits, juice milks, essential for
              summer
            </span>
            <Link to="/" className="btn btn--black">
              shop now
            </Link>
          </div>
        </div>
      </section>
      <section className="banner-container container">
        <Banner heading="special Offer" text={"upto 45% off"} ImgSrc={'./images/banner-3.jpeg'} />
        <Banner heading="limited Offer" text={"upto 50% off"} ImgSrc={'./images/banner-4.jpeg'} />
      </section>

      <section className="category">
        <div className="container">
          <h2 className="heading">
            shop by category
          </h2>
          <Link to="/">
            <h4 className="small-text-grey">
              All category{" "}
              <span>
                <i className="fa fa-chevron-right"></i>
              </span>
            </h4>
          </Link>
          <div className="box-container">
            <BoxCategory
              heading={"vegitables"}
              upto={"upto 50% off"}
              numberImg={7}
            />
            <BoxCategory
              heading={"juice"}
              upto={"upto 44% off"}
              numberImg={8}
            />
            <BoxCategory heading={"meat"} upto={"upto 35% off"} numberImg={5} />
            <BoxCategory
              heading={"fruite"}
              upto={"upto 12% off"}
              numberImg={6}
            />
          </div>
        </div>
      </section>

      {/* <section className="product container">
          <h2 className="heading">
            latest products
          </h2>
          {loadingLast ? (
            <LoadingBox></LoadingBox>
          ) : errorLast ? (
            <p>{errorLast}</p>
          ) : (
            <div className="box-container">
              {productsLast.map((item) => (
                <Product key={item._id} item={item} addToCartHandler={addToCartHandler} />
              ))}
            </div>
          )}
        </section> */}

      <section className="product container">
        <h2 className="heading">
          latest products
        </h2>
        {loadingList ? (
          <LoadingBox></LoadingBox>
        ) : errorList ? (
          <p>{errorList}</p>
        ) : (
          <div className="box-container">
            {products.slice(0, 5).map((item) => (
              <Product key={item._id} item={item} addToCartHandler={addToCartHandler} />
            ))}
          </div>
        )}
      </section>

      <section className="product container">
        <h2 className="heading">
          best products
        </h2>
        {loadingList ? (
          <LoadingBox></LoadingBox>
        ) : errorList ? (
          <p>{errorList}</p>
        ) : (
          <div>
            <Slider {...settings}>
              {BestProducts.map((item) => (
                <Product key={item._id} item={item} addToCartHandler={addToCartHandler} />
              ))}
            </Slider>
          </div>
        )}
      </section>
      <section className='blog'>
        <div className="container">
          <h2>Blog & News</h2>
          <div>
            {loadingBlogs ? (
              <LoadingBox></LoadingBox>
            ) : errorBlogs ? (
              <p> {errorBlogs} </p>
            ) : (
              <div className='blog__container dp-flex'>
                {
                  blogs.slice(0, 2).map((blog) => (
                    <BlogCardScreen key={blog._id} blog={blog} />
                  ))
                }
              </div>
            )}
          </div>
        </div>
      </section>

    </FadeIn>
  );
};

export default HomeScreen;
