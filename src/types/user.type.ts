export interface IUserInfo {
    uid: string
    email: string
    username: string
    image_profile?: string
    roles: string[]
}

export interface ITokenDecode {
    uid: number | string
    username: string
    iat: number
    exp: number
}

export interface IUserForm {
    email: string
    password: string
}