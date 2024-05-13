import { StoreType, dispatchApp } from '@/stores'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import apis from '@/apis'
import { CategoryAction } from '@/stores/slices/category.slice'
import { Button, ConfigProvider } from 'antd'
import { TinyColor } from '@ctrl/tinycolor'
import { UpdateCategory } from '@/apis/modules/category.api'
import CategoryUpdate from './components/CategoryUpdate'

export default function Category() {
  useEffect(() => {
    dispatchApp.dispatchCategory()
  }, [])
  const dispatch = useDispatch()
  const categoryStore = useSelector((store: StoreType) => store.categoryStore)

  async function handleDelete(categoryId: number) {
    const res = await apis.category.delete(categoryId)
    dispatch(CategoryAction.deleteCategory(res.data.data.id))
  }

  const [isModalUpdate, setIsModalUpdate] = useState(false)
  async function handleUpdate(data:UpdateCategory, categoryId: number) {
    const res = await apis.category.update(data, categoryId)
    setIsModalUpdate(!isModalUpdate)
    dispatch(CategoryAction.updateCategory(res.data.data.id))
  }

  const [updateCategory, setUpdateCategory] = useState(0)
  

  const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
  const colors3 = ['#40e495', '#30dd8a', '#2bb673'];
  const getHoverColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());
  
  return (
    <>
      <h1>CATEGORY</h1>
      <Table striped bordered hover className='table-category'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name Category</th>
            <th>Avatar</th>
            <th>Tools</th>
          </tr>
        </thead>
        <tbody>
          {
            categoryStore.data?.map((category, index) => {
              return (
                <tr key={Date.now() * Math.random()}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>
                    <img src={category.image} style={{ width: "60px", height: "60px", borderRadius: "50%" }} />
                  </td>
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
                        handleDelete(category.id)
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
                        handleUpdate({name: category.name, image: category.image} , category.id)
                        setUpdateCategory(category.id)
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
        isModalUpdate && <CategoryUpdate categoryUpdate = {updateCategory} setIsModalUpdate = {setIsModalUpdate} />
      }
    </>
  )
}
