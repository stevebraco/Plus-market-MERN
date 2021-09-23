import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../actions/cartActions';
import { filterProduct, listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import Product from '../components/Product';
import FadeIn from "react-fade-in";
import { CART_TOGGLE_OPEN } from '../constants/cartConstants';


const ProductAllScreen = () => {
  const [click, setClick] = useState(false);
  const [clickMenu, setClickMenu] = useState('All');

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  console.log(products);

  const productFilter = useSelector((state) => state.productFilter);
  const { productsFilter } = productFilter;
  console.log(productsFilter);


  const menuProducts = ['All', ...new Set(products?.map((product) => product.category))]

  const cartToggle = useSelector((state) => state.cartToggle);
  const { toggle } = cartToggle;

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  const addToCartHandler = (item) => {
    const qty = 1;
    dispatch(addToCart(item, qty));
    // setClick(true);
    dispatch({ type: CART_TOGGLE_OPEN });
  };

  const handleFilterMenu = (menu) => () => {
    const filterProducts = products.filter((product) => product.category === menu)
    dispatch(filterProduct(filterProducts));
    if (menu === 'All') {
      dispatch(filterProduct(products));
    }
    setClickMenu(menu)
  }
  return (
    <FadeIn>
      <section className="product container">
        <h1 className="heading-center">
          all products
        </h1>
        <div className='product__menu__container'>
        {menuProducts.map((menu, index) => <button className={ menu === clickMenu ? 'product__menu active' : 'product__menu' } onClick={handleFilterMenu(menu)} key={index}> {menu} </button>)}
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="box-container">
            {productsFilter.length === 0 ? (
              <>
                {products.map((item) => (
                  <Product key={item._id} item={item} addToCartHandler={addToCartHandler} />
                ))}
              </>
            ) : (
              <>
                {productsFilter.map((item) => (
                  <Product key={item._id} item={item} addToCartHandler={addToCartHandler} />
                ))}
              </>
            )
            }
          </div>
        )}
      </section>
    </FadeIn>
  )
}

export default ProductAllScreen
