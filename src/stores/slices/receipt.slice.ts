import apis from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export interface Receipt {
    id: number;
    productId: number;
    total: number;
    userId: number;
    createAt: string;
    doneAt: string;
    status: string;
    receiptDetail: {
        id: number,
        productId: number ,
        quantity: number,
        note: string
    }[];
}

export interface ReceiptState {
    cart: Receipt | null;
    receipts: Receipt[] | null;
    loading: boolean;
    
}

let initialState: ReceiptState = {
    cart: null,
    receipts: null,
    loading: false   
}

const receiptSlice = createSlice({
    name: 'receipt',
    initialState,
    reducers: {
        setData: (state, action) => {
            let temp: Receipt[] = [];
            for (let i = 0; i < action.payload.length; i++) {
                if (action.payload[i].status == "SHOPPING") {
                    state.cart = action.payload[i];
                }else {
                    temp.push(action.payload[i]);
                }
            }
            state.receipts = temp;
        },
        addCart: (state, action) => {
            state.cart?.receiptDetail.push(action.payload);
        },
        updateCart: (state, action) => { 
            if (state.cart && state.cart.receiptDetail) {
                state.cart.receiptDetail = action.payload;
            }
            
        },
        deleteCart: (state, action) => {
            if(state.cart) {
                 state.cart?.receiptDetail.filter((item) => item.id !== action.payload)
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchData.fulfilled, (state, action) => {
            let temp: Receipt[] = [];
            for (let i = 0; i < action.payload.length; i++) {
                if (action.payload[i].status == "SHOPPING") {

                    state.cart = action.payload[i];

                }else {
                    temp.push(action.payload);
                }
            }
            state.receipts = temp;
            state.loading = false;
        })
        
        builder.addCase(fetchData.rejected, (state) => {
            state.loading = true;
        })
    } 
})
export const fetchData = createAsyncThunk(
    'receipt/fetchData',
    async () => {
        let res = await apis.receipt.getAll();
    
        return res.data.data.data
    }
)

export const ReceiptReducer = receiptSlice.reducer;
export const ReceiptAction = {
    ... receiptSlice.actions,
    fetchData
}