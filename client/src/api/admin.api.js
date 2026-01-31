import { axiosClient } from "../lib/axios.client";

export const adminApi = {
  login: (data) => axiosClient.post("/admin/login", data),
};
