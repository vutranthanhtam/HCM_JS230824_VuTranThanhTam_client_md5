import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { TinyColor } from '@ctrl/tinycolor'
import { StoreType, dispatchApp } from '@/stores';
import { Button, ConfigProvider } from 'antd';
import Category from '../category/Category';
import apis from '@/apis';
import { ProductAction } from '@/stores/slices/product.slice';
import { UpdateProduct } from '@/apis/modules/product.api';
import ProductUpdate from './components/ProductUpdate';





export default function Product() {

  useEffect(() => {
    dispatchApp.dispatchProduct()
  }, [])
  const dispatch = useDispatch()
  const productStore = useSelector((store: StoreType) => store.productStore);
  
  
  const categoryStore = useSelector((store: StoreType) => store.categoryStore);

  function getCategory(categoryId: number) {
    return (categoryStore.data as any[])?.find(item => item.id === categoryId);
  }
  
  async function handleDelete(productId: number) {
    const res = await apis.product.delete(productId)
    dispatch(ProductAction.deleteProduct(res.data.data.id))
  }

  const [isModalUpdate, setIsModalUpdate] = useState(false)
  async function handleUpdate(data:UpdateProduct, productId: number) {
    const res = await apis.product.update(data, productId)
    setIsModalUpdate(!isModalUpdate)
    dispatch(ProductAction.updateProduct(res.data.data.id))
  }

  const [updateProduct, setUpdateProduct] = useState(0)

  const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
  const colors3 = ['#40e495', '#30dd8a', '#2bb673'];
  const getHoverColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

  return (
    <>
      <h1>PRODUCT</h1>
      <Table striped bordered hover className='table-product'>
        <thead>
          <tr>
            <th>#</th>
            <th className='box-name'>Name Category</th>
            <th className='box-name'>Name Product</th>
            <th className='box-price'>Price</th>
            <th className='box-avatar'>Avatar</th>
            <th>Des</th>
            <th className='box-tools'>Tools</th>
          </tr>
        </thead>
        <tbody>
          {
            Array.isArray(productStore.data) && productStore.data?.map((product,index) => {
              return (
                <tr key={Date.now() * Math.random()}>
                  <td>{index + 1}</td>
                  <td >{categoryStore.data?.find(itemCategory => itemCategory.id == product.categoryId)?.name}</td>
                  <td >{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    <img src={product.image} style={{ width: "60px", height: "60px", borderRadius: "50%" }} />
                  </td>
                  <td>{product.description}</td>
                  <td className='btn'>
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
                      <Button onClick={() => {
                        handleDelete(product.id)
                      }} type="primary" size="large">
                        Delete
                      </Button>
                    </ConfigProvider>
                    <ConfigProvider
                      theme={{
                        components: {
                          Button: {
                            colorPrimary: `linear-gradient(90deg,  ${colors3.join(', ')})`,
                            colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(colors3).join(', ')})`,
                            colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(colors3).join(', ')})`,
                            lineWidth: 0,
                          },
                        },
                      }}
                    >
                      <Button onClick={() => {
                        setIsModalUpdate(true)
                        // handleUpdate(category.id)
                        setUpdateProduct(product.id)
                      }} type="primary" size="large">
                        Update
                      </Button>
                    </ConfigProvider>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      {
        isModalUpdate && <ProductUpdate productUpdate = {updateProduct} setIsModalUpdate = {setIsModalUpdate} />
      }
    </>
  );
}
