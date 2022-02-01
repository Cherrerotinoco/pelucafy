export default function validateProfile(profile) {
  const errores = {};

  // Validar el nombre del usuario
  if (!profile.firstName) {
    errores.firstName = "El firstName es obligatorio";
  } else if (profile.firstName.length < 2 || profile.firstName.length > 20) {
    errores.firstName = "El firstName debe contener entre 2 y 20 caracteres";
  }

  if (!profile.lastName) {
    errores.lastName = "El lastName es obligatorio";
  }

  // validar el email
  if (!profile.email) {
    errores.email = "El Email es Obligatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(profile.email)) {
    errores.email = "Email no válido";
  }

  return errores;
}
