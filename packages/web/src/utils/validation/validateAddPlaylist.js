/**
 * Validator for the playlist form
 * @param {} playlist {Playlist form data to validate}
 * @returns errors
 */
export default function validateAddPlaylist(playlist) {
  const errors = {};

  if (!playlist.name) {
    errors.name = "Title is required";
  } else if (playlist.name.length < 2 || playlist.name.length > 30) {
    errors.name = "Title length between 2 and 30 characteres";
  }

  if (!playlist.description) {
    errors.description = "Description is required";
  } else if (playlist.description.length < 2) {
    errors.description = "Please fill the description field";
  }

  if (!playlist.coverThumbnail) {
    errors.coverThumbnail = "Update the cover please";
  }

  return errors;
}
