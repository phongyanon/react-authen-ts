import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ITokenDecode } from "../types/user.type";

export const getTokenDecode = () => {
	const token: string | null = localStorage.getItem('access_token');
	if (token !== null) {
		const decoded: ITokenDecode = jwtDecode(token);
		return decoded;
	} else {
		return null;
	}
}

export const setNewTokens = (refresh_token: string) => {
	let base_url: string = `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}`;
	axios.post(base_url + '/auth/refresh/tokens', { refresh_token: refresh_token}).then(response => {
		const data = response.data;
		localStorage.setItem('access_token', data.access_token);
		localStorage.setItem('refresh_token', data.refresh_token);
	}).catch(err => console.log('setNewTokens: ', err));
}