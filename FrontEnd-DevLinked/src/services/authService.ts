import type { LoginCredential, RegistrationData, User } from "../types/auths";
import apiClient from "./api";

export const registerUser = async (userData: RegistrationData): Promise<User> => {
    try {
        const response = await apiClient.post<User>('/auth/register', userData);
        return response.data;
    } catch(error) {
        console.error("Registerion failed:");
        throw error;
    }
}

export const loginUser = async (credential: LoginCredential): Promise<{ user: User; token: string }> => {
    try{
        const response = await apiClient.post<{ user: User; token: string }>('/auth/login', credential);
        if(response.data.token){
            localStorage.setItem('authToken', response.data.token);
        }
        return response.data;
    } catch(error) {
        console.log("Login failed");
        throw error;
    }
}

export const logoutUser = () => {
    localStorage.removeItem('authToken');
}