import React from "react";
import {
  FaInstagramSquare,
  FaTwitterSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import Button from "../elements/Button";

/**
 * Login main content
 * @returns JSX with logo and social media
 */

const LogoHome = () => {
  return (
    <>
      <div className="flex-no-shrink  m-6">
        <div className="mt-20">
          <img src="/images/logo1.png" className="light w-5/6" alt="logo" />
          <div className="flex  mt-10">
            <div className="flex-auto w-1/3 ">
              <Button styles="noRing">
                <FaInstagramSquare />
              </Button>
            </div>
            <div className="flex-auto w-1/3 ">
              <Button styles="noRing">
                <FaTwitterSquare />
              </Button>
            </div>
            <div className="flex-auto w-1/3 ">
              <Button styles="noRing">
                <FaYoutubeSquare />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoHome;
