import { createSelector } from "reselect";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../utils/Firebase";

const FETCH_COLLECTIONS_START = "FETCH_COLLECTIONS_START";
const FETCH_COLLECTIONS_SUCCESS = "FETCH_COLLECTIONS_SUCCESS";
const FETCH_COLLECTIONS_FAILURE = "FETCH_COLLECTIONS_FAILURE";

// actions
export const fetchCollectionStart = () => {
  return {
    type: FETCH_COLLECTIONS_START,
  };
};
export const fetchCollectionSuccess = (item) => ({
  type: FETCH_COLLECTIONS_SUCCESS,
  payload: item,
});
export const fetchCollectionFailure = (errorMessage) => {
  return {
    type: FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage,
  };
};
// end actions
const INITIAL_STATE = {
  collections: null,
  isFetching: false,
  errorMessage: undefined,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COLLECTIONS_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case FETCH_COLLECTIONS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        collections: action.payload,
      };
    }
    case FETCH_COLLECTIONS_FAILURE: {
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    }
    default:
      return state;
  }
};

export default shopReducer;

/* selector */

const selectShop = (state) => state.shop;
export const selectShopCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);
export const selectCollectionsForPreview = createSelector(
  [selectShopCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);
export const selectShopCollection = (urlParam) =>
  createSelector([selectShopCollections], (collections) =>
    collections ? collections[urlParam] : null
  );
export const selectCollectionsFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);
export const selectCollectionsLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.collections
);
// end of selector
//async redux-thun
export const fetechCollectionsStartAsync = () => {
  return (dispatch) => {
    dispatch(fetchCollectionStart());
    const collectionsRef = firestore.collection("collections");
    collectionsRef
      .get()
      .then((snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionSuccess(collectionsMap));
      })
      .catch((error) => dispatch(fetchCollectionFailure(error.message)));
  };
};
