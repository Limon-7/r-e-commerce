import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { selectBasketItems, toggleCartHidden } from "../../redux";
import * as ROUTES from "../../constants/routes";

import { CartItem, CustomButton } from "..";

import "./CartDropdown.scss";
function CartDropdown(props) {
  const cartItemsWithHook = useSelector((state) => selectBasketItems(state));
  const history = useHistory();
  const dispatch = useDispatch();
  // console.log("props", props);
  // console.log("history", history);
  // console.log("cartItemsWithHook:", cartItemsWithHook);
  return (
    <div className="cartDropdown">
      <div className="cartDropdown__items">
        {cartItemsWithHook.length ? (
          cartItemsWithHook.map((item) => (
            <CartItem key={item.id} item={item} />
          ))
        ) : (
          <span className="cartDropdown__empty">Your cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          history.push(ROUTES.CHECKOUT);
          dispatch(toggleCartHidden());
        }}
      >
        Go To CheckOut
      </CustomButton>
    </div>
  );
}

export default CartDropdown;

/*
import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";

import { selectBasketItems, toggleCartHidden } from "../../redux";
import * as ROUTES from "../../constants/routes";

import { CartItem, CustomButton } from "..";

import "./CartDropdown.scss";
function CartDropdown(props) {
  console.log("props", props);
  const { cartItems } = props;
  console.log("history", history);
  return (
    <div className="cartDropdown">
      <div className="cartDropdown__items">
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <span className="cartDropdown__empty">Your cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          history.push(ROUTES.CHECKOUT);
          dispatch(toggleCartHidden());
        }}
      >
        Go To CheckOut
      </CustomButton>
    </div>
  );
}
const mapStateToProps = (state) => ({
  cartItems: selectBasketItems(state),
});
export default withRouter(connect(mapStateToProps)(CartDropdown));
 */
