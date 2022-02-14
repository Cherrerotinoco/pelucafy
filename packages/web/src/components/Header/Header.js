import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaMusic,
  FaHome,
  FaFolderOpen,
  FaSearch,
  FaPlus,
  FaFolderPlus,
} from "react-icons/fa";

import * as ROUTES from "../../routes";

import { authSelector } from "../../redux/auth/auth-selectors";

import LogoHome from "../LogoHome/LogoHome";
import Title from "../elements/Title";
import Button from "../elements/Button";

function Header() {
  const { isAuthenticated } = useSelector(authSelector);

  return (
    <header className="p-2">
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
          <LogoHome />
        </>
      )}

      {isAuthenticated && (
        <nav className=" flex-col w-full flex-nowrap">
          <NavLink to={ROUTES.HOME}>
            <img
              src="/images/logo.png"
              className="flex light justify-around w-20"
              alt="logo"
            />
          </NavLink>
          <div className="items-center">
            <div className=" mt-5 flex justify-around items-center">
              <Button styles="light">
                <NavLink to={ROUTES.HOME}>
                  <FaHome />
                </NavLink>
              </Button>
            </div>
            <div className="w-full flex justify-around">
              <Button styles="light">
                <NavLink to={ROUTES.HOME}>
                  <FaSearch />
                </NavLink>
              </Button>
            </div>
            <div className="w-full flex justify-around">
              <Button styles="light">
                <NavLink to={ROUTES.MYSONGS}>
                  <FaMusic />
                </NavLink>
              </Button>
            </div>
            <div className="w-full flex justify-around">
              <Button styles="light">
                <NavLink to={ROUTES.ADDSONG}>
                  <FaPlus />
                </NavLink>
              </Button>
            </div>
            <div className="w-full flex justify-around">
              <Button styles="light">
                <NavLink to={ROUTES.MYPLAYLIST}>
                  <FaFolderOpen />
                </NavLink>
              </Button>
            </div>
            <div className="w-full flex justify-around">
              <Button styles="light">
                <NavLink to={ROUTES.ADDPLAYLIST}>
                  <FaFolderPlus />
                </NavLink>
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
