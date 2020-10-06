import React from "react";
import { connect } from "react-redux";
import {
  addItemToCart,
  deleteItemFromCart,
  removeItemFromCart,
} from "../../redux";

import "./CheckoutItem.scss";
function CheckoutItem({ item, deleteItemFromCart, addItem, removeItem }) {
  const { imageUrl, name, quantity, price } = item;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => removeItem(item)}>
          &#10094;
          <p>decrese</p>
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItem(item)}>
          &#10095;
          <p>increase</p>
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={() => deleteItemFromCart(item)}>
        &#10005;
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    deleteItemFromCart: (item) => dispatch(deleteItemFromCart(item)),
    addItem: (item) => dispatch(addItemToCart(item)),
    removeItem: (item) => dispatch(removeItemFromCart(item)),
  };
};
export default connect(null, mapDispatchToProps)(CheckoutItem);
