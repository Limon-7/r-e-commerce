import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import {
  selectCollectionsFetching,
  fetechCollectionsStartAsync,
  selectCollectionsLoaded,
} from "../../redux";

import { CollectionOverview, Spinner } from "../../components";
import CollectionPage from "../CollectionPage/CollectionPage";

import "./ShopPage.scss";
// create spinner
const CollectionOverviewWithSpinner = Spinner(CollectionOverview);
const CollectionPageWithSpinner = Spinner(CollectionPage);
// end of spinner

function ShopPage(props) {
  const dispatch = useDispatch();
  const isFecting = useSelector((state) => selectCollectionsFetching(state));
  const isLoaded = useSelector((state) => selectCollectionsLoaded(state));
  useEffect(() => {
    dispatch(fetechCollectionsStartAsync());
  }, [dispatch]);
  return (
    <div className="shopPage">
      <Route
        exact
        path={`${props.match.path}`}
        render={(props) => (
          <CollectionOverviewWithSpinner loading={isFecting} {...props} />
        )}
      />
      <Route
        path={`${ROUTES.SHOP}/:catagoryId`}
        render={(props) => (
          <CollectionPageWithSpinner loading={!isLoaded} {...props} />
        )}
      />
    </div>
  );
}

export default ShopPage;
