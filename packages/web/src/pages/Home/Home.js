import React from "react";
import { useSelector } from "react-redux";

import "./Home.scss";
import { authSelector } from "../../redux/auth/auth-selectors";
import Button from "../../components/elements/Button";
import Title from "../../components/elements/Title";
import Label from "../../components/elements/Label";
import Input from "../../components/elements/Input";

function Home() {
  const { isAuthenticated, currentUser } = useSelector(authSelector);

  return (
    <>
      <section className="p-4">
        {isAuthenticated && currentUser ? (
          <Title weight="2" align="center">
            WELLCOME {currentUser.email}
          </Title>
        ) : null}

        <Label htmlFor="htmlFor"> Para copiar y pegar</Label>
        <Input
          name="name + id"
          value="valor del ejemplo"
          action={() => window.alert("action onChange")}
        />
        <Button
          submit={false}
          styles="background"
          action={() => window.alert("action onClick")}
        >
          texto boton
        </Button>
      </section>
    </>
  );
}

export default Home;
