import { api } from "../utils/axios";
import { ISignin, IReqResetPassword, INewPassword } from "../types/authen.type";

export const signin = async (body: ISignin) => {
	try {
		let res = await api.post('/signin', body);
    if ((res.status === 200) && res.data) {
			return res.data;
		} else {
			return false;
		}
	} catch (err: any) {
		console.log('signin err: ', err);
    throw(err.response.data)
	}
}

export const signout = async () => {
	try {
		let res = await api.post('/signout', {});
		localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    if ((res.status === 200) && res.data) {
			return res.data;
		} else {
			return false;
		}
	} catch (err: any) {
		console.log('signout err: ', err)
    return(err.response.data)
	}
}

export const requestResetPasswordEmail = async (body: IReqResetPassword) => {
	try {
		let res = await api.post('/password/reset/generate', body);
    if ((res.status === 200) && res.data) {
			return res.data;
		} else {
			return false;
		}
	} catch (err: any) {
		console.log('requestResetPasswordEmail: ', err);
    return(err.response.data)
	}
}

export const updateForgotPassword = async (body: INewPassword, user_id: string, token: string) => {
	try {
		let res = await api.put(`/reset/password/${user_id}/${token}`, body);
    if ((res.status === 200) && res.data) {
			return res.data;
		} else {
			return false;
		}
	} catch (err: any) {
		console.log('updateForgotPassword: ', err);
    return(err.response.data)
	}
}