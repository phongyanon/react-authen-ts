import { api } from "../utils/axios";
import { ISignin } from "../types/authen.type";

export const signin = async (body: ISignin) => {
	try {
		let res = await api.post('/signin', body);
    if ((res.status === 200)) {
			return res.data;
		} else {
			return false;
		}
	} catch (err: any) {
		console.log(err.toString());
    return(false)
	}
}