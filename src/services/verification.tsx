import { api } from "../utils/axios";
import { IAddVerification, IUpdateVerification } from "../types/verification.type";
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


export const getVerifications = async () => {
	try {
		let res = await api.get(`/verifications`);

		if ((res.status === 200) && (res.data)) {
			return res.data;
		} else {
			throw 'Unsuccessfully'
		}
		
	} catch (err: any) {
		console.log('getVerifications: ', err);
    return(err.response.data)
	}
}

export const getVerification = async (id: string) => {
	try {
		let res = await api.get(`/verification/${id}`);

		if ((res.status === 200) && (res.data)) {
			return res.data;
		} else {
			throw 'Unsuccessfully'
		}
		
	} catch (err: any) {
		console.log('getVerification: ', err);
    return(err.response.data)
	}
}

export const getVerificationsPagination = async (page: number, limit: number) => {
	try {
		let res = await api.get(`/pagination/verifications`, { params: { page: page, limit: limit } });
    if ((res.status === 200) && res.data) {
			return res.data;
		} else {
			return false;
		}
	} catch (err: any) {
		console.log('getVerificationsPagination: ', err);
    throw(err.response.data)
	}	
}

export const addVerification = async (body: IAddVerification) => {
	try {
		let res = await api.post(`/verification`, body);
    if ((res.status === 201) && res.data) {
			return res.data;
		} else {
			return false;
		}
	} catch (err: any) {
		console.log('addVerification: ', err);
    throw (err.response.data)
	}
}

export const updateVerification = async (body: IUpdateVerification) => {
	try {
		let res = await api.put(`/verification/${body.id}`, body);
    if ((res.status === 200) && res.data) {
			return res.data;
		} else {
			return false;
		}
	} catch (err: any) {
		console.log('updateVerification: ', err);
    throw (err.response.data)
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