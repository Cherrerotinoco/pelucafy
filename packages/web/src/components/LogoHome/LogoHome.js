import React from "react";
import {
  FaInstagramSquare,
  FaTwitterSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import Button from "../elements/Button";

const LogoHome = () => {
  return (
    <>
      <div className="flex-no-shrink  m-6">
        <div className="w-1/3 mt-20">
          <img src="/images/logo.png" alt="logo" />
          <div className="flex  mt-10">
            <div className="flex-auto w-1/3 m-5">
              <Button styles="noBackground">
                <FaInstagramSquare />
              </Button>
            </div>
            <div className="flex-auto w-1/3 m-5">
              <Button styles="noBackground">
                <FaTwitterSquare />
              </Button>
            </div>
            <div className="flex-auto w-1/3 m-5">
              <Button styles="noBackground">
                <FaYoutubeSquare />
              </Button>
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
