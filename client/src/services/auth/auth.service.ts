import axiosInstance from "@/helpers/axiosInstance";
import { LoginTypes } from "@/interface/auth/auth";
import TokenService from "@/services/auth/token.service";

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

    logout() {
        TokenService.removeUser();
    }
}

export default new AuthService();
