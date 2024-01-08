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
