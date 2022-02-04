import React from "react";
import PropTypes from "prop-types";
import Button from "../elements/Button";

const FileUploader = ({ callback, text, ...props }) => {
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
      sources: ["local"],
    },
    callback,
  );

  return (
    <>
      <Button styles="light" onClick={() => cloudinaryWidget.open()}>
        {text}
      </Button>
    </>
  );
};

FileUploader.defaultProps = {
  callback: null,
  text: "Update Image",
};

FileUploader.propTypes = {
  callback: PropTypes.func,
  text: PropTypes.string,
};

export default FileUploader;
