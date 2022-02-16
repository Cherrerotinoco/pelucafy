import React from "react";
import PropTypes from "prop-types";
import Button from "../elements/Button";

/**
 * This component open the cloudinary widget on click
 * {https://cloudinary.com/documentation/upload_widget}
 * @param {*} params {callback={fuction that will execute afte upload file}, text={upload button label}}
 * @returns JSX labeled button
 */
const FileUploader = ({ callback, text }) => {
  const cloudinaryConfig = {
    apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
    apiSecret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
    apiBaseUrl: process.env.REACT_APP_CLOUDINARI_API_BASE_URL,
    cloudName: process.env.REACT_APP_CLOUDINARI_API_CLOUD_NAME_DEV,
    uploadPreset: process.env.REACT_APP_CLOUDINARI_API_PRESET_DEFAULT,
  };

  const openWidget = () => {
    const cloudinaryWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudinaryConfig.cloudName,
        uploadPreset: cloudinaryConfig.uploadPreset,
        sources: ["local"],
      },
      callback,
    );
    cloudinaryWidget.open();
  };

  return (
    <>
      <Button styles="light" onClick={() => openWidget()}>
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
