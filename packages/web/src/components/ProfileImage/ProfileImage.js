import React from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";
import { getCurrentUserPhoto } from "../../services/auth";

function ProfileImage() {
  const { currentUser } = useSelector(authSelector);
  const { image } = currentUser;
  const imageURl = image || getCurrentUserPhoto() || getRandomePhoto();

  function getRandomePhoto() {
    return "https://picsum.photos/seed/picsum/50/50";
  }

  return (
    <div>
      <img
        className="mr-auto ml-auto"
        src={imageURl}
        alt="test"
        width="auto"
        height="auto"
      />
    </div>
  );
}

export default ProfileImage;
