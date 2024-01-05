import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}`,
  timeout: 5000
});

api.interceptors.request.use(function (config) {
  // Do something before request is sent
	console.log('config: ', config)
  return config;
}, function (error) {
  // Do something with request error
  return false;
});

export { api }