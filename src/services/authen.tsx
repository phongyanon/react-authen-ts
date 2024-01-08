import { api } from "../utils/axios";
import { ISignin } from "../types/authen.type";

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
    return(err.response.data)
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