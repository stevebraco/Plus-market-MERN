import React from 'react'
import { useSelector } from 'react-redux';

const CartItems = ({item, handleIncrement, handleDecrement}) => {

    const cart = useSelector((state) => state.cart);
  const { cartItems } = cart

  

    return (
        <>
        <div className='cart-item' >
            <div className='dp-flex align-center'>
                <p className='cart-item__name'> {item.name} </p>
                <img className='img__small' src={item.image} alt={item.name} />
                </div>
                <div className="cart-item__quantity dp-flex">
                    <strong className='cart-item__price'>${item.price.toFixed(2)}</strong>
                    <div>
                <button onClick={() => handleDecrement(item._id)} >-</button>  
                <span className='cart-item__qty'> {item.quantity} </span>
                <button onClick={() => handleIncrement(item._id)} >+</button>
                </div>
                </div>
        </div>
        </>
    )
}

export default CartItems
