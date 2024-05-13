import axios from "axios";

export interface CreateReceipt {
    id: number;
    total: number;
    userId: number;
    createAt: string;
    productId: number;
    status: string;
    detail: [];
}

export interface UpdateReceipt {
    id: number;
    total: number;
    userId: number;
    createAt: string;
    productId: number;
    status: string;
    detail: [];
}

const prefix = "receipt"
const version = "1"

export const receiptApi = {
    getAll: async () => {
        return await axios.get(`${import.meta.env.VITE_HOST}/api/v${version}/${prefix}`,)
    },
    create: async (data: CreateReceipt) => {
        return await axios.post(`${import.meta.env.VITE_HOST}/api/v${version}/${prefix}`, data)
    },
    // addToCart: async (data: UpdateReceipt, patchData : any ) => {
    //     return await axios.patch(`${import.meta.env.VITE_HOST}/api/v${version}/${prefix}/${data.id}`, patchData)
    // }
    addToCart: async (productId: number) => {
        
        return await axios.post(`${import.meta.env.VITE_HOST}/api/v${version}/${prefix}/add-to-cart`, {
            productId
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
    },
    updateCart: async ( id: number, patchData: any) => {
       
        return await axios.put(`${import.meta.env.VITE_HOST}/api/v${version}/${prefix}/${id}`, patchData)
    },
    delete: async (id: number) => {
        return await axios.delete(`${import.meta.env.VITE_HOST}/api/v${version}/${prefix}/${id}`, )
    }
}