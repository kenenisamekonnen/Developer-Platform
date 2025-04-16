import apiClient from "./api";
import { User } from "../types/auths";

export const getAllUsers = async (): Promise<User[]> => {
    try{
        const response = await apiClient.get('auth/users');
        return response.data;
    } catch(error){
        console.error("Failed to fetch users");
        throw error;
    }
};