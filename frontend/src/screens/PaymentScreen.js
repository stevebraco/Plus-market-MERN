import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentMethodScreen(props) {
  // const userSignin = useSelector((state) => state.userSignin); // Savoir si l'utilisateur est connect ou pas
  // const { userInfo } = userSignin;
  // if (!userInfo) {
  //   props.history.push("/signin");    // A METTRE OU PAS
  // }
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    //on appelle le créateur d'action pour créer une action, que l'on dispatch
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push(`/placeorder/${paymentMethod}`);
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="paypal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="paypal"> Paypal</label>
          </div>
        </div>

        <div>
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
        </div>
        <button className="btn btn--back" type="submit">
          Continue
        </button>
      </form>
    </div>
  );
}