import React from "react";
import { useSelector } from "react-redux";

import "./Home.scss";
import { authSelector } from "../../redux/auth/auth-selectors";
import TrackList from "../../components/TrackList";
import { Elements } from "../../components/elements";
import ErrorMsg from "../../components/elements/ErrorMsg";

// ! PARA COPIAR Y PEGAR;
// ! import { Elements } from "../../components/elements";
// ! const { Button, Title, Label, Input, ErrorMsg, Card } = Elements;

// ? const handleSetEmail = useCallback((e) => {
// ?    setEmail(e.target.value);
// ?  }, []);

function Home() {
  const { isAuthenticated, currentUser } = useSelector(authSelector);
  const { Button, Title, Label, Input, Card } = Elements;
  return (
    <>
      <Title weight="2">Recently Played</Title>

      <div className="w-full  justify-between flex-grow  lg:flex lg:items-center lg:w-auto">
        <div className="w-1/6 justify-around block flex-grow">
          <img
            src="/images/logo.png"
            className="light self-center w-1/2"
            alt="logo"
          />

          <Label>Title</Label>
        </div>
        <div className="w-1/6 justify-around block flex-grow">
          <img
            src="/images/logo.png"
            className="light self-center w-1/2"
            alt="logo"
          />

          <Label>Title</Label>
        </div>
        <div className="w-1/6 justify-around block flex-grow">
          <img
            src="/images/logo.png"
            className="light self-center w-1/2"
            alt="logo"
          />

          <Label>Title</Label>
        </div>
        <div className="w-1/6 justify-around block flex-grow">
          <img
            src="/images/logo.png"
            className="light self-center w-1/2"
            alt="logo"
          />

          <Label>Title</Label>
        </div>
        <div className="w-1/6 justify-around block flex-grow">
          <img
            src="/images/logo.png"
            className="light self-center w-1/2"
            alt="logo"
          />

          <Label>Title</Label>
        </div>
        <div className="w-1/6 justify-around block flex-grow">
          <img
            src="/images/logo.png"
            className="light self-center w-1/2"
            alt="logo"
          />

          <Label>Title</Label>
        </div>
      </div>

      <Title weight="2">Favourites</Title>
      <div className="w-full  justify-between flex-grow  lg:flex lg:items-center lg:w-auto">
        <Card>
          <div className="w-1/6 block flex-grow lg:flex lg:items-center lg:w-auto">
            <img
              src="/images/logo.png"
              className="light self-center w-1/2"
              alt="logo"
            />

            <div className="w-1/2 p-2">
              <Label>Title</Label>
              <Label>Album</Label>
            </div>
          </div>
        </Card>
        <Card>
          <div className="w-1/6 block flex-grow lg:flex lg:items-center lg:w-auto">
            <img
              src="/images/logo.png"
              className="light self-center w-1/2"
              alt="logo"
            />

            <div className="w-1/2 p-2">
              <Label>Title</Label>
              <Label>Album</Label>
            </div>
          </div>
        </Card>
        <Card>
          <div className="w-1/6 block flex-grow lg:flex lg:items-center lg:w-auto">
            <img
              src="/images/logo.png"
              className="light self-center w-1/2"
              alt="logo"
            />

            <div className="w-1/2 p-2">
              <Label>Title</Label>
              <Label>Album</Label>
            </div>
          </div>
        </Card>
        <Card>
          <div className="w-1/6 block flex-grow lg:flex lg:items-center lg:w-auto">
            <img
              src="/images/logo.png"
              className="light self-center w-1/2"
              alt="logo"
            />

            <div className="w-1/2 p-2">
              <Label>Title</Label>
              <Label>TiAlbumtle</Label>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

export default Home;
