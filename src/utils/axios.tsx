import axios, { InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}`,
  timeout: 5000
});

api.interceptors.request.use(function (request: InternalAxiosRequestConfig) {
  // Do something before request is sent
  let access_token: string | null = localStorage.getItem('access_token');
  if (access_token) {
    request.headers.set('Authorization', `Bearer ${access_token}`);
  }
  return request;
}, function (error: any) {
  // Do something with request error
  return Promise.reject(error);
});

api.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  return response;
}, async function (error: any) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  const originalRequest = error.config;
  const { response } = error;
  if (response && response.status) {
    const  { status } = response; // { status, data } = response;
    if ((status === 401) && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        let refresh_token: string | null = localStorage.getItem('refresh_token');
        let base_url: string = `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}`;
        const response = await axios.post(base_url + '/auth/refresh/tokens', { refresh_token: refresh_token});
        const data = response.data;

        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
        window.location.href='/signin';
      }
    }
  }
  return Promise.reject(error);
});

export { api }