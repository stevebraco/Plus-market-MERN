import React, { useState } from "react";
import { AiFillPropertySafety } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod, saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import Order from "../components/Order";

const ShippingAddressScreen = (props) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const cart = useSelector((state) => state.cart);
  const {shippingAddress} = cart

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [number, setNumber] = useState(shippingAddress.number);

  const dispatch = useDispatch();

  //Payment 
  const [paymentMethod, setPaymentMethod] = useState(" ");
  const [errMsg, setErrMsg] = useState(false);

  const isPayment = paymentMethod === " " || paymentMethod === " "
  console.log(isPayment);

  if (!userInfo) {
    props.history.push("/signin");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    if(paymentMethod === " " || paymentMethod === " ") {
      setErrMsg(true)
    } else {
      dispatch(saveShippingAddress({ fullName, address, city, postalCode, country, number, paymentMethod }));
      dispatch(savePaymentMethod(paymentMethod));
      props.history.push(`/placeorder/${paymentMethod}`)
    }


  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
    <section className='container'>
    <div className='orderShip__container dp-flex just-center'>
    <div className='container__form container__form--ship'>
    <h2 className='heading'>Shipping</h2>
      <form className="form" onSubmit={submitHandler}>
        <div className="form__group">
          <label htmlFor="fullname">full name</label>
          <input
            type="text"
            placeholder="Enter Full Name"
            id="fullname"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            autoFocus
          />
        </div>
        <div className="form__group">
          <label htmlFor="adress">address</label>
          <input
            type="text"
            placeholder="Enter Address"
            id="adress"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="city">city</label>
          <input
            type="text"
            placeholder="Enter City"
            id="city"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="form__group">
          <label htmlFor="postalcode">postal code</label>
          <input
            type="text"
            placeholder="Enter Postal Code"
            id="postalcode"
            required
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>

        <div className="form__group">
          <label htmlFor="country">country</label>
          <input
            type="text"
            placeholder="Enter Country"
            id="country"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="number">Phone</label>
          <input
            type="text"
            placeholder="Enter Number"
            id="number"
            required
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <button className="btn btn--back" type="submit">
          Continue
        </button>
      </form>
      </div>
      <div>
      <Order />
      <div className='payment'>
        <h2 className="heading">select payment</h2>
        <div>
        <div>
            <input
              type="radio"
              id="paypal"
              value="paypal"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="paypal"> Paypal</label>
          </div>
          <div>
            <input
              type="radio"
              id="stripe"
              value="stripe"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="stripe"> Stripe</label>
          </div>
          {errMsg && <div className='alert alert-danger'>Select your payment</div>}
        </div>
      </div>
      </div>
      </div>
      </section>
    </div>
  );
};

export default ShippingAddressScreen;
