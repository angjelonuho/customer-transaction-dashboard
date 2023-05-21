export type LoginTypes = {
    username: string
    password: string
}

export type LocalStorageUserTypes = {
    accessToken: string
    refreshToken: string
} | null