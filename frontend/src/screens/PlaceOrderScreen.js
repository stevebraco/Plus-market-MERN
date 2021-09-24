import React from 'react'
import { useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import Order from '../components/Order'

const PlaceOrderScreen = (props) => {
    const payment = props.match.params.payment
    const storePayment = JSON.parse(localStorage.getItem('shippingAddress')).paymentMethod
    console.log(payment, storePayment);

   

    const cart = useSelector(state => state.cart)
    const {paymentMethod, shippingAddress, cartItems, totalPrice} = cart
    if(storePayment !== payment) {
        props.history.push('/shipping')
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
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
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
      <p className='order__method'> <strong>Method: </strong> {cart.paymentMethod || payment} </p>
      </div>
      </div>
      <Order />
      </div>

        </>
    )
}

export default PlaceOrderScreen
