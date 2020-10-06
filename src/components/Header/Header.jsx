import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { doSignOut } from "../../utils/Firebase";

import { CartDropdown, CartIcon } from "..";

import "./Header.scss";
import { selectCurrentUser, selectHidden } from "../../redux";
function Header({ currentUser, hidden }) {
  return (
    <div className="header">
      <Link to={ROUTES.HOME} className="logo-container">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to={ROUTES.SHOP}>
          SHOP
        </Link>
        <Link className="option" to={ROUTES.CONTACT}>
          CONTACT
        </Link>
        {currentUser ? (
          <div className="option" onClick={doSignOut}>
            SIGNOUT
          </div>
        ) : (
          <Link className="option" to={ROUTES.SIGNINSIGNUP}>
            SIGNIN
          </Link>
        )}

        <CartIcon />
      </div>
      {hidden ? null : <CartDropdown />}
    </div>
  );
}
const mapStateToProps = (state) => {
  // console.log("state", state);
  return {
    currentUser: selectCurrentUser(state),
    hidden: selectHidden(state),
  };
};
export default connect(mapStateToProps, null)(Header);
