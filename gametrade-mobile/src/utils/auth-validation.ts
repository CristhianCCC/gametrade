import type { City } from "@/constants/cities";
import type { LoginCredentials, RegistrationInput } from "@/services/auth.service";

type LoginFields = keyof LoginCredentials;
type RegistrationForm = Omit<RegistrationInput, "city"> & {
  confirmPassword: string;
  city?: City;
};

export type FormErrors<T extends string> = Partial<Record<T, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,64}$/;
const phonePattern = /^\+?[0-9\s()-]{7,20}$/;

function isRealPastDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  const today = new Date();
  const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day &&
    date.getTime() < todayUtc
  );
}

export function validateLogin(values: LoginCredentials): FormErrors<LoginFields> {
  const errors: FormErrors<LoginFields> = {};

  if (!values.email.trim()) {
    errors.email = "Ingresa tu correo electrónico.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Ingresa un correo electrónico válido.";
  }

  if (!values.password) {
    errors.password = "Ingresa tu contraseña.";
  }

  return errors;
}

export function validateRegistration(
  values: RegistrationForm,
): FormErrors<keyof RegistrationForm> {
  const errors: FormErrors<keyof RegistrationForm> = {};

  if (!values.names.trim()) errors.names = "Ingresa tus nombres.";
  if (!values.lastnames.trim()) errors.lastnames = "Ingresa tus apellidos.";

  if (!values.email.trim()) {
    errors.email = "Ingresa tu correo electrónico.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Ingresa un correo electrónico válido.";
  }

  const phoneDigits = values.phoneNumber.replace(/\D/g, "");
  if (!values.phoneNumber.trim()) {
    errors.phoneNumber = "Ingresa tu teléfono.";
  } else if (!phonePattern.test(values.phoneNumber.trim()) || phoneDigits.length < 10) {
    errors.phoneNumber = "Ingresa un número válido de al menos 10 dígitos.";
  }

  if (!isRealPastDate(values.dateOfBirth)) {
    errors.dateOfBirth = "Usa una fecha válida anterior a hoy (AAAA-MM-DD).";
  }

  if (!values.city) errors.city = "Selecciona tu ciudad.";

  if (!values.password) {
    errors.password = "Crea una contraseña.";
  } else if (!passwordPattern.test(values.password)) {
    errors.password = "Usa 8 a 64 caracteres, mayúscula, minúscula, número y símbolo.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirma tu contraseña.";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden.";
  }

  return errors;
}
