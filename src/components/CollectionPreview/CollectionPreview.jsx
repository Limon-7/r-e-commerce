import React from "react";
import { CollectionItem } from "..";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import "./CollectionPreview.scss";
export function CollectionPreview({ title, items }) {
  return (
    <div className="collection-preview">
      <Link to={`${ROUTES.SHOP}/${title.toLowerCase()}`}>
        <h1 className="title">{title.toUpperCase()}</h1>
      </Link>
      <div className="preview">
        {items
          .filter((item, index) => index < 4)
          .map((item, ...otherProps) => (
            <CollectionItem key={item.id} item={item} {...otherProps} />
          ))}
      </div>
    </div>
  );
}
