import React from 'react'
import { useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'

const PlaceOrderScreen = (props) => {
    const payment = props.match.params.payment

    const cart = useSelector(state => state.cart)
    const {paymentMethod, shippingAddress, cartItems, totalPrice} = cart
    if(!paymentMethod) {
        props.history.push('/payment')
    }
    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice( cartItems.reduce((a, c) => a + c.quantity * c.price, 0) )
    //Shipping
    cart.shippingPrice = totalPrice > 100 ? toPrice(0) : toPrice(10);
    //TaxPrice
    cart.taxPrice = toPrice(0.15 * totalPrice)
    //BigPrice
    cart.bigPrice = totalPrice + cart.shippingPrice + cart.taxPrice
   
    return (
        <>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className='container dp-flex'> 
      <div className='order__shipping'>
      <div>
      <h2 className="heading">Shipping</h2>
      <p className='order__name' > <strong>Name: </strong> {shippingAddress.fullName} </p>
      <p className='order__address' > <strong>Address: </strong> {shippingAddress.address} </p>
      <p className='order__postalCode' > <strong>Postal Code: </strong> {shippingAddress.postalCode} </p>
      <p className='order__city' > <strong>City: </strong> {shippingAddress.city} </p>
      <p className='order__country' > <strong>Country: </strong> {shippingAddress.country} </p>
      <p className='order__country' > <strong>Phone: </strong> {shippingAddress.number} </p>
      </div>
      <div>
      <h2 className="heading">Payment</h2>
      <p className='order__method'> <strong>Method: </strong> {cart.paymentMethod} </p>
      </div>
      </div>
      <div className='order__summary'>
      <h2 className="heading">Order Summary</h2>

          {
              cartItems.map((item) => (
                  <div className='dp-flex'>
                      <div className='dp-flex'>
                      <img className='img__small' src={item.image} alt="" srcset="" />
                      <div>
                <p className='cart-item__name'> {item.name} </p>
                <strong className='cart-item__price'>${item.price.toFixed(2)}</strong>
                </div>
                </div>
                <span className='cart-item__qty'> {item.quantity} </span>
                  </div>
              ))
          }

          <p> Price <strong> {totalPrice.toFixed(2)}</strong> </p>
          <p> Shipping <strong> {cart.shippingPrice} </strong> </p>
          <p> Tax Price <strong> {cart.taxPrice} </strong> </p>
     <p> Total Price <strong> {cart.bigPrice.toFixed(2)} </strong> </p>     
      </div>
      </div>

        </>
    )
}

export default PlaceOrderScreen
