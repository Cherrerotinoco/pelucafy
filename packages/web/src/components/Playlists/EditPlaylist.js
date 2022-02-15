import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { setEditingPlaylist } from "../../redux/playlist/playlist-actions";
import { authSelector } from "../../redux/auth/auth-selectors";

const EditPlaylist = ({ playlist }) => {
  const { currentUser } = useSelector(authSelector);
  const dispatch = useDispatch();
  const editPlaylist = () => {
    dispatch(setEditingPlaylist(playlist));
  };

  if (playlist.userId !== currentUser._id) {
    return null;
  }

  return (
    <>
      <button
        className=" bg-yellow-400 hover:bg-yellow-500 px-2 ml-1 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-yellow-300 hover:border-yellow-500 text-white rounded-full transition ease-in duration-300"
        type="button"
        onClick={editPlaylist}
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

EditPlaylist.defaultProps = {
  playlist: {},
};

EditPlaylist.propTypes = {
  playlist: PropTypes.object,
};

export default EditPlaylist;
