import apis from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Product {
    id: number;
    name: string;
    price: string;
    description: string;
    categoryId: number;
    createAt: string;
    updateAt: string;
    image: string;
}

export interface ProductState {
    data: Product[] | null;
    loading: boolean;
}

let initialState: ProductState = {
    data: null,
    loading: false,
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        addNewProduct: (state, action) => {
            state.data?.push(action.payload);
        },
        deleteProduct: (state, action) => {
            if(state.data) {
                state.data = state.data.filter(item => item.id !== action.payload);
            }
        },
        updateProduct: (state, action) => {
            if(state.data) {
                state.data = state.data.map(item => item.id === action.payload.id ? action.payload : item);
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchData.rejected, (state) => {
            state.loading = true;
        })
    } 
})

export const fetchData = createAsyncThunk(
    'product/fetchData',
    async () => {
        let res = await apis.product.getAll();
        return res.data.data.data
    }
)

export const ProductReducer = productSlice.reducer;
export const ProductAction = {
    ... productSlice.actions,
    fetchData
}