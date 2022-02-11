import React from "react";
import { FaPlay } from "react-icons/fa";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setCurrentTrack } from "../../redux/track/track-actions";

const Play = ({ song }) => {
  const dispatch = useDispatch();
  const playTrack = () => {
    dispatch(setCurrentTrack(song));
  };
  return (
    <>
      <button
        className="bg-green-400 hover:bg-green-500 px-2 ml-2 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300"
        type="button"
        onClick={playTrack}
      >
        <FaPlay />
      </button>
    </>
  );
};

Play.defaultProps = {
  song: {},
};

Play.propTypes = {
  song: PropTypes.object,
};
export default Play;
