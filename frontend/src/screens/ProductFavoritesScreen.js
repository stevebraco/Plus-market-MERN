import React from 'react'
import Product from '../components/Product';

const ProductFavoritesScreen = () => {
 const product =  JSON.parse(localStorage.getItem('favorites'))
 console.log(product);
  return (
    <div className="box-container">
              {product.map((item) => console.log(item.item))
            }
    </div> 
  )
}

export default ProductFavoritesScreen
