import { api } from "../utils/axios";

export const getProfileByUserId = async (id: string) => {
	try {
		let profile_res = await api.get(`/user/profile/${id}`);

		if ((profile_res.status === 200) && (profile_res.data)) {
			return {image_profile: profile_res.data.image_profile};
		} else {
			return null
		}
		
	} catch (err: any) {
		console.log('getProfileByUserId: ', err);
    return(err.response)
	}
}