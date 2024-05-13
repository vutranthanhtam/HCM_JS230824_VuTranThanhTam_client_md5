import { categoryApi } from "./modules/category.api"
import { productApi } from "./modules/product.api"
import { userApi } from "./modules/user.api"
import { receiptApi } from "./modules/receipt.api"


export default {
    user: userApi,
    category: categoryApi,
    product: productApi,
    // cart: cartApi,
    receipt: receiptApi

}