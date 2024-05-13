import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userActions, userReducer } from "./slices/user.slice";
import { CategoryAction, CategoryReducer } from "./slices/category.slice";
import { ProductAction, ProductReducer } from "./slices/product.slice";
import { ReceiptAction, ReceiptReducer } from "./slices/receipt.slice";


let RootReducer = combineReducers({
    userStore: userReducer,
    categoryStore: CategoryReducer,
    productStore: ProductReducer,
    receiptStore: ReceiptReducer
});

export type StoreType = ReturnType<typeof RootReducer>;

export const store = configureStore({
    reducer: RootReducer
})

store.dispatch(userActions.fetchData())
store.dispatch(CategoryAction.fetchData())
store.dispatch(ProductAction.fetchData())
store.dispatch(ReceiptAction.fetchData())

export const dispatchApp = {
    dispatchCategory: () =>{
        return store.dispatch(CategoryAction.fetchData())
    },
    dispatchProduct: () =>{
        return store.dispatch(ProductAction.fetchData())
    },
    dispatchReceipt: () =>{
        return store.dispatch(ReceiptAction.fetchData())
    }
}