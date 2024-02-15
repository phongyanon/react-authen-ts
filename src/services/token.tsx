import { api } from "../utils/axios";
import { IAddToken, IUpdateToken } from "../types/token.type";
export const getTokenByUserId = async (id: string) => {
	try {
		let res = await api.get(`/user/tokens/${id}`);

		if ((res.status === 200) && (res.data)) {
			return res.data;
		} else {
			return null
		}
		
	} catch (err: any) {
		console.log('getTokenByUserId: ', err);
    return(err.response.data)
	}
}


export const getTokens = async () => {
	try {
		let res = await api.get(`/tokens`);

		if ((res.status === 200) && (res.data)) {
			return res.data;
		} else {
			throw 'Unsuccessfully'
		}
		
	} catch (err: any) {
		console.log('getTokens: ', err);
    return(err.response.data)
	}
}

export const getToken = async (id: string) => {
	try {
		let res = await api.get(`/token/${id}`);

		if ((res.status === 200) && (res.data)) {
			return res.data;
		} else {
			throw 'Unsuccessfully'
		}
		
	} catch (err: any) {
		console.log('getToken: ', err);
    return(err.response.data)
	}
}

export const getTokensPagination = async (page: number, limit: number) => {
	try {
		let res = await api.get(`/pagination/tokens`, { params: { page: page, limit: limit } });
    if ((res.status === 200) && res.data) {
			return res.data;
		} else {
			return false;
		}
	} catch (err: any) {
		console.log('getTokensPagination: ', err);
    throw(err.response.data)
	}	
}

export const addToken = async (body: IAddToken) => {
	try {
		let res = await api.post(`/token`, body);
    if ((res.status === 201) && res.data) {
			return res.data;
		} else {
			return false;
		}
	} catch (err: any) {
		console.log('addToken: ', err);
    throw (err.response.data)
	}
}

export const updateToken = async (body: IUpdateToken) => {
	try {
		let res = await api.put(`/token/${body.id}`, body);
    if ((res.status === 200) && res.data) {
			return res.data;
		} else {
			return false;
		}
	} catch (err: any) {
		console.log('updateToken: ', err);
    throw (err.response.data)
	}
}

export const deleteToken = async (id: string) => {
	try {
		let res = await api.delete(`/token/${id}`);

		if ((res.status === 200) && (res.data)) {
			return res.data;
		} else {
			throw 'Unsuccessfully'
		}
		
	} catch (err: any) {
		console.log('deleteToken: ', err);
    throw err.response
	}
}