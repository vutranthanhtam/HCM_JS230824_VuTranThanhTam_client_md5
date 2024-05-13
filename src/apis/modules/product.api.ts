import axios from "axios";

export interface CreateProduct {
    name: string;
    price: number;
    description: string;
    image: string;
    categoryId: number; 
}

export interface UpdateProduct {
    name: string;
    price: number;
    description: string;
    image: string;
    categoryId: number;
}

export interface DeleteProduct {
    name: string;
    price: number;
    description: string;
    image: string;
}

const prefix = "product"
const version = "1"

export const productApi = {
    getAll: async () => {
        return await axios.get(`${import.meta.env.VITE_HOST}/api/v${version}/${prefix}`)
    },
    create: async (data: CreateProduct) => {
        return await axios.post(`${import.meta.env.VITE_HOST}/api/v${version}/${prefix}`, data)
    },
    update: async (data: UpdateProduct, id: number) => {
        return await axios.put(`${import.meta.env.VITE_HOST}/api/v${version}/${prefix}/${id}`, data)
    },
    delete: async (id: number) => {
        return await axios.delete(`${import.meta.env.VITE_HOST}/api/v${version}/${prefix}/${id}`, )
    }

}