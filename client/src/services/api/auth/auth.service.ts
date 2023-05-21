import axiosInstance from "@/helpers/axiosInstance";
import { LoginTypes } from "@/types/auth/auth";
import TokenService from "@/services/api/auth/token.service";

class AuthService {
    async login({ username, password }: LoginTypes) {
        try {
            const response = await axiosInstance.post("/auth/login", {
                username,
                password,
            });

            const { accessToken } = response.data;
            if (accessToken) {
                TokenService.setUser(response.data);
            }

            return response.data;
        } catch (error) {

            console.log("Login failed:", error);
            throw error;
        }
    }

    async refreshToken() {
        try {
            const refreshToken = TokenService.getLocalRefreshToken();

            const response = await axiosInstance.post("/auth/token", {
                token: refreshToken,
            });
            const { accessToken } = response.data;
            if (accessToken) {
                TokenService.updateLocalAccessToken(accessToken);
                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            }
            return accessToken;
        } catch (error) {
            console.log("Token refresh failed:", error);
            throw error;
        }
    }

    logout() {
        TokenService.removeUser();
    }
}

export default new AuthService();
