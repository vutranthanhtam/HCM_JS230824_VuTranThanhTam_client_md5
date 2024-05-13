import axios from "axios";

export interface CreateUser {
    userName: string;
    password: string;
    email: string;
}

export interface LoginUser {
    userName: string;
    password: string;
}

export interface Token {
    token: string;
}

const prefix = "user"
const version = "1"

export const userApi = {
    register: async (data: CreateUser) => {
        return await axios.post(`${import.meta.env.VITE_HOST}/api/v${version}/${prefix}`, data)
    },
    login: async (data: LoginUser) => {
        return await axios.post(`${import.meta.env.VITE_HOST}/api/v${version}/${prefix}/login`, data)
    },
    token: async (data: Token) => {
        return await axios.post(`${import.meta.env.VITE_HOST}/api/v${version}/${prefix}/token`, data)
    }
}