import React from "react";
import { useSelector } from "react-redux";

import "./Home.scss";
import { authSelector } from "../../redux/auth/auth-selectors";

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
      </section>
    </>
  );
}

export default Home;
