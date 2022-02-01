import React from "react";
import { useSelector } from "react-redux";

import "./Home.scss";
import Header from "../../components/Header";
import { authSelector } from "../../redux/auth/auth-selectors";

function Home() {
  const { isAuthenticated, currentUser } = useSelector(authSelector);

  return (
    <>
      <Header />
      <main className="p-4">
        <section className="p-4">
          {isAuthenticated && currentUser ? (
            <h1 className="text-xl">Hello {currentUser.email}</h1>
          ) : (
            <h1 className="text-xl">Hello World</h1>
          )}
        </section>
      </main>
    </>
  );
}

export default Home;
