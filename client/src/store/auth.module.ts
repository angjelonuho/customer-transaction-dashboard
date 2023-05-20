import { LoginTypes } from "@/interface/auth/auth";
import AuthService from "@/services/api/auth/auth.service";
import TokenService from "@/services/api/auth/token.service"

const user = TokenService.getUser()

const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }: any, user: LoginTypes) {
            return AuthService.login(user).then(
                (user: any) => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                (error: any) => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit }: any) {
            AuthService.logout();
            commit('logout');
        },
        refreshToken({ commit }: any, accessToken: any) {
            commit('refreshToken', accessToken);
        }
    },
    mutations: {
        loginSuccess(state: { status: { loggedIn: boolean; }; user: LoginTypes; }, user: LoginTypes) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state: { status: { loggedIn: boolean; }; user: null; }) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state: { status: { loggedIn: boolean; }; user: null; }) {
            state.status.loggedIn = false;
            state.user = null;
        },
    }
};