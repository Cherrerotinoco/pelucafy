import React from "react";
import TrackForm from "../../components/Forms/TrackForm/TrackForm";
import Header from "../../components/Header";

const AddSong = () => {
  return (
    <>
      <Header />
      <main className="Login">
        <section className="Login__wrapper">
          <TrackForm />
        </section>
      </main>
    </>
  );
};

export default AddSong;
