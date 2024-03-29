import { AxiosResponse, AxiosError } from "axios";
import { ApiErrors } from "@/types/api/apiErrors";
import axiosInstance from "./axiosInstance";
import TokenService from "@/services/api/auth/token.service";
import AuthService from "@/services/api/auth/auth.service";

const setupAxios = (store: any) => {
  // Variable to track the number of retries
  let retryCount = 0;

  // Maximum number of retries
  const maxRetries = 2;

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      console.log('000000000000')
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    async (response: AxiosResponse) => {
      return Promise.resolve(response);
    },
    async (error) => {
      const errorCode = error.response?.data?.error;

      if (!error.response) {
        return Promise.reject(error);
      }

      if (errorCode === ApiErrors.INVALID_CREDENTIALS) {
        return Promise.reject(errorCode);
      }

      if (errorCode === ApiErrors.UNAUTHORIZED) {
  
        AuthService.logout()
        return Promise.reject(errorCode);
      }

      if (errorCode === ApiErrors.INVALID_ACCESS_TOKEN) {
        if (retryCount < maxRetries) {
          // Retry logic
          retryCount++;
          try {
            console.log('retrying... ' + retryCount)
            const accessToken = await AuthService.refreshToken();
            // Update the Authorization header with the new access token
            axiosInstance.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
            return await axiosInstance(error.config);
          } catch {
            return await Promise.reject(errorCode);
          }
        } else {
          // Maximum retries reached, redirect to login page or handle as needed
          return Promise.reject(errorCode);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default setupAxios;
