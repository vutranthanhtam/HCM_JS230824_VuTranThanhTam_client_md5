import apis from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export interface Category {
    id: number;
    name: string;
    createAt: string;
    updateAt: string;
    image: string;
}

export interface CategoryState {
    data: Category[] | null;
    loading: boolean;
    
}

let initialState: CategoryState = {
    data: null,
    loading: false,
    
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        addNewCategory: (state, action) => {
            state.data?.push(action.payload);
        },
        deleteCategory: (state, action) => {
            if(state.data) {
                state.data = state.data.filter(item => item.id !== action.payload);
            }
        },
        updateCategory: (state, action) => {
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
    'category/fetchData',
    async () => {
        let res = await apis.category.getAll();
        return res.data.data
    }
)

export const CategoryReducer = categorySlice.reducer;
export const CategoryAction = {
    ... categorySlice.actions,
    fetchData
}