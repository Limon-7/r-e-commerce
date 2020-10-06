import React from "react";
// import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

import "./StripeButton.css";
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux";
function StripeButton({ price }) {
  const priceForStripe = price * 88.4;
  const dispatch = useDispatch();
  const publishablekey =
    "pk_test_51HFNDmAijnAOz4v0oz9DxmIRWq13Mqoht7CLg19sCW25FPBNpfWJWDw9wyUTfo8hHOb0ep8Pwvx3jF2s7ESjEwTw00Qpz2ZyA0";

  const onToken = (token) => {
    dispatch(resetCart());
    console.log("Order is successfull");

    // axios({
    //   url: "payment",
    //   method: "post",
    //   data: {
    //     amount: priceForStripe,
    //     token: token,
    //   },
    // })
    //   .then((response) => {
    //     alert("succesful payment");
    //   })
    //   .catch((error) => {
    //     console.log("Payment Error: ", error);
    //     alert(
    //       "There was an issue with your payment! Please make sure you use the provided credit card."
    //     );
    //   });
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="O-shop"
      shippingAddress
      billingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={` Your Total is $${price}`}
      amount={priceForStripe}
      pannelLabel="Pay Now"
      token={onToken}
      stripeKey={publishablekey}
    />
  );
}

export default StripeButton;
