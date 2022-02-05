import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as ROUTES from "../../routes";

import { authSelector } from "../../redux/auth/auth-selectors";

import LogoHome from "../LogoHome/LogoHome";
import Title from "../elements/Title";
import Button from "../elements/Button";
import Input from "../elements/Input";

function Header() {
  const { isAuthenticated } = useSelector(authSelector);

  return (
    <header className="p-4">
      {!isAuthenticated && (
        <>
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <Title weight="2" align="center">
              456 users
            </Title>
            <Title weight="2" align="center">
              1739 songs
            </Title>
            <Title weight="2" align="center">
              149 playlist
            </Title>
          </div>
        </>
      )}

      {isAuthenticated && (
        <nav className="flex items-center justify-between flex-nowrap p-6">
          <div className="w-full flex items-center  flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="flex  w-1/2">
              <div className="w-1/3">
                <NavLink to={ROUTES.HOME}>
                  <img src="/images/logo.png" className="light" alt="logo" />
                </NavLink>
              </div>
              <div className=" flex items-center w-2/3">
                <Button styles="light">
                  <NavLink to={ROUTES.MYSONGS}>My songs</NavLink>
                </Button>

                <Button styles="light">
                  <NavLink to={ROUTES.ADDSONG}>Add songs</NavLink>
                </Button>
              </div>
            </div>
            <div className="flex-auto w-1/2">
              <div className="w-full mx-4">
                <Input
                  placeholder="Search somthig"
                  onChange={() => console.log("searching...")}
                />
              </div>
            </div>
          </div>
        </nav>
      )}
      {!isAuthenticated && <LogoHome />}
    </header>
  );
}

export default Header;
