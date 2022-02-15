import React, { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setTrackToAdd } from "../../redux/playlist/playlist-actions";

const AddToPlaylist = ({ songId }) => {
  const dispatch = useDispatch();

  const trackToAdd = () => {
    dispatch(setTrackToAdd(songId));
  };

  return (
    <>
      <button
        className=" bg-blue-400 hover:bg-blue-500 px-2 ml-1 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-blue-300 hover:border-blue-500 text-white rounded-full transition ease-in duration-300"
        type="button"
        onClick={trackToAdd}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-3 w-3"
        >
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      </button>
    </>
  );
};

AddToPlaylist.defaultProps = {
  songId: "",
};

AddToPlaylist.propTypes = {
  songId: PropTypes.string,
};

export default AddToPlaylist;
