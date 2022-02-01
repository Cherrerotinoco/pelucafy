import React from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";
import { getCurrentUserPhoto } from "../../services/auth";

function ProfileImage() {
  const { currentUser } = useSelector(authSelector);
  const { imageUrl } = currentUser;
  const url = imageUrl || getCurrentUserPhoto() || getRandomePhoto();

  function getRandomePhoto() {
    return "https://picsum.photos/seed/picsum/50/50";
  }

  return (
    <div>
      <img
        className="mr-auto ml-auto"
        src={url}
        alt="test"
        width="auto"
        height="auto"
      />
    </div>
  );
}

export default ProfileImage;
