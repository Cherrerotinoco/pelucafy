import * as AuthTypes from "./profile-types";
import * as auth from "../../services/auth";

export const getUserProfileDataRequest = () => ({
  type: AuthTypes.GET_PROFILE_DATA_REQUEST,
});

export function updateUserProfile(formData) {
  console.log(formData);
}

export function getUserProfileData() {
  return async function getUserProfileDataRequestThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      // return dispatch(signOutSuccess());
    }

    /*
    const response = await api.({
      Authorization: `Bearer ${token}`,
    });
    */

    dispatch(getUserProfileDataRequest());
    return null;
  };
}
