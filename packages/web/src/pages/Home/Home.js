import React from "react";
import { useSelector } from "react-redux";

import "./Home.scss";
import { authSelector } from "../../redux/auth/auth-selectors";
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
      <Card>
        {isAuthenticated && currentUser ? (
          <Title weight="2" align="center">
            WELLCOME {currentUser.email}
          </Title>
        ) : null}

        <Label htmlFor="htmlFor"> Para copiar y pegar</Label>
        <Input
          name="name + id"
          value="valor del ejemplo"
          onChange={() => window.alert("action onChange")}
        />
        <Button styles="light" onClick={() => window.alert("action onClick")}>
          texto boton
        </Button>

        <ErrorMsg> Error de prueba</ErrorMsg>
      </Card>
    </>
  );
}

export default Home;
