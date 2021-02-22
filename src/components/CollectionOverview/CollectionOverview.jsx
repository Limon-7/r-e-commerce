import React from "react";
import { useSelector } from "react-redux";
import { selectCollectionsForPreview } from "../../redux";
import { CollectionPreview } from "..";

import "./CollectionOverview.scss";
function CollectionOverview() {
  const collections = useSelector((state) =>
    selectCollectionsForPreview(state)
  );
  console.log("collection overview:", collections);
  return (
    <div className="collectionOverview">
      {collections.map(({ id, ...otherCollections }) => (
        <CollectionPreview key={id} {...otherCollections} />
      ))}
    </div>
  );
}

export default CollectionOverview;
