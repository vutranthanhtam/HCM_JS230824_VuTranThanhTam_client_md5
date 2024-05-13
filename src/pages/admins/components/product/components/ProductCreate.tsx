import apis from '@/apis';

import { CreateProduct } from '@/apis/modules/product.api';
import { StoreType } from '@/stores';
import { CategoryAction } from '@/stores/slices/category.slice';
import { ProductAction } from '@/stores/slices/product.slice';
import { Modal } from 'antd';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



export default function ProductCreate() {
  const [imagePreview, setImagePreview] = useState<string>("https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const productStore = useSelector((store: StoreType) => store.productStore);
  const categoryStore = useSelector((store: StoreType) => store.categoryStore);

  const dispatch = useDispatch();
  async function handleCreateProduct(e: React.FormEvent) {
    e.preventDefault();
    let data: CreateProduct = {
      name: (e.target as any).name.value,
      categoryId: (e.target as any).categoryId.value,
      price: Number((e.target as any).price.value),
      description: (e.target as any).description.value,
      image: (e.target as any).image.value,
    }
    apis.product.create(data)
    .then((res) => {
      Modal.success({
        title: 'Thông báo!',
        content: res.data.message,
        onOk: () => {
          window.location.href = '/admin/product'
        }
      })
    })
    .catch((err) => {
      Modal.error({
        title: 'Thông báo!',
        content: err?.response?.data?.message || " Lỗi hệ thống! ",
      })
    })
    const res = await apis.product.create(data)
    dispatch(ProductAction.addNewProduct(res.data.data))
    
  }
  return (
    <div className='category_create'>
      <form onSubmit={(e) => {
        handleCreateProduct(e)
      }}>
        <div className='btn_box'>
          <h3>PRODUCT CREATE</h3>
          <button onClick={(e) => {
            e.preventDefault();
            window.location.href = '/admin/category'
          }}>X</button>
        </div>
        <div className='btn_box_name'>
          Product Name <input name='name' type="text" />
        </div>
        <div className='btn_box_name'>
          Price <input name='price' type="number" />
        </div>
        <div className='btn_box_name'>
          Description <textarea name="description" cols={30} rows={3}></textarea>
        </div>
        <div className='btn_box_avatar'>
          Avatar <input name='image' type="file" onChange={handleFileChange} /> <img src={imagePreview} style={{ width: "60px", height: "60px", borderRadius: "50%" }} alt="Avatar Preview" />
        </div>
        <div className='btn_box_name'>
          Category <select className ="categoryId" name="categoryId" >
            {
                categoryStore?.data?.map( (category: { id: number, name: string }) => {
                    return <option key={Date.now() * Math.random()} value={category.id}>{category.name}</option>
                })
            }
          </select>
        </div>
        <div className='btn_box_save'>
          <button type='submit' className='btn btn-success'>Save</button>
        </div>
      </form>
    </div>
  );
}
