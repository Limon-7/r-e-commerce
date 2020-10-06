import { createSelector } from "reselect";
// action types

const TOGGLE_CART_HIDDEN = "TOGGLE_CART_HIDDEN";
const ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART";
const DELETE_ITEM_FROM_CART = "DELETE_ITEM_FROM_CART";
const REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART";
const RESET_CART = "RESET_CART";

// action creator
export const toggleCartHidden = () => ({
  type: TOGGLE_CART_HIDDEN,
});
export const addItemToCart = (item) => ({
  type: ADD_ITEM_TO_CART,
  payload: item,
});
export const deleteItemFromCart = (item) => ({
  type: DELETE_ITEM_FROM_CART,
  payload: item,
});
export const removeItemFromCart = (item) => ({
  type: REMOVE_ITEM_FROM_CART,
  payload: item,
});

export const resetCart = () => ({
  type: RESET_CART,
});
// end of action creators

const INITIAL_STATE = {
  hidden: true,
  basket: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_CART_HIDDEN: {
      return {
        ...state,
        hidden: !state.hidden,
      };
    }
    case ADD_ITEM_TO_CART: {
      return {
        ...state,
        basket: addItem(state.basket, action.payload),
      };
    }
    case DELETE_ITEM_FROM_CART: {
      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.payload.id),
      };
    }
    case REMOVE_ITEM_FROM_CART: {
      return {
        ...state,
        basket: removeItem(state.basket, action.payload),
      };
    }
    case RESET_CART: {
      return {
        ...state,
        basket: [],
      };
    }
    default:
      return state;
  }
};

// custom function
const addItem = (basket, addItemToBasket) => {
  const existingItem = basket.find((item) => item.id === addItemToBasket.id);
  if (existingItem) {
    return basket.map((item) =>
      item.id === addItemToBasket.id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );
  }
  return [...basket, { ...addItemToBasket, quantity: 1 }];
};
const removeItem = (basket, removeItemFromBasket) => {
  const existing = basket.find((item) => item.id === removeItemFromBasket.id);
  if (existing.quantity === 1) {
    return basket.filter((item) => item.id !== removeItemFromBasket.id);
  }
  return basket.map((item) =>
    item.id === removeItemFromBasket.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};
// end of custom function

/* reslect */
const selectBasket = (state) => state.cart;
export const selectBasketItems = createSelector(
  [selectBasket],
  (item) => item.basket
);
export const selectHidden = createSelector(
  [selectBasket],
  (cartHidden) => cartHidden.hidden
);
export const selectBasketCount = createSelector(
  [selectBasketItems],
  (basketItems) =>
    basketItems.reduce(
      (accumultedQuantity, item) => accumultedQuantity + item.quantity,
      0
    )
);

export const selectBasketTotal = createSelector(
  [selectBasketItems],
  (basketItems) =>
    basketItems.reduce(
      (accumultedQuantity, item) =>
        accumultedQuantity + item.quantity * item.price,
      0
    )
);
/* end of reslect */

export default cartReducer;
