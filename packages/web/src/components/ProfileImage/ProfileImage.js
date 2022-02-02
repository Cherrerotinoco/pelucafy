import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";
import { getCurrentUserPhoto } from "../../services/auth";

function ProfileImage({thumbnail, ...props}) {

  const { currentUser } = useSelector(authSelector);
  const { imageUrl, thumbnailUrl } = currentUser;
  
  const url = thumbnailUrl || imageUrl || getCurrentUserPhoto() || getRandomePhoto();

  function getRandomePhoto() {
    return "https://picsum.photos/seed/picsum/50/50";
  }

  return (
      <img
        {...props}
        className="mr-auto ml-auto"
        src={url}
        alt="test"
        width="auto"
        height="auto"
      />
  );
}

ProfileImage.defaultProps = {
  thumbnail: false
};

ProfileImage.propTypes = {
  thumbnail: PropTypes.bool
};

export default ProfileImage;
