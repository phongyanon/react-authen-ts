export interface ISignin {
  username: string
	password: string
}

export interface ISigninForm extends ISignin{
  keepSignin: boolean
}