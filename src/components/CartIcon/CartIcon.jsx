import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { ReactComponent as ShoppingBag } from "../../assets/shoppingBag.svg";
import { selectBasketCount, toggleCartHidden } from "../../redux";
import "./CartIcon.scss";
function CartIcon({ toggleCartHidden, count }) {
  return (
    <div className="cartIcon" onClick={toggleCartHidden}>
      <ShoppingBag className="cartIcon__shoppingIcon" />
      <span className="cartIcon__itemCount">{count}</span>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});
const mapStateToProps = createStructuredSelector({
  count: selectBasketCount,
});

// const mapStateToProps = (state) => {
//   return {
//     count: selectBasketCount(state),
//   };
// };
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
