import { api } from "../utils/axios";

export const getProfileByUserId = async (id: string) => {
	try {
		let res = await api.get(`/user/profile/${id}`);

		if ((res.status === 200) && (res.data)) {
			return res.data
		} else {
			return null
		}
		
	} catch (err: any) {
		console.log('getProfileByUserId: ', err);
    return(err.response.data)
	}
}

export const deleteProfile = async (id: string) => {
	try {
		let res = await api.delete(`/profile/${id}`);

		if ((res.status === 200) && (res.data)) {
			return res.data;
		} else {
			throw 'Unsuccessfully'
		}
		
	} catch (err: any) {
		console.log('deleteProfile: ', err);
    throw err.response
	}
}