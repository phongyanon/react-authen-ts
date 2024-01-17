import axios from "axios";
import { BaseURL, BaseTimeout } from "../utils/axios";

export const uploadImageProfile = async (base64Url: string, user_id: string, access_token: string | null) => {
	try {
		const options = {
			headers: {
				"Content-Type": "multipart/form-data",
				'Authorization': `Bearer ${access_token}`
			},
			timeout: BaseTimeout
		};

		const now = Date.now();
		const fileData = base64Url;
		const resp = await fetch(fileData);
		const fblob = await resp.blob();
		const file = new File([fblob], `user_profile_${user_id}_${now.toString()}.jpg`, {type: 'image/jpg'});  
		const formData = new FormData();
		formData.append("image_file", file);

		let res = await axios.post(`${BaseURL}/upload/profile/image/${user_id}`, formData, options);
    if ((res.status === 200) && res.data) {
			return res.data;
		} else {
			return false;
		}
	} catch (err: any) {
		console.log('uploadImageProfile: ', err);
    return(err.response.data)
	}
}