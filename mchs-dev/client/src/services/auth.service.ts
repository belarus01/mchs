import axios from "axios"
import { API_URL } from "../shared/constants"

export const signIn = async (login: string, password: string) =>{
    const response = await axios
        .post(API_URL + "auth/login", {
            login,
            password,
        });
    if (response.data.token) {
        console.log(response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data));
        return true;
    }
    return false;
}

export const logout = () => {
    localStorage.removeItem("user");
}

export const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
  
    return null;
  };