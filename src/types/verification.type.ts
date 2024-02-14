export interface IVerification {
	id: string
	user_id: string
	reset_password_token: string | null
	reset_password_token_expires_at: number | null
	verify_email_token: string | null
	verify_email_token_expires_at: number | null
	email_verified: boolean
	enable_opt: boolean
	otp_secret: string | null
	otp_verified: boolean
	token_salt: string
}

export interface IVerificationWithUser extends IVerification {
	username?: string
}

export interface IAddVerification {
	user_id: string
	email_verified: boolean
	enable_opt: boolean
	otp_verified: boolean
}

export interface IUpdateVerification extends IAddVerification {
	id: string | undefined
}
