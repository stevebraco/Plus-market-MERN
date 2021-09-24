import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Order = () => {
  let history = useHistory();

  const cart = useSelector((state) => state.cart);
  const {cartItems, totalPrice} = cart

  const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice( cartItems.reduce((a, c) => a + c.quantity * c.price, 0) )
    //Shipping
    cart.shippingPrice = totalPrice > 100 ? toPrice(0) : toPrice(10);
    //TaxPrice
    cart.taxPrice = toPrice(0.15 * totalPrice)
    //BigPrice
    cart.bigPrice = totalPrice + cart.shippingPrice + cart.taxPrice

    if(totalPrice === 0 ) {
      history.push("/")
    }

  return (
    <div className='order'>
            <h2 className='heading'>Your order</h2>
            <div className='dp-flex'>
              <h3>product</h3>
              <h3>total</h3>
            </div>
            <div className='order__container'>
          {
              cartItems.map((item) => (
                  <div className='order__item'>
                      <div className='dp-flex'>
                        <div className='dp-flex'>
                <p className='order__name'> {item.name} </p>
                <strong className='order__qty txt-gr'> (x{item.quantity}) </strong>
                </div>
                <strong className='order__price'>${item.price.toFixed(2)}</strong>
                </div>
                  </div>
              ))
          }
</div>
        <div className='order__prices'>
          <div className='dp-flex'> SubTotal <strong className='order__bigPrice'> $ {totalPrice.toFixed(2)}</strong> </div>
          <div className='dp-flex'> Shipping <strong className='order__bigPrice'> {totalPrice > 100 ? 'Free' : `$ ${cart.shippingPrice}`} </strong> </div>
          <div className='dp-flex'> Tax Price <strong className='order__bigPrice'> $ {cart.taxPrice} </strong> </div>
          <div className='dp-flex'> Total Price <strong className='order__bigPrice'> $ {cart.bigPrice.toFixed(2)} </strong> </div> 
          </div> 
          </div>
  )
}

export default Order
