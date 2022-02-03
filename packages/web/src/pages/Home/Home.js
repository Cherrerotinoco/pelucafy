import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./Home.scss";
import { authSelector } from "../../redux/auth/auth-selectors";

function Home() {
  const { isAuthenticated, currentUser } = useSelector(authSelector);

  const history = useHistory();

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
        ) : (
          history.push("/login")
        )}
      </section>
    </>
  );
}

export default Home;
