import { createSelector } from "reselect";

export const selectProfileState = (state) => state.profile;

export const profileSelector = createSelector(
  [selectProfileState],
  (profile) => profile,
);
