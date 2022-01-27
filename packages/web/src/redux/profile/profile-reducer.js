import * as ProfileTypes from "./profile-types";

export const ProfileInitialState = {
  firstName: "Test",
  lastName: "Test lastname",
  image: "",
  email: "email@email.com",
};

const ProfileReducer = (state = ProfileInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ProfileTypes.GET_PROFILE_DATA_REQUEST: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};

export default ProfileReducer;
