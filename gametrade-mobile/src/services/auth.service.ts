import type { City } from "@/constants/cities";
import { ApiError, apiRequest } from "@/services/api";
import { sessionStorage } from "@/services/session-storage";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegistrationInput = {
  names: string;
  lastnames: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: string;
  city: City;
};

export type AuthResponse = {
  token: string;
};

export type UserResponse = Omit<RegistrationInput, "password"> & {
  id: number;
};

export const authService = {
  async login(credentials: LoginCredentials) {
    try {
      const response = await apiRequest<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      if (!response.token) {
        throw new ApiError("El servidor no devolvió un token de acceso.");
      }

      await sessionStorage.saveToken(response.token);
      return response;
    } catch (error) {
      if (error instanceof ApiError && [401, 403].includes(error.status ?? 0)) {
        throw new ApiError("Correo o contraseña incorrectos.", error.status);
      }

      throw error;
    }
  },

  register(input: RegistrationInput) {
    return apiRequest<UserResponse>("/users", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  getSessionToken() {
    return sessionStorage.getToken();
  },

  signOut() {
    return sessionStorage.clearToken();
  },
};
