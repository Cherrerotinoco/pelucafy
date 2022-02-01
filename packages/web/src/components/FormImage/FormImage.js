import React, { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../api";
import { syncSignIn } from "../../redux/auth/auth-actions";
import * as auth from "../../services/auth";

const FormImage = () => {
  const dispatch = useDispatch();

  const [request, setRequest] = useState({
    isImagePending: false,
    isImageSuccess: false,
    isImageError: false,
    errorMsg: "",
  });

  async function updateUserImage(userImage) {
    // Get token
    const token = await auth.getCurrentUserToken();
    if (!token) {
      return setRequest({ ...request, isImageError: true });
    }

    setRequest({ ...request, isImagePending: true });

    try {
      const response = await api.saveUserData(
        {
          Authorization: `Bearer ${token}`,
        },
        userImage,
      );

      if (response.data.error) throw Error(response.errorMessage);

      setRequest({
        ...request,
        isImagePending: false,
        isImageSuccess: true,
        isImageError: false,
      });
      dispatch(syncSignIn());
      return null;
    } catch (error) {
      setRequest({ ...request, isDataError: true, errorMsg: error.message });
      return null;
    }
  }

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
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        updateUserImage({ imageUrl: result.info.secure_url });
      } else {
        console.log(cloudinaryConfig.cloudName, cloudinaryConfig.uploadPreset);
      }
    },
  );

  return (
    <>
      <button type="button" onClick={() => cloudinaryWidget.open()}>
        Upload image
      </button>
      <div className="">
        {request.isImageError && request.errorMsg}
        {request.isImagePending && "Saving image..."}
        {request.isImageSuccess && "Image saved!"}
      </div>
    </>
  );
};

export default FormImage;
