import TokenService from "@/services/api/auth/token.service";

describe("TokenService", () => {
    afterEach(() => {
        localStorage.clear();
    });

    describe("getLocalRefreshToken", () => {
        it("should return the local refresh token if it exists", () => {
            const mockUser = {
                accessToken: "oldAccessToken",
                refreshToken: "mockRefreshToken",
            };

            localStorage.setItem("user", JSON.stringify(mockUser));

            expect(TokenService.getLocalRefreshToken()).toBe(mockUser.refreshToken);
        });

        it("should return null if the local refresh token does not exist", () => {
            expect(TokenService.getLocalRefreshToken()).toBeNull();
        });
    });

    describe("getLocalAccessToken", () => {
        it("should return the local access token if it exists", () => {
            const mockUser = {
                accessToken: "oldAccessToken",
                refreshToken: "mockRefreshToken",
            };

            localStorage.setItem("user", JSON.stringify(mockUser));

            expect(TokenService.getLocalAccessToken()).toBe(mockUser.accessToken);
        });

        it("should return null if the local access token does not exist", () => {
            expect(TokenService.getLocalAccessToken()).toBeNull();
        });
    });

    describe("updateLocalAccessToken", () => {
        it("should update the local access token if the user exists", () => {
            const mockUser = {
                accessToken: "oldAccessToken",
                refreshToken: "mockRefreshToken",
            };

            localStorage.setItem("user", JSON.stringify(mockUser));

            const newAccessToken = "newAccessToken";

            TokenService.updateLocalAccessToken(newAccessToken);

            const updatedUser = JSON.parse(localStorage.getItem("user") || "");

            expect(updatedUser.accessToken).toBe(newAccessToken);
        });

        it("should not update the local access token if the user does not exist", () => {
            TokenService.updateLocalAccessToken("newAccessToken");

            expect(localStorage.getItem("user")).toBeNull();
        });
    });

    describe("getUser", () => {
        it("should return the user if it exists in localStorage", () => {
            const mockUser = {
                accessToken: "oldAccessToken",
                refreshToken: "mockRefreshToken",
            };

            localStorage.setItem("user", JSON.stringify(mockUser));

            expect(TokenService.getUser()).toEqual(mockUser);
        });

        it("should return null if the user does not exist in localStorage", () => {
            expect(TokenService.getUser()).toBeNull();
        });
    });

    describe("setUser", () => {
        it("should set the user in localStorage", () => {
            const mockUser = {
                accessToken: "oldAccessToken",
                refreshToken: "mockRefreshToken",
            };

            TokenService.setUser(mockUser);
            const storedUser = JSON.parse(localStorage.getItem("user") || "");
            expect(storedUser).toEqual(mockUser);
        });
    });

    describe("removeUser", () => {
        it("should remove the user from localStorage", () => {
            localStorage.setItem("user", JSON.stringify({ username: "testUser" }));
            TokenService.removeUser();
            expect(localStorage.getItem("user")).toBeNull();
        });
    });
});
