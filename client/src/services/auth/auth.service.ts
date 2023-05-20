import axiosInstance from "@/helpers/axiosInstance";
import { LoginTypes } from "@/interface/auth/auth";

class AuthService {
    async login({ username, password }: LoginTypes) {
        const response = await axiosInstance
            .post("/auth/login", {
                username,
                password
            });
            
        if (response.data.accessToken) {
            //TokenService.setUser(response.data);
        }

        return response.data;
    }

    logout() {
        //TokenService.removeUser();
    }
}

export default new AuthService();