import React from 'react'
import { Link } from "react-router-dom";
import Stars from './Stars';


const Product = ({item, addToCartHandler}) => {

    
    
    return (
        <div key={item._id} className="box product__box">
              <div className="product__icons">
                  <Link  className='product__link' to='/'><i className="fa fa-heart"></i> </Link>
              </div>
              <Link to={`/product/${item._id}`}>
              <img src={item.image} alt={item.name} className="product__img" />
              <h3 className="product__heading"> {item.name} </h3>
              </Link>
              <Stars rating={item.rating}/>
              <strong className="product__price">$ {item.price.toFixed(2)}</strong>
              <div className='product__cart'>
                  {item.countInStock === 0 ? <span className='alert alert-danger'>out of stock </span> :  <button onClick={() => addToCartHandler(item)} className='add-to-cart' ><i className="fa fa-plus-circle"></i></button>
 }
              </div>
          </div> 
    )
}

export default Product
