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

export interface IRegisterState {
    uid: string
    email: string
    access_token: string
    refresh_token: string
}

export interface IProfileForm {
    user_id: string | undefined
    first_name_EN: string
	last_name_EN: string
	first_name_TH: string
	last_name_TH: string
	date_of_birth: number
	gender: string
	// other_gender: string
	address_EN: string
	address_TH: string
	zip_code: number,
	phone: string
    image_profile: string
}

export interface IUserList {
    id: string
    username: string
    email: string
    phone: string
    roles: string[]
    status: string
}

export interface IUser {
    id: string
    username: string
    password: string
    password_salt: string
    email: string
    is_sso_user: boolean
    sso_user_id: string | null
    sso_from: string | null
    status: string
}

export interface IUserWithRoles extends IUser {
    roles: string[]
}

export interface IAddUser {
    username: string
    password: string
    email: string
    role?: string
}

export interface ISignUpResp {
    message: string
    id: string
}

export interface IUpdateUser {
    id: string
    password?: string
    status: string | boolean
    role?: string
}