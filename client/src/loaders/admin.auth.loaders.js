import { redirect } from "react-router-dom";
import { adminApi } from "../api/admin.api";

export async function protectAdminRoute() {
  try {
    await adminApi.checkSession();
    return null;
  } catch (error) {
    if (error.response?.status === 401) {
      throw redirect("/admin/login");
    }
    throw error;
  }
}

export async function redirectAdminLogin() {
  try {
    await adminApi.checkSession();
    throw redirect("/admin/dashboard");
  } catch (error) {
    if (error.response?.status === 401) {
      return null;
    }
    throw error;
  }
}
