import axios from "axios";

export function getStationFeed() {
	let result: any = axios.get("https://api.waqi.info/feed/here/?token=938b156176c2261b5c8e4d65ef1100ebc99e59d3");
	if (result.status === 200) {
		return result.data;
	} else {
		return false;
	}
}