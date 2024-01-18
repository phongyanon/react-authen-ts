export interface ISignin {
  username: string
	password: string
}

export interface IReqResetPassword {
  email: string
}

export interface INewPassword {
  new_password: string
}