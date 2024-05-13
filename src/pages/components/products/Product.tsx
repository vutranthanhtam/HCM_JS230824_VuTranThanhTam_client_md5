import apis from '@/apis'
import { StoreType, dispatchApp } from '@/stores'
import { ReceiptAction } from '@/stores/slices/receipt.slice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Product() {
    // useEffect(() => {
    //     if(receiptStore == null)
    //     dispatchApp.dispatchReceipt()
    // },[])

    
    const dispatch = useDispatch()
    const productStore = useSelector((store: StoreType) => store.productStore)
    const categoryStore = useSelector((store: StoreType) => store.categoryStore)
    const userStore = useSelector((store: StoreType) => store.userStore)
    const receiptStore = useSelector((store: StoreType) => store.receiptStore)
   

    useEffect(() => {
    }, [userStore])

    // async function handleAddToCart(productId: number) {
    //     try {
    //         if (!userStore.data) {
    //             alert("Login please!")
    //             return
    //         }

    //         if (userStore.data) {
    //             dispatch(ReceiptAction.addCart({
    //                 id: 1,
    //                 productId: 1,
    //                 quantity: 1,
    //                 note: 'string'
    //             }))


    //             let itemExisted = receiptStore.cart?.receiptDetail.find((item) => item.productId == productId)
    //             let patchData = null
    //             if (itemExisted) {
    //                 patchData = {    
    //                     receiptDetail: [{
    //                         ...receiptStore.cart?.receiptDetail.map(item => {
    //                             if (item.productId == productId) {
    //                                 return {
    //                                     ...item,
    //                                     quantity: item.quantity + 1
    //                                 }
    //                             }
    //                             return item
    //                         })
    //                     }]
    //                 }
    //                 patchData = {
    //                     ...receiptStore.cart,
    //                     receiptDetail: receiptStore.cart?.receiptDetail.map(item => {
    //                         if (item.productId == productId) {
    //                             return {
    //                                 ...item,
    //                                 quantity: item.quantity + 1
    //                             }
    //                         }
    //                     })
    //                 }


    //                 let resUpdate= await apis.receipt.updateCart(itemExisted.id, patchData)

    //                 dispatch(ReceiptAction.updateCart(resUpdate.data.data))
    // } else {

    //     patchData = {
    //         receiptDetail: [{
    //             ...receiptStore.cart?.receiptDetail,
    //             id: String(Math.ceil(Math.random() * Date.now())),
    //             productId,
    //             quantity: 1,
    //             note: null
    //         }]

    //     }
    //     console.log('patchData', patchData)
    //     apis.receipt.addToCart(productId)
    //     .then((res) => {
    //         if (res.status == 200)
    //             console.log('da vao res',res.data)
    //             dispatch(ReceiptAction.addCart(res.data.data))
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // }

    //             // apis.receipt.addToCart(productId)
    //             //     .then((res) => {
    //             //         if (res.status == 200)
    //             //             console.log('da vao res',res.data)
    //             //             dispatch(ReceiptAction.addCart(patchData))
    //             //     })
    //             //     .catch((err) => {
    //             //         console.log(err);
    //             //     })
    //         } 
    //         else {
    //             let newReceipt = {
    //                 id: String(Math.ceil(Math.random() * Date.now())),
    //                 userId: receiptStore.cart?.userId,
    //                 createAt: String(Date.now()),
    //                 status: 'shopping',
    //                 doneAt: null,
    //                 receiptDetail: [
    //                     {
    //                         id: String(Math.ceil(Math.random() * Date.now())),
    //                         productId: productId,
    //                         quantity: 1,
    //                         note: null
    //                     }
    //                 ]
    //             }
    //             apis.receipt.create(newReceipt as any)
    //                 .then(res => {
    //                     if (res.status == 200) {
    //                         dispatch(ReceiptAction.addCart(newReceipt))
    //                     } else { }
    //                 })
    //                 .catch(err => {
    //                     console.log(err);
    //                 })
    //         }
    //     }catch (error) {
    //         console.log(error);
    //     }

    // }

    async function handleAddToCart(productId: number) {
        try {
            if (!userStore.data) {
                alert(" Vui lòng đăng nhập để mua hàng! ")
                return
            }

            if (userStore.data) {
                let itemExisted = receiptStore.cart?.receiptDetail.find((item) => item.productId == productId)
                let patchData = null
                if (itemExisted) {
                    patchData = {
                        receiptDetail: [
                            receiptStore.cart?.receiptDetail.map(item => {
                                if (item.productId == productId) {
                                    return {
                                        ...item,
                                        quantity: item.quantity + 1
                                    }
                                }
                                return item
                            })
                        ]
                    }
                    
                    let resUpdate = await apis.receipt.updateCart(itemExisted.id, patchData)
                  
                    dispatch(ReceiptAction.updateCart(resUpdate.data.data))
                } else {
                    patchData = {
                        receiptDetail: [{
                            ...receiptStore.cart?.receiptDetail,
                            id: String(Math.ceil(Math.random() * Date.now())),
                            productId,
                            quantity: 1,
                            note: null
                        }]
                    }
                }
                apis.receipt.addToCart(productId)
                    .then((res) => {
                        if (res.status == 200)
                        dispatch(ReceiptAction.addCart(res.data.data))
                    })
                    .catch((err) => {
                        console.log(err);
                    })  
            } else {
                let newReceipt = {
                    id: String(Math.ceil(Math.random() * Date.now())),
                    userId: receiptStore.cart?.userId,
                    createAt: String(Date.now()),
                    status: 'shopping',
                    doneAt: null,
                    receiptDetail: [
                        {
                            id: String(Math.ceil(Math.random() * Date.now())),
                            productId: productId,
                            quantity: 1,
                            note: null
                        }
                    ]
                }
                apis.receipt.create(newReceipt as any)
                    .then(res => {
                        if (res.status == 200) {
                            dispatch(ReceiptAction.addCart(newReceipt))
                        } else { }
                    })
                    .catch(err => {
                        console.log(err);
                    })

            }

        } catch (error) {
            console.log(error);
        }
    }

   

    function getProductCategories(categoryID: number) {
        if (!productStore.data) return
        if (productStore.data) {
            let res = []
            for (let i in productStore.data) {

                if (productStore.data[i].categoryId == categoryID) {
                    res.push(productStore.data[i])
                }
                if (res.length >= 6) break
            }
            return res
        }

    }

    useEffect(() => {

    }, [receiptStore.cart, receiptStore.receipts])
    return (
        <>
            {
                categoryStore.data?.map((category, index) => {
                    return (
                        <div key={Date.now() * Math.random()} className='product_row' >
                            <div className='logo'><img src={category.image} style={{ width: "250px", height: "100px", }} /></div>
                            {
                                getProductCategories(category.id)?.map((product) => {
                                    if (index < 6) {
                                        return (
                                            <div key={Date.now() * Math.random()} className='product_box'>
                                                <div>
                                                    <img src={product.image} />
                                                </div>
                                                <div className='product_name'>
                                                    {product.name}
                                                </div>
                                                <div className='product_price'>
                                                    {product.price} VND
                                                </div>
                                                <div className='product_description'>
                                                    {product.description}
                                                </div>
                                                <div className='tools'>
                                                    <button onClick={() => {
                                                        handleAddToCart(product.id)
                                                    }} className='buy_btn'>Buy
                                                    </button>
                                                    <button className='detail_btn'>Detail</button>
                                                </div>
                                            </div>
                                            
                                        )
                                    } return
                                })
                            }
                        </div>

                    )
                })
            }
        </>
    )
}
