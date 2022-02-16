/**
 * Validator for the profile form
 * @param {} song {Profile form data to validate}
 * @returns errors
 */
export default function validateProfile(profile) {
  const errors = {};

  if (!profile.firstName) {
    errors.firstName = "El firstName es obligatorio";
  } else if (profile.firstName.length < 2 || profile.firstName.length > 20) {
    errors.firstName = "El firstName debe contener entre 2 y 20 caracteres";
  }

  if (!profile.lastName) {
    errors.lastName = "El lastName es obligatorio";
  } else if (profile.lastName.length < 2 || profile.lastName.length > 20) {
    errors.lastName = "El lastName debe contener entre 2 y 20 caracteres";
  }

  if (!profile.email) {
    errors.email = "El Email es Obligatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(profile.email)) {
    errors.email = "Email no válido";
  }

  return errors;
}
