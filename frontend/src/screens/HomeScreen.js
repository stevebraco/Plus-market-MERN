import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bestSellerProducts, lastProducts } from "../actions/productActions";
import Banner from "../components/Banner";
import BoxCategory from "../components/BoxCategory";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import FadeIn from 'react-fade-in';

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
  
  const dispatch = useDispatch();
  const productBestSeller = useSelector((state) => state.productBestSeller);
  const {
    loading: loadingBestSeller,
    products: productsBestSeller,
    error: errorBestSeller,
  } = productBestSeller;

  //SELECTOR
  const cartToggle = useSelector((state) => state.cartToggle);
  const { toggle } = cartToggle;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const productLast = useSelector((state) => state.productLast);
  const {
    loading: loadingLast,
    products: productsLast,
    error: errorLast,
  } = productLast;

  const blogList = useSelector((state) => state.blogList);
  const { loading: loadingBlogs, error: errorBlogs, blogs } = blogList;

  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  cart.totalPrice = totalPrice;

  useEffect(() => {
    dispatch(lastProducts());
    dispatch(bestSellerProducts());
    dispatch(listBlogs());
  }, [dispatch]);

  let settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const addToCartHandler = (item) => {
    const qty = 1;
    dispatch(addToCart(item, qty));
    dispatch({ type: CART_TOGGLE_OPEN });
  };

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
             <img className="home__img" src="./images/plats-salad.jpeg" alt="légume"/>
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
          <Banner heading="special Offer" text={"upto 45% off"} numberImg={1} />
          <Banner heading="limited Offer" text={"upto 50% off"} numberImg={2} />
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

        <section className="product container">
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
        </section>

        <section className="product container">
          <h2 className="heading">
            best products
          </h2>
          {loadingBestSeller ? (
            <LoadingBox></LoadingBox>
          ) : errorBestSeller ? (
            <p>{errorBestSeller}</p>
          ) : (
            <div>
              <Slider {...settings}>
                {productsBestSeller.map((item) => (
                  <Product key={item._id} item={item} addToCartHandler={addToCartHandler} />
                ))}
              </Slider>
            </div>
          )}
        </section>
        <section className='blog'>
          <div className="container">
          <h2>Health Daily</h2>
        <div>
        {loadingBlogs ? (
          <LoadingBox></LoadingBox>
        ) : errorBlogs ? (
          <p> {errorBlogs} </p>
        ) : (
          <div className='blog__container dp-flex'>
            {
              blogs.slice(0,2).map((blog) => (
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
