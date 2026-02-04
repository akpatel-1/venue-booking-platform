import { adminApi } from "../api/admin.api";
import { redirect } from "react-router-dom";

export async function protectAdminRoute() {
  try {
    await adminApi.checkSession();
    return null;
  } catch (error) {
    if (!error.response) {
      return redirect("/error/503");
    }

    const status = error.response.status;

    if (status === 401) return redirect("/admin/login");
    if (status === 403) return redirect("/error/403");
    if (status === 503) return redirect("/error/503");

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
