export const generateSongs = (numberOfSongs) => {
  // ? /images/logo.png
  // ? https://res.cloudinary.com/dfd26tpqi/image/upload/v1643887701/thumbnailprueba_nmfgnf.png
  const songs = [];
  for (let i = 0; i < numberOfSongs; i += 1) {
    songs.push({
      _id: {
        $oid: `61fd4bffc9decf991a9e7b${46 + i}`,
      },
      albums: [],
      likedBy: [],
      userId: "TZAcGcsMp3SIxvzLnGNHMgUAtIn2",
      title: `Song${1 + i}`,
      genre: "Pop",
      url: "https://res.cloudinary.com/dfd26tpqi/video/upload/v1643887696/songprueba_lmhm4y.mp3",
      thumbnail:
        "https://res.cloudinary.com/dfd26tpqi/image/upload/v1643887701/thumbnailprueba_nmfgnf.png", // ! IURL-MAGE
      duration: {
        $numberInt: `155${46 + i}`,
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
    });
  }
  return songs;
};
