// import { apiClient } from "@/shared/api/client";
// import { ENDPOINTS } from "@/shared/api/endpoints";
import { apiClient } from "@/shared/api/clients";
import { ENDPOINTS } from "@/shared/api/enpoints";
import { TokenPair } from "@/shared/api/tokenStorage";
import { RegisterFormData } from "@features/auth/schemas/auth.schema";
import { LoginFormData } from "@features/auth/schemas/login.schema";

export const loginRequest = async (
  credentials: LoginFormData,
): Promise<TokenPair> => {
  const { data } = await apiClient.post<TokenPair>(
    ENDPOINTS.AUTH.LOGIN,
    credentials,
  );
  return data;
};

export const registerRequest = async (
  payload: RegisterFormData,
): Promise<TokenPair> => {
  const { data } = await apiClient.post<TokenPair>(
    ENDPOINTS.AUTH.REGISTER,
    payload,
  );
  return data;
};

export const refreshTokenRequest = async (
  refreshToken: string,
): Promise<TokenPair> => {
  const { data } = await apiClient.post<TokenPair>(ENDPOINTS.AUTH.REFRESH, {
    refreshToken,
  });
  return data;
};
