import { createSelector } from "reselect";
import { directoryData } from "../../constants/directoryData";

const Initial_State = directoryData;

const directoryReducer = (state = Initial_State, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default directoryReducer;

/* selector */
const selectDirectory = (state) => state.directory;

export const selectDirectorySections = createSelector(
  [selectDirectory],
  (directory) => directory.sections
);
