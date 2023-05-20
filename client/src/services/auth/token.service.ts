class TokenService {

    getLocalRefreshToken() {
        const user = this.getUserFromLocalStorage();
        return user?.refreshToken;
    }

    getLocalAccessToken() {
        const user = this.getUserFromLocalStorage();
        return user?.accessToken;
    }

    updateLocalAccessToken(token: string) {
        const user = this.getUserFromLocalStorage();
        if (user) {
            user.accessToken = token;
            this.setUserToLocalStorage(user);
        }
    }

    getUser() {
        return this.getUserFromLocalStorage() || {};
    }

    setUser(user: any) {
        this.setUserToLocalStorage(user);
    }

    removeUser() {
        localStorage.removeItem("user");
    }

    getUserFromLocalStorage() {
        try {
            const userString = localStorage.getItem("user");
            return userString ? JSON.parse(userString) : null;
        } catch (error) {
            console.log("Error retrieving user from localStorage:", error);
            return null;
        }
    }

    setUserToLocalStorage(user: any) {
        try {
            localStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
            console.log("Error setting user to localStorage:", error);
        }
    }
}

export default new TokenService();
