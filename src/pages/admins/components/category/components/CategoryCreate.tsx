import apis from '@/apis';
import { CreateCategory } from '@/apis/modules/category.api';
import { CategoryAction } from '@/stores/slices/category.slice';
import { Modal } from 'antd';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function CategoryCreate() {
  const [imagePreview, setImagePreview] = useState<string>("https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const dispatch = useDispatch();
  async function handleCreateCategory(e: React.FormEvent) {
    e.preventDefault();
    let data: CreateCategory = {
      name: (e.target as any).name.value,
      image: (e.target as any).image.value,
    }
    apis.category.create(data)
      .then((res) => {
        Modal.success({
          title: 'Thông báo!',
          content: res.data.message,
          onOk: () => {
            window.location.href = '/admin/category'
          }
        })
      })
      .catch((err) => {
        Modal.error({
          title: 'Thông báo!',
          content: err?.response?.data?.message || " Lỗi hệ thống! ",
        })
      })
    const res = await apis.category.create(data)
    dispatch(CategoryAction.addNewCategory(res.data.data))
  }
  return (
    <div className='category_create'>
      <form onSubmit={(e) => {
        handleCreateCategory(e)
      }}>
        <div className='btn_box'>
          <h3>CATEGORY CREATE</h3>
          <button onClick={(e) => {
            e.preventDefault();
            window.location.href = '/admin/category'
          }}>X</button>
        </div>
        <div className='btn_box_name'>
          Category Name <input name='name' type="text" />
        </div>
        <div className='btn_box_avatar' >
          Avatar <input name='image' type="file" onChange={handleFileChange} /> <img src={imagePreview} style={{ width: "60px", height: "60px", borderRadius: "50%" }} alt="Avatar Preview" />
        </div>
        <div className='btn_box_save'>
          <button type='submit' className='btn btn-success'>Save</button>
        </div>
      </form>
    </div>
  );
}
