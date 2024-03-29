import axios from "axios";
import { api, BaseURL, BaseTimeout } from "../utils/axios";
import { getTokenDecode } from "../utils/token";
import { ITokenDecode, IUserForm, IProfileForm, IAddUser, IUpdateUser } from "../types/user.type";

export const getCurrentUser = async () => {
	try {
		const decode: ITokenDecode | null = getTokenDecode();
		if (decode !== null) {
			const { uid } = decode; 

			let user_res = await api.get(`/user/${uid}`);
			let role_res = await api.get(`/role/user/${uid}`);

			if ((user_res.status === 200) && (user_res.data) && 
					(role_res.status === 200) && (role_res.data)) {

				return {
					uid: uid,
					email: user_res.data.email,
					username: user_res.data.username,
					image_profile: null,
					roles: role_res.data
				};

			} else {
				return null;
			}
		} else {
			return null;
		}
		
	} catch (err: any) {
		console.log('getCurrentUser: ', err);
    return(err.response)
	}
}

export const getCurrentProfile = async () => {
	try {
		const decode: ITokenDecode | null = getTokenDecode();
		if (decode !== null) {
			const { uid } = decode; 

			let res = await api.get(`/user/profile/${uid}`);

			if ((res.status === 200) && (res.data)) {
				return {...res.data, image_profile: res.data.image_profile, profile_id: res.data.id};
			} else {
				return null;
			}
		} else {
			return null;
		}
		
	} catch (err: any) {
		console.log('getCurrentProfile: ', err);
    return(err.response)
	}
}

export const registerUser = async (body :IUserForm) => {
	try {
		let res = await api.post('/signup', {
			username: body.email,
			email: body.email,
			password: body.password
		});
    if ((res.status === 200) && res.data) {
			return res.data;
		} else {
			return false;
		}
	} catch (err: any) {
		console.log('registerUser: ', err);
    return(err.response.data)
	}
}

export const addUser = async (body :IAddUser) => {
	try {
		let res = await api.post('/signup', {
			username: body.username,
			email: body.email,
			password: body.password
		});
    if ((res.status === 200) && res.data) {
			return res.data;
		} else {
			return false;
		}
	} catch (err: any) {
		console.log('addUser: ', err);
    return(err.response.data)
	}
}

export const updateUser = async (body :IUpdateUser) => {
	try {
		let res = await api.put(`/user/${body.id}`, body);
    if ((res.status === 200) && res.data) {
			return res.data;
		} else {
			return false;
		}
	} catch (err: any) {
		console.log('updateUser: ', err);
    return(err.response.data)
	}
}


export const registerProfile = async (body: IProfileForm, access_token: string) => {
	try {
		const options = {
			headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${access_token}`
			},
			timeout: BaseTimeout
		};
		let res = await axios.post(`${BaseURL}/user/profile/${body.user_id}`, body, options);
    if ((res.status === 200) && res.data) {
			return res.data;
		} else {
			return false;
		}
	} catch (err: any) {
		console.log('registerProfile: ', err);
    return(err.response.data)
	}
}

export const getUsersPagination = async (page: number, limit: number) => {
	try {
		let res = await api.get(`/pagination/users`, { params: { page: page, limit: limit } });
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

export const getUser = async (id: string) => {
	try {
		let res = await api.get(`/user/${id}`);
    if ((res.status === 200) && res.data) {
			return res.data;
		} else {
			return false;
		}
		
	} catch (err: any) {
		console.log('getUser: ', err);
    return(err.response)
	}
}

export const deleteUser = async (id: string) => {
	try {
		let res = await api.delete(`/user/${id}`);

		if ((res.status === 200) && (res.data)) {
			return res.data;
		} else {
			throw 'Unsuccessfully'
		}
		
	} catch (err: any) {
		console.log('deleteUser: ', err);
    throw err.response
	}
}

export const getUsers = async () => {
	try {
		let res = await api.get(`/users`);
    if ((res.status === 200) && res.data) {
			return res.data;
		} else {
			return false;
		}
		
	} catch (err: any) {
		console.log('getUsers: ', err);
    return(err.response)
	}
}