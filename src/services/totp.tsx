import { api } from "../utils/axios";

export const generateTOTP = async (id: string) => {
	try {
		let res = await api.post(`/otp/generate`, {user_id: id});

		if ((res.status === 200) && (res.data)) {
			return res.data;
		} else {
			throw 'Unsuccessfully'
		}
		
	} catch (err: any) {
		console.log('generateTOTP: ', err);
		throw(err.response.data)
	}
}

export const verifyTOTP = async (id: string, token: string) => {
	try {
		let res = await api.post(`/otp/verify`, {user_id: id, token_otp: token});

		if ((res.status === 200) && (res.data)) {
			return res.data;
		} else {
			throw 'Unsuccessfully'
		}
		
	} catch (err: any) {
		console.log('verifyTOTP: ', err);
		throw(err.response.data)
	}
}

export const validateTOTP = async (id: string, token: string) => {
	try {
		let res = await api.post(`/otp/validate`, {user_id: id, token_otp: token});

		if ((res.status === 200) && (res.data)) {
			return res.data;
		} else {
			throw 'Unsuccessfully'
		}
		
	} catch (err: any) {
		console.log('verifyTOTP: ', err);
		throw(err.response.data)
	}
}

export const disableTOTP = async (id: string) => {
	try {
		let res = await api.post(`/otp/disable`, {user_id: id});

		if ((res.status === 200) && (res.data)) {
			return res.data;
		} else {
			throw 'Unsuccessfully'
		}
		
	} catch (err: any) {
		console.log('verifyTOTP: ', err);
		throw(err.response.data)
	}
}