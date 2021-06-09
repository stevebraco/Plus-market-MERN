import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../actions/cartActions';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import Product from '../components/Product';
import FadeIn from "react-fade-in";
import { CART_TOGGLE_OPEN } from '../constants/cartConstants';


const ProductAllScreen = () => {
  const [click, setClick] = useState(false);

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;   

    const cartToggle = useSelector((state) => state.cartToggle);
  const { toggle } = cartToggle;

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    console.log(products);
    const addToCartHandler = (item) => {
    const qty = 1;
    dispatch(addToCart(item, qty));
    // setClick(true);
    dispatch({ type: CART_TOGGLE_OPEN });
  };
     return (
       <FadeIn>
       <section className="product container">
          <h1 className="heading">
           all products
          </h1>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error? (
            <p>{error}</p>
          ) : (
            <div className="box-container">
              {products.map((item) => (
                <Product key={item._id} item={item} addToCartHandler={addToCartHandler} />
              ))}
            </div>
          )}
        </section>
        </FadeIn>
    )
}

export default ProductAllScreen
