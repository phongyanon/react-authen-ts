import { api } from "../utils/axios";
import { IUpdateSetting, IAddSetting } from '../types/setting.type';

export const getSettings = async () => {
	try {
		let res = await api.get(`/settings`);

		if ((res.status === 200) && (res.data)) {
			return res.data;
		} else {
			throw 'Unsuccessfully'
		}
		
	} catch (err: any) {
		console.log('getSettings: ', err);
    return(err.response.data)
	}
}

export const getSetting = async (id: string) => {
	try {
		let res = await api.get(`/setting/${id}`);

		if ((res.status === 200) && (res.data)) {
			return res.data;
		} else {
			throw 'Unsuccessfully'
		}
		
	} catch (err: any) {
		console.log('getSetting: ', err);
    return(err.response.data)
	}
}

export const addSetting = async (body: IAddSetting) => {
	try {
		let res = await api.post(`/setting`, body);
    if ((res.status === 201) && res.data) {
			return res.data;
		} else {
			return false;
		}
	} catch (err: any) {
		console.log('addSetting: ', err);
    throw (err.response.data)
	}
}

export const updateSetting = async (body: IUpdateSetting) => {
	try {
		let res = await api.put(`/setting/${body.id}`, body);
    if ((res.status === 200) && res.data) {
			return res.data;
		} else {
			return false;
		}
	} catch (err: any) {
		console.log('updateSetting: ', err);
    throw (err.response.data)
	}
}
