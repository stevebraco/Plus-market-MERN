import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import FadeIn from "react-fade-in";
import Stars from "../components/Stars"
import { addToCart } from "../actions/cartActions";
import { CART_TOGGLE_OPEN } from "../constants/cartConstants";
import {FaShuttleVan, FaLeaf} from 'react-icons/fa'
import {ImLoop2} from 'react-icons/im'

const ProductDetailsScreen = (props) => {
  const productId = props.match.params.id;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = (item) => {
    const qty = 1;
    dispatch(addToCart(item, qty));
    dispatch({ type: CART_TOGGLE_OPEN });
  };


  return (
    <FadeIn>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <p> {error} </p>
      ) : (
        <section className="productDetails container">
          <h2>{product.name} </h2>
          <div className='productDetails__info'>
            <Stars rating={product.rating} />
            <span className='txt-gr'>4 customer reviews</span>
            <p> <strong> REF: </strong> <span className="txt-gray"> {product._id}</span></p>
          </div>
          <div className='productDetails__container'></div>
            <div className='productDetails__figure'>
              <img className='img__large' src={product.image} alt={product.name} />
            </div>
            <div className='productDetails__description'>
              <strong className="price price--big"> ${product.price.toFixed(2)} </strong>
              {product.countInStock > 1 ? 
              <div className="alert alert-success"> <strong>Availability:</strong> {product.countInStock} in stock </div>
              :
              <div className="alert alert-danger"> <strong>out of stock</strong> </div>
              }
              <ul>
                <li>Type: {product.category} </li>
                <li>MFG: Jun 4,2020  </li>
                <li>LiFE: 30 days  </li>
              </ul>
              <div>
                <button onClick={() => addToCartHandler(product)} className='btn btn--back' >add to cart</button>
              </div>
              <div className='productDetails__desc'>
                <div><strong>Brand:</strong> <span className="txt-gray">PlusMarket</span> </div>
                <div><strong>Vendor:</strong> <span className="txt-gray">Market company</span> </div>
                <div><strong>Categories:</strong> <span className="txt-gray"> {product.category} </span> </div>
                <div><strong>Tags:</strong> <span className="txt-gray">meat, organic, food, healthy</span> </div>
              </div>
            </div>
            <div>
              <div className='free-ship'>
              <div className='free-ship__container'>
               <span className='free-ship__icon'><FaShuttleVan /></span> <strong>Free Shipping</strong> apply to all orders over $100
              </div>
              <div className='free-ship__container'>
              <span className='free-ship__icon'><FaLeaf /> </span> Guranteed <strong>100% organic</strong> from natual farms
              </div>
              <div className='free-ship__container border'>
              <span className='free-ship__icon'><ImLoop2 /> </span> <strong> 1 day returns </strong> if you change your mind
              </div>
            <div className='free-ship__container'>
              <strong>hotline order :</strong> <span>Free 7:00 - 21:30</span>
             <div> <span>970 988 - 0896221</span></div>
              <span>970 988 - 08965421</span>
            </div>
            </div>
            </div>
          </section>
        )}
        </FadeIn>
  );
};

export default ProductDetailsScreen;
