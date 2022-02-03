import React from "react";
import {
  FaInstagramSquare,
  FaTwitterSquare,
  FaYoutubeSquare,
} from "react-icons/fa";

const LogoHome = () => {
  return (
    <>
      <div className="flex-no-shrink  m-6">
        <div className="w-1/3 mt-20">
          <img src="/images/logo.png" alt="logo" />
          <div className="flex  mt-10">
            <div className="flex-auto w-1/3 m-5">
              <button
                className=" text-white text-2xl font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out m-1"
                type="button"
              >
                <FaInstagramSquare />
              </button>
            </div>
            <div className="flex-auto w-1/3 m-5">
              <button
                className=" text-white text-2xl font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out m-1"
                type="button"
              >
                <FaTwitterSquare />
              </button>
            </div>
            <div className="flex-auto w-1/3 m-5">
              <button
                className=" text-white text-2xl font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out m-1"
                type="button"
              >
                <FaYoutubeSquare />
              </button>
            </div>
          </div>
        </div>

        {/* <NavLink to={ROUTES.HOME}>
          <img src="/images/logo.png" className="w-1/3" />
        </NavLink> */}
      </div>
    </>
  );
};

export default LogoHome;
