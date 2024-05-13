import apis from '@/apis';
import { UpdateProduct } from '@/apis/modules/product.api';
import { StoreType } from '@/stores';
import { ProductAction } from '@/stores/slices/product.slice';
import { Modal } from 'antd';
import React, { ChangeEvent,  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



export default function ProductUpdate({ productUpdate, setIsModalUpdate} : { productUpdate: any,setIsModalUpdate: any}) {
  const [imagePreview, setImagePreview] = useState<string>("https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

 
  const categoryStore = useSelector((store: StoreType) => store.categoryStore);

  const dispatch = useDispatch();
  async function handleUpdateProduct(e: React.FormEvent) {
    
    e.preventDefault();
    let data: UpdateProduct = {
      name: (e.target as any).name.value,
      image: (e.target as any).image.value,
      price: Number((e.target as any).price.value),
      description: (e.target as any).description.value,
      categoryId: Number((e.target as any).categoryId.value),
    }
    apis.product.update(data, productUpdate as number)
    .then((res) => {
        dispatch(ProductAction.updateProduct(res.data.data))
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
        handleUpdateProduct(e)
      }}>
        <div className='btn_box'>
          <h3>PRODUCT CREATE</h3>
          <button type='button' onClick={(e) => {
            setIsModalUpdate(false)
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
                categoryStore.data?.map( (category: { id: number, name: string }) => {
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