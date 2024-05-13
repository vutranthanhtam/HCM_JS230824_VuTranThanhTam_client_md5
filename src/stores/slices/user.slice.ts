import apis from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface User {
    id: number;
    userName: string;
    password: string;
    email: string;
    emailConfirm: boolean;
    createAt: string;
    updateAt: string;
    role: string;
}

export interface UserState {
   data: User | null;
   loading: boolean;
}


let initialState: UserState = {
    data: null,
    loading: false   
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
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

const fetchData = createAsyncThunk(
    'user/fetchData',
    async () => {
        let res = await apis.user.token({
            token: localStorage.getItem("token") || "null"
        });
        return res.data.data
    }
)

export const userReducer = userSlice.reducer;
export const userActions = {
    ... userSlice.actions,
    fetchData
};