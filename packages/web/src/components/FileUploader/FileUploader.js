import React from "react";
import PropTypes from "prop-types";

const FileUploader = ({ callback, ...props }) => {
  const cloudinaryConfig = {
    apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
    apiSecret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
    apiBaseUrl: process.env.REACT_APP_CLOUDINARI_API_BASE_URL,
    cloudName: process.env.REACT_APP_CLOUDINARI_API_CLOUD_NAME_DEV,
    uploadPreset: process.env.REACT_APP_CLOUDINARI_API_PRESET_DEFAULT,
  };

  const cloudinaryWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: cloudinaryConfig.cloudName,
      uploadPreset: cloudinaryConfig.uploadPreset,
    },
    callback,
  );

  /* (error, result) => {
      if (!error && result && result.event === "success") {
        updateUserImage({
          imageUrl: result.info.secure_url,
          thumbnailUrl: result.info.thumbnail_url,
        });
      }
    }, */

  return (
    <>
      <button type="button" onClick={() => cloudinaryWidget.open()}>
        Upload image
      </button>
    </>
  );
};

FileUploader.defaultProps = {
  callback: null,
};

FileUploader.propTypes = {
  callback: PropTypes.func,
};

export default FileUploader;
