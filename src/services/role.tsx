import { api } from "../utils/axios";

export const getRolesByUserId = async (id: string) => {
	try {
		let res = await api.get(`/role/user/${id}`);

		if ((res.status === 200) && (res.data)) {
			return res.data;
		} else {
			return null
		}
		
	} catch (err: any) {
		console.log('getRolesByUserId: ', err);
    return(err.response)
	}
}


export const getRoles = async () => {
	try {
		let res = await api.get(`/roles`);

		if ((res.status === 200) && (res.data)) {
			return res.data;
		} else {
			return null
		}
		
	} catch (err: any) {
		console.log('getRoles: ', err);
    return(err.response)
	}
}