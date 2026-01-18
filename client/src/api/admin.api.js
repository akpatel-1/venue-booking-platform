import axiosClient from "../lib/axios.client";

const adminApi = {
    login: (data) => axiosClient.post('/admin/login', data), 
}

export default adminApi;