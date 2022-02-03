export default function validateAddSong(song) {
  const errores = {};

  if (!song.title) {
    errores.title = "Title is required";
  } else if (song.title.length < 2 || song.title.length > 30) {
    errores.title = "Title length between 2 and 30 characteres";
  }

  if (!song.genre) {
    errores.genre = "Genre is required";
  } else if (song.genre.length < 2 || song.genre.length > 30) {
    errores.genre = "Genre length between 2 and 30 characteres";
  }

  if (!song.url) {
    errores.url = "Update the song please";
  }

  if (!song.thumbnail) {
    errores.thumbnail = "Update the tumbnail please";
  }

  return errores;
}
