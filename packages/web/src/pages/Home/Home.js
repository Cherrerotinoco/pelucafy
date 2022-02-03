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
          <h2
            className="my-4 text-2xl md:text-3xl
 text-white opacity-75 font-bold leading-tight text-center md:text-left"
          >
            Hello {currentUser.email}
          </h2>
        ) : null}

        <Title weight="2" align="center">
          Esto es un ejemplo
        </Title>
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
