import { api } from "../utils/axios";
import { IUpdateUserRole } from "../types/userRole.type";

export const getUserRoleByUserId = async (id: string) => {
	try {
		let res = await api.get(`/userRole/user/${id}`);

		if ((res.status === 200) && (res.data)) {
			return res.data;
		} else {
			return null
		}
		
	} catch (err: any) {
		console.log('getRolesByUserId: ', err);
    throw err.response.data
	}
}

export const updateUserRole = async (body: IUpdateUserRole) => {
	try {
		let res = await api.put(`/userRole/${body.id}`, {
			id: body.id,
			user_id: body.user_id,
			role_id: body.role_id
		});
    if ((res.status === 200) && res.data) {
			return res.data;
		} else {
			return false;
		}
	} catch (err: any) {
		console.log('updateUserRole: ', err);
    throw err.response.data
	}
}

export const deleteUserRole = async (id: string) => {
	try {
		let res = await api.delete(`/userRole/${id}`);

		if ((res.status === 200) && (res.data)) {
			return res.data;
		} else {
			throw 'Unsuccessfully'
		}
		
	} catch (err: any) {
		console.log('deleteUserRole: ', err);
    throw err.response
	}
}