import apis from '@/apis';
import { UpdateCategory } from '@/apis/modules/category.api';
import { CategoryAction } from '@/stores/slices/category.slice';
import { Modal } from 'antd';
import React, { ChangeEvent,  useState } from 'react';
import { useDispatch } from 'react-redux';



export default function CategoryUpdate({ categoryUpdate, setIsModalUpdate } : { categoryUpdate: any,setIsModalUpdate: any }) {
  const [imagePreview, setImagePreview] = useState<string>("https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  
  const dispatch = useDispatch();
  async function handleUpdateCategory(e: React.FormEvent) {
    
    e.preventDefault();
    let newdata: UpdateCategory = {
      
      name: (e.target as any).name.value, 
      image: (e.target as any).image.value,
    }
    apis.category.update(newdata, categoryUpdate as number)
    .then((res) => {
        dispatch(CategoryAction.updateCategory(res.data.data))
        Modal.success({
        title: 'Thông báo!',
        content: res.data.message,
        onOk: () => {
          setIsModalUpdate(false)
        }
      })
    })
    .catch((err) => {
      Modal.error({
        title: 'Thông báo!',
        content: err?.response?.data?.message || " Lỗi hệ thống! ",
      })
    })
    
  }
  return (
    <div className='category_update'>
      <form onSubmit={(e) => {
        handleUpdateCategory(e)
      }}>
        <div className='btn_box'>
          <h3>CATEGORY UPDATE</h3>
          <button type='button' onClick={() => {
            setIsModalUpdate(false)
          }}>X</button>
        </div>
        <div className='btn_box_name'>
          Category Name <input name='name' type="text" />
        </div>
        <div className='btn_box_avatar'>
          Avatar <input name='image' type="file" onChange={handleFileChange} /> <img src={imagePreview} style={{ width: "60px", height: "60px", borderRadius: "50%" }} alt="Avatar Preview" />
        </div>
        <div className='btn_box_save'>
          <button type='submit' className='btn btn-success'>Save</button>
        </div>
      </form>
    </div>
    
  );
}