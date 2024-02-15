export interface ISetting {
    id: string
    reset_password_interval: number,
    enable_reset_password_interval: boolean,
    enable_verify_email: boolean,
}

export interface IAddSetting {
	reset_password_interval?: number,
    enable_reset_password_interval?: boolean,
    enable_verify_email?: boolean,
}

export interface IUpdateSetting {
    id: string
	reset_password_interval?: number,
    enable_reset_password_interval?: boolean,
    enable_verify_email?: boolean,
}