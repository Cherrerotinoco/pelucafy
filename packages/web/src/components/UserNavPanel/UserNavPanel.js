import React, { useState } from "react";

import ThumbnailDropDown from "../thumbnailDropDown/ThumbnailDropDown";
import ProfileImage from "../ProfileImage/ProfileImage";

const UserNavPanel = () => {
  const [dropDown, setDropDown] = useState(false);
  return (
    <>
      <div className="w-full block items-center justify-end flex-grow lg:flex lg:items-center lg:w-auto m-5">
        {dropDown ? (
          <ThumbnailDropDown />
        ) : (
          <h2 className="mx-10 text-3xl md:text-3xl text-white font-bold leading-tight text-justify">
            SONGFY
          </h2>
        )}
        <button
          className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white"
          type="button"
          onClick={() => setDropDown(!dropDown)}
        >
          <ProfileImage thumbnail />
        </button>
      </div>
      <hr className="mt-1 mb-4" />
    </>
  );
};

export default UserNavPanel;
