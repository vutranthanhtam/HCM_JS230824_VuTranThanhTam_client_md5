import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazyFn, lazyFnReal } from "./Lazy";

export default function RouteConfig() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={lazyFnReal(() => import('@pages/homes/Home'))}>
                    <Route path="*" element={lazyFn(() => import('@pages/homes/HomeContent'))}/>
                    <Route path="category/:name" element={lazyFn(() => import('@pages/categories/Category'))} />
                    <Route path="cart" element={lazyFn(() => import('@pages/components/carts/Cart'))} />
                </Route>
                <Route path="/authen" element={lazyFn(() => import('@pages/authens/Authen'), localStorage.getItem("token") == null ? true : false, '/')} />
                <Route path="/forgot-password" element={lazyFn(() => import('@/pages/forgot-password/ForgotPassword'))} />
                <Route path="/admin" element={lazyFn(() => import('@pages/admins/Admin'))}>
                    <Route path="/admin/category" element={lazyFn(() => import('@pages/admins/components/category/Category'))} />
                    <Route path="/admin/category/addnew" element={lazyFn(() => import('@pages/admins/components/category/components/CategoryCreate'))} />
                    <Route path="/admin/product" element={lazyFn(() => import('@pages/admins/components/product/Product'))} />
                    <Route path="/admin/product/addnew" element={lazyFn(() => import('@pages/admins/components/product/components/ProductCreate'))} />
                </Route>   
            </Routes>
        </BrowserRouter>
    )
}   