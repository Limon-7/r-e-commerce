import React from "react";
import { withRouter } from "react-router-dom";
import "./MenuItem.scss";

function MenuItem({ menuitem, history, match }) {
  return (
    <div
      className={`${menuitem.size} menuItem`}
      onClick={() => history.push(`${match.url}${menuitem.linkUrl}`)}
    >
      <div
        className="menuItem__backgroundImage"
        style={{ backgroundImage: `url(${menuitem.imageUrl})` }}
      />
      <div className="menuItem__content">
        <h1 className="title">{menuitem.title.toUpperCase()}</h1>
        <span className="subtitle">Shop Now</span>
      </div>
    </div>
  );
}
export default withRouter(MenuItem);
