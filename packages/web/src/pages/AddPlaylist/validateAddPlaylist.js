export default function validateAddPlaylist(playlist) {
  const errores = {};

  if (!playlist.name) {
    errores.name = "Title is required";
  } else if (playlist.name.length < 2 || playlist.name.length > 30) {
    errores.name = "Title length between 2 and 30 characteres";
  }

  if (!playlist.description) {
    errores.description = "Description is required";
  } else if (playlist.description.length < 2) {
    errores.description = "Please fill the description field";
  }

  if (!playlist.coverThumbnail) {
    errores.coverThumbnail = "Update the cover please";
  }

  return errores;
}
