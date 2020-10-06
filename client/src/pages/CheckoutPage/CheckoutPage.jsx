import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectBasketItems, selectBasketTotal } from "../../redux";

import { CheckoutItem, StripeButton } from "../../components";

import "./CheckoutPage.scss";
import { Link } from "react-router-dom";
function CheckoutPage(props) {
  const { basket, total } = props;
  if (basket.length === 0) {
    return (
      <div className="basket_empty">
        {" "}
        <h1>Your basket is empty</h1>
        <Link to="/shop">Go to shop page</Link>
      </div>
    );
  }
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {basket.map((item) => (
        <CheckoutItem key={item.id} item={item} />
      ))}
      <div className="total">TOTAL: ${total}</div>
      <div className="stripe_button">
        <StripeButton price={total} />
      </div>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  basket: selectBasketItems,
  total: selectBasketTotal,
});
export default connect(mapStateToProps)(CheckoutPage);
