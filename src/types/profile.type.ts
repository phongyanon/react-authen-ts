export interface IProfile {
    profile_id: string
    user_id: string
    first_name_EN: string
	last_name_EN: string
	first_name_TH: string
	last_name_TH: string
	date_of_birth: number
	gender: string
	address_EN: string
	address_TH: string
	zip_code: number,
	phone: string
    image_profile: string
}

export interface IAddProfile {
	user_id: string
    first_name_EN?: string
	last_name_EN?: string
	first_name_TH?: string
	last_name_TH?: string
	date_of_birth?: number
	gender?: string
	address_EN?: string
	address_TH?: string
	zip_code?: number
	phone?: string
	image_profile?: string
}

export interface IUpdateProfile extends IAddProfile {
	profile_id: string | undefined
}