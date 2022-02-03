import React from "react";
import PropTypes from "prop-types";

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
      <button
        className="btn btn-primary w-full"
        type="button"
        onClick={() => cloudinaryWidget.open()}
      >
        {console.log("me renderizo", text)}
        {text}
      </button>
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
