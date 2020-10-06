import { createSelector } from "reselect";

// type
export const UserActionTypes = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};
const InitialState = {
  currentUser: null,
};
// action
export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});
// reducer
const userReducer = (state = InitialState, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER: {
      return { ...state, currentUser: action.payload };
    }
    default:
      return state;
  }
};

/* selector */
const selectUser = (state) => state.user;
export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export default userReducer;
