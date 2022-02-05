import React, { useState } from "react";
import Song from "../../components/Song";

const songtest = [
  {
    _id: {
      $oid: "61fd4bffc9decf991a9e7b46",
    },
    albums: [],
    likedBy: [],
    userId: "TZAcGcsMp3SIxvzLnGNHMgUAtIn2",
    title: "titulo ",
    genre: "genero",
    url: "https://res.cloudinary.com/dfd26tpqi/video/upload/v1643887696/songprueba_lmhm4y.mp3",
    thumbnail:
      "https://res.cloudinary.com/dfd26tpqi/image/upload/v1643887701/thumbnailprueba_nmfgnf.png",
    duration: {
      $numberInt: "155",
    },
    createdAt: "2022-02-03T11:28:16Z",
    updatedAt: {
      $date: {
        $numberLong: "1643887696000",
      },
    },
    __v: {
      $numberInt: "0",
    },
  },
  {
    _id: {
      $oid: "61fd4f04c9decf991a9e7b47",
    },
    albums: [],
    likedBy: [],
    userId: "TZAcGcsMp3SIxvzLnGNHMgUAtIn2",
    title: "Titulo3",
    genre: "Genero escogido",
    url: "https://res.cloudinary.com/dfd26tpqi/video/upload/v1643887541/songprueba_lah3a5.mp3",
    thumbnail:
      "https://res.cloudinary.com/dfd26tpqi/image/upload/v1643887549/thumbnailprueba_lyh3cr.png",
    duration: {
      $numberInt: "155",
    },
    createdAt: "2022-02-03T11:25:41Z",
    updatedAt: {
      $date: {
        $numberLong: "1643887541000",
      },
    },
    __v: {
      $numberInt: "0",
    },
  },
];
const MySongs = () => {
  return (
    <>
      <main className="Login">
        <section className="Login__wrapper flex flex-row">
          <article className="basis-1/2">
            <h3 className="text-center text-xl font-bold text-green-600">
              MY SONGS
            </h3>
            <div className="flex flex-col items-center min-h-screen bg-center bg-cover">
              <div className="max-w-3xl w-full mx-auto z-10">
                <div className="flex flex-col">
                  {songtest.map((song) => (
                    <Song
                      key={song._id.$oid}
                      title={song.title}
                      thumbnail={song.thumbnail}
                    />
                  ))}
                </div>
              </div>
            </div>
          </article>
        </section>
      </main>
    </>
  );
};

export default MySongs;
