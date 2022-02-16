import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";
import { getCurrentUserPhoto } from "../../services/auth";

/**
 * Profile image taked from google profile or from netlify if  the user uploads it
 * @param {*} param {thumbnail={}, ...props={any}}
 * @returns Img component styled with Tailwind
 */
function ProfileImage({ thumbnail, ...props }) {
  const { currentUser } = useSelector(authSelector);
  const { imageUrl, thumbnailUrl } = currentUser;

  const url =
    thumbnailUrl || imageUrl || getCurrentUserPhoto() || getRandomePhoto();

  function getRandomePhoto() {
    return "https://picsum.photos/seed/picsum/50/50";
  }

  return (
    <img
      {...props}
      className="mr-auto ml-auto rounded-full mx-auto w-full md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6"
      src={url}
      alt="test"
      width="auto"
      height="auto"
    />
  );
}

ProfileImage.defaultProps = {
  thumbnail: false,
};

ProfileImage.propTypes = {
  thumbnail: PropTypes.bool,
};

export default ProfileImage;
