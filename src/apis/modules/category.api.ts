import axios from "axios";

export interface CreateCategory {
    name: string;
    image: string;
}

export interface UpdateCategory {
    name: string;
    image: string;
}

export interface DeleteCategory {
    name: string;
    image: string;
}


const prefix = "category"
const version = "1"

export const categoryApi = {
    getAll: async () => {
        return await axios.get(`${import.meta.env.VITE_HOST}/api/v${version}/${prefix}`)
    },
    create: async (data: CreateCategory) => {
        return await axios.post(`${import.meta.env.VITE_HOST}/api/v${version}/${prefix}`, data)
    },
    update: async (data: UpdateCategory, id: number) => {
        return await axios.put(`${import.meta.env.VITE_HOST}/api/v${version}/${prefix}/${id}`, data)
    },
    delete: async (id: number) => {
        return await axios.delete(`${import.meta.env.VITE_HOST}/api/v${version}/${prefix}/${id}`, )
    }

}