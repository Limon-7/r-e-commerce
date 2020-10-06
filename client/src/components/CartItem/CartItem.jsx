import React from "react";

import "./CartItem.scss";
function CartItem(props) {
  const {
    item: { name, price, quantity, imageUrl },
  } = props;
  return (
    <div className="cart-item">
      <img src={imageUrl} alt={name} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity}x${price}
        </span>
      </div>
    </div>
  );
}

export default CartItem;
