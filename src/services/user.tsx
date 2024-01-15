import { api } from "../utils/axios";
import { getTokenDecode } from "../utils/token";
import { ITokenDecode, IUserForm, IProfileForm } from "../types/user.type";

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

			let profile_res = await api.get(`/user/profile/${uid}`);

			if ((profile_res.status === 200) && (profile_res.data)) {
				return {image_profile: profile_res.data.image_profile};
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

export const registerProfile = async (body: IProfileForm) => {
	try {
		let res = await api.post(`/user/profile/${body.user_id}`, body);
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