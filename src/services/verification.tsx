import { api } from "../utils/axios";

export const getVerificationByUserId = async (id: string) => {
	try {
		let res = await api.get(`/user/verification/${id}`);

		if ((res.status === 200) && (res.data)) {
			return res.data;
		} else {
			return null
		}
		
	} catch (err: any) {
		console.log('getVerificationByUserId: ', err);
    return(err.response.data)
	}
}

export const deleteVerification = async (id: string) => {
	try {
		let res = await api.delete(`/verification/${id}`);

		if ((res.status === 200) && (res.data)) {
			return res.data;
		} else {
			throw 'Unsuccessfully'
		}
		
	} catch (err: any) {
		console.log('deleteVerification: ', err);
    throw err.response
	}
}