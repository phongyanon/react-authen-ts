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
}

export interface IProfileForm {
    user_id: string | undefined
    firstname_en: string
	lastname_en: string
	firstname_th: string
	lastname_th: string
	date_of_birth: number
	gender: string
	other_gender: string
	address_en: string
	address_th: string
	zip_code: number,
	phone: string
    image_profile: string
}