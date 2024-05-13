import React, { useEffect } from 'react'
import './cart.scss'
import { useDispatch, useSelector } from 'react-redux'
import { StoreType, dispatchApp } from '@/stores'
import { Table } from 'react-bootstrap';
import { TinyColor } from '@ctrl/tinycolor'
import { Button, ConfigProvider } from 'antd';


export default function Cart() {

  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatchApp.dispatchReceipt()
  // }, [])
  const productStore = useSelector((store: StoreType) => store.productStore)
  const categoryStore = useSelector((store: StoreType) => store.categoryStore)
  const userStore = useSelector((store: StoreType) => store.userStore)
  const receiptStore = useSelector((store: StoreType) => store.receiptStore)

  const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
  const colors3 = ['#40e49', '#30dd8', '#2bb671'];
  const getHoverColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

  function handleDeleteProduct() {
    
  }

  return (
    <>
      <h3>Your Cart id: {receiptStore.cart?.userId} </h3>

      <Table striped bordered hover className='table-product'>
        <thead>
          <tr>
            <th className='box-number'>#</th>
            <th className='box-avatar'>Avatar</th>
            <th className='box-nameProduct'>Product</th>
            <th className='box-price'>Price</th>
            <th className='box-quantity'>Quantity</th>
            <th className='box-total'>Total</th>
            <th className='box-tool'>Tools</th>
          </tr>
        </thead>
        <div className='btn-cart'>
              <ConfigProvider 
                theme={{
                  components: {
                    Button: {
                      colorPrimary: `linear-gradient(135deg, ${colors3.join(', ')})`,
                      colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors3).join(', ')})`,
                      colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors3).join(', ')})`,
                      lineWidth: 0,
                    },
                  },
                }}
              >
                <Button type="primary" size="large" >
                  Thành tiền
                </Button>
              </ConfigProvider>
            </div>
        <tbody>

          {
            receiptStore.cart?.receiptDetail.map((item, index) => {
              return (
                <tr key={Date.now() * Math.random()}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={productStore.data?.find((product) => product.id === item.productId)?.image} />
                  </td>
                  <td>{productStore.data?.find((product) => product.id === item.productId)?.name}</td>
                  <td>{productStore.data?.find((product) => product.id === item.productId)?.price}</td>
                  <td>{item.quantity}</td>
                  <td>{Number(productStore.data?.find((product) => product.id === item.productId)?.price) * (item.quantity)} </td>
                  <td >
                    <ConfigProvider
                      theme={{
                        components: {
                          Button: {
                            colorPrimary: `linear-gradient(135deg, ${colors2.join(', ')})`,
                            colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors2).join(', ')})`,
                            colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors2).join(', ')})`,
                            lineWidth: 0,
                          },
                        },
                      }}
                    >
                      <Button type="primary" size="large" >
                        Delete
                      </Button>
                    </ConfigProvider>
                  </td>
                </tr>

              )
            })
          }

        </tbody>
      </Table>
    </>
  )
}
