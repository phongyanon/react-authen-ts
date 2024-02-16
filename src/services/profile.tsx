import { api } from "../utils/axios";
import { IAddProfile, IUpdateProfile } from "../types/profile.type";

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

export const getProfile = async (id: string) => {
	try {
		let res = await api.get(`/profile/${id}`);

		if ((res.status === 200) && (res.data)) {
			return res.data
		} else {
			return null
		}
		
	} catch (err: any) {
		console.log('getProfile: ', err);
    return(err.response.data)
	}
}

export const addProfile = async (body: IAddProfile) => {
	try {
		let res = await api.post(`/profile`, body);
    if ((res.status === 201) && res.data) {
			return res.data;
		} else {
			return false;
		}
	} catch (err: any) {
		console.log('addProfile: ', err);
    throw (err.response.data)
	}
}

export const updateProfile = async (body: IUpdateProfile) => {
	try {
		let res = await api.put(`/profile/${body.profile_id}`, body);
    if ((res.status === 200) && res.data) {
			return res.data;
		} else {
			return false;
		}
	} catch (err: any) {
		console.log('updateProfile: ', err);
    throw (err.response.data)
	}
}

export const updateProfileByUserId = async (body: IUpdateProfile) => {
	try {
		let res = await api.put(`/user/profile/${body.user_id}`, body);
    if ((res.status === 200) && res.data) {
			return res.data;
		} else {
			return false;
		}
	} catch (err: any) {
		console.log('updateProfileByUserId: ', err);
    throw (err.response.data)
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

export const getProfilesPagination = async (page: number, limit: number) => {
	try {
		let res = await api.get(`/pagination/profiles`, { params: { page: page, limit: limit } });
    if ((res.status === 200) && res.data) {
			return res.data;
		} else {
			return false;
		}
	} catch (err: any) {
		console.log('getProfilesPagination: ', err);
    return(err.response.data)
	}	
}