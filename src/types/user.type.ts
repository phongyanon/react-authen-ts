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
    // role: ['user']
    status: string
}