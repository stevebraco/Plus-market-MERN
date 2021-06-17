import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingAddressScreen = (props) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [number, setNumber] = useState(shippingAddress.number);

  const dispatch = useDispatch();

  if (!userInfo) {
    props.history.push("/signin");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country, number })
    );

    props.history.push('/payment')
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1 className="heading">Shipping</h1>
        </div>
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
  );
};

export default ShippingAddressScreen;
