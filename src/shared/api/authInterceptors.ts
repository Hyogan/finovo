import { refreshTokenRequest } from "@/features/auth/api/auth.api";
import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { router } from "expo-router";

import { apiClient } from "./clients";
import { getAccessToken, getRefreshToken, setTokens } from "./tokenStorage";

let refreshPromise: Promise<string> | null = null;

// Attach access token to every request
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
);

// Refresh helper
async function refreshAccessToken(): Promise<string> {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    throw new Error("No refresh token");
  }

  const tokens = await refreshTokenRequest(refreshToken);

  await setTokens(tokens);

  return tokens.accessToken;
}

apiClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Ignore anything except 401
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Prevent infinite refresh loops
    if (originalRequest._retry) {
      router.replace("/auth/login");
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // If another request is already refreshing, wait for it
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken();
      }

      const newAccessToken = await refreshPromise;

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return apiClient(originalRequest);
    } catch (err) {
      router.replace("/auth/login");
      return Promise.reject(err);
    } finally {
      refreshPromise = null;
    }
  },
);
