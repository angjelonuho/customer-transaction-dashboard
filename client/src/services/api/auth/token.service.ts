import { LocalStorageUserTypes } from "@/interface/auth/auth";

class TokenService {
    getLocalRefreshToken(): string | null {
        const user: LocalStorageUserTypes = this.getUserFromLocalStorage();
        return user ? user.refreshToken : null;
    }

    getLocalAccessToken(): string | null {
        const user: LocalStorageUserTypes = this.getUserFromLocalStorage();
        return user ? user.accessToken : null;
    }

    updateLocalAccessToken(token: string): void {
        const user: LocalStorageUserTypes = this.getUserFromLocalStorage();
        if (user) {
            user.accessToken = token;
            this.setUserToLocalStorage(user);
        }
    }

    getUser(): LocalStorageUserTypes {
        return this.getUserFromLocalStorage() || null;
    }

    setUser(user: LocalStorageUserTypes): void {
        this.setUserToLocalStorage(user);
    }

    removeUser(): void {
        localStorage.removeItem("user");
    }

    getUserFromLocalStorage(): LocalStorageUserTypes {
        try {
            const userString: string | null = localStorage.getItem("user");
            return userString ? JSON.parse(userString) : null;
        } catch (error) {
            console.log("Error retrieving user from localStorage:", error);
            return null;
        }
    }

    setUserToLocalStorage(user: LocalStorageUserTypes): void {
        try {
            localStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
            console.log("Error setting user to localStorage:", error);
        }
    }
}

export default new TokenService();
