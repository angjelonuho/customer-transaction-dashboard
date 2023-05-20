import axiosInstance from "@/helpers/axiosInstance";
import { LoginTypes } from "@/interface/auth/auth";

class AuthService {
    login({ username, password }: LoginTypes) {
        return axiosInstance
            .post("/auth/login", {
                username,
                password
            })
            .then((response: { data: { accessToken: any; }; }) => {
                if (response.data.accessToken) {
                    //TokenService.setUser(response.data);
                }

                return response.data;
            });
    }

    logout() {
        //TokenService.removeUser();
    }
}

export default new AuthService();