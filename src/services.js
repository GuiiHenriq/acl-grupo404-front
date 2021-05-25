import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://18.229.144.246:2000"
});

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  },
  post(endpoint, body) {
    return axiosInstance.post(endpoint, body);
  },
  put(endpoint, body) {
    return axiosInstance.put(endpoint, body);
  },
  delete(endpoint) {
    return axiosInstance.delete(endpoint);
  },
};

export const apiToken = {
  get(endpoint, token) {
    return axiosInstance.get(endpoint, { headers: { "x-access-token": token } });
  },
  post(endpoint, body, token) {
    return axiosInstance.post(endpoint, body, { headers: { "x-access-token": token } });
  },
  put(endpoint, body, token) {
    return axiosInstance.put(endpoint, body, { headers: { "x-access-token": token } });
  },
  delete(endpoint, token) {
    return axiosInstance.delete(endpoint, { headers: { "x-access-token": token } });
  },
};

export function getCep(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}