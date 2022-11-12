import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT_URI,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("c_token");
    if (token!==undefined) return config;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      if (error.response?.data.error === "Expired Token") {
        API.auth.refreshToken();
      } else {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

API.auth = {
  login       : (data) => API.post(`/auth/login`, data),
  register    : (data) => API.post(`/auth/register`, data),
  chagePassword: (data) => API.post(`/auth/chagePassword`, data),
  logout      : () => API.post(`/auth/logout`, {}),
  checkToken  : (token) => API.post(`/auth/checkToken`, {token}),
  refreshToken: () => {}
};

API.dapps = {
  getList       : () => API.get(`/dapps/get`),
  saveAppInfo   : (data) => API.post(`/dapps/save`, data),
  deleteRowById : (rid) => API.post(`/dapps/delete`, { rid }),
};

API.tokens = {
  getData       : () => API.get(`/tokens/get`),
  saveData      : (data) => API.post(`/tokens/save`, data),
  deleteRowById : (rid) => API.post(`/tokens/delete`, { rid }),
};
export default API;
