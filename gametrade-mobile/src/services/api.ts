import { Platform } from "react-native";

const platformDefaultUrl =
  Platform.OS === "android" ? "http://10.0.2.2:8090" : "http://localhost:8090";

const configuredUrl = process.env.EXPO_PUBLIC_API_URL?.trim();

export const API_BASE_URL = (configuredUrl || platformDefaultUrl).replace(/\/+$/, "");

const connectionErrorMessage = `No se pudo conectar con ${API_BASE_URL}. Revisa la URL de la API y que el gateway esté activo.`;

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getErrorMessage(payload: unknown): string | undefined {
  if (typeof payload === "string" && payload.trim()) {
    return payload.trim();
  }

  if (!isRecord(payload)) {
    return undefined;
  }

  const message = payload.message ?? payload.detail ?? payload.error;
  return typeof message === "string" && message.trim() ? message : undefined;
}

async function getPayload(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    return response.text();
  }

  try {
    return await response.json();
  } catch {
    return undefined;
  }
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);
  const headers = new Headers(options.headers);

  headers.set("Accept", "application/json");
  if (options.body) {
    headers.set("Content-Type", "application/json");
  }

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
      signal: controller.signal,
    });
    const payload = await getPayload(response);

    if (!response.ok) {
      const responseDescription = response.statusText
        ? `${response.status} (${response.statusText})`
        : String(response.status);

      throw new ApiError(
        getErrorMessage(payload) ?? `El servidor respondió ${responseDescription}.`,
        response.status,
      );
    }

    return payload as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    const networkDetail = error instanceof Error && error.message ? ` Detalle: ${error.message}` : "";
    throw new ApiError(`${connectionErrorMessage}${networkDetail}`);
  } finally {
    clearTimeout(timeout);
  }
}
