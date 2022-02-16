/**
 * Validator for the add song form
 * @param {} song {AddSong form data to validate}
 * @returns errors
 */
export default function validateAddSong(song) {
  const errors = {};

  if (!song.title) {
    errors.title = "Title is required";
  } else if (song.title.length < 2 || song.title.length > 30) {
    errors.title = "Title length between 2 and 30 characteres";
  }

  if (!song.genre) {
    errors.genre = "Genre is required";
  } else if (song.genre.length < 2 || song.genre.length > 30) {
    errors.genre = "Genre length between 2 and 30 characteres";
  }

  if (!song.url) {
    errors.url = "Update the song please";
  }

  if (!song.thumbnail) {
    errors.thumbnail = "Update the tumbnail please";
  }

  return errors;
}
