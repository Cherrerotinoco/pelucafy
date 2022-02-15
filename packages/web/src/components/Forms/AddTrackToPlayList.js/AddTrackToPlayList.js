import React from "react";
import PropTypes from "prop-types";

const AddTrackToPlayList = ({ trackToAdd }) => {
  return <div>{trackToAdd}</div>;
};

export default AddTrackToPlayList;

AddTrackToPlayList.defaultProps = {
  trackToAdd: "",
};
AddTrackToPlayList.propTypes = {
  trackToAdd: PropTypes.string,
};
