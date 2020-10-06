/* import React from "react";
import { useSelector } from "react-redux";
import { selectShopCollection } from "../../redux";

import "./CollectionPage.scss";
function CollectionPage(props) {
  const collection = useSelector((state) =>
    selectShopCollection(props.match.params.catagoryId)(state)
  );
  console.log("collection", collection);
  return (
    <div className="collectionPage">
      <h1>CollectionPage</h1>
    </div>
  );
}

export default CollectionPage; */

// using mapstatetoProps
import React from "react";
import { connect } from "react-redux";
import { CollectionItem } from "../../components";
import { selectShopCollection } from "../../redux";

import "./CollectionPage.scss";
function CollectionPage({ collection }) {
  const { title, items } = collection;
  return (
    <div className="collectionPage">
      <h2 className="title">{title}</h2>
      <div className="collectionPage__items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
const mapStateToProps = (state, props) => ({
  collection: selectShopCollection(props.match.params.catagoryId)(state),
});
export default connect(mapStateToProps)(CollectionPage);
