import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType, dispatchApp } from '@/stores';

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   description: string;
//   // Các trường khác của sản phẩm
// }

// interface CategoryParams {
//   categoryName: string;
// }

export default function Category() {
  const { name } = useParams();
  const productStore = useSelector((store: StoreType) => store.productStore);
  const categoryStore = useSelector((store: StoreType) => store.categoryStore);
  const idCategory = categoryStore.data?.find((category) => category.name === name)?.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   dispatchApp.dispatchCategory()
  //   dispatchApp.dispatchProduct()
  // }, []);

  return (
    <>
      <div className='box_product'>
        
        {
          productStore.data?.map((productItem, index) => {

            if (productItem.categoryId === idCategory) {
              return (
                <div className='box'>
                  <div className='img'>
                    <img src={productItem.image} />
                  </div>
                  <div className='name'>
                    {productItem.name}
                  </div>
                  <div className='price'>
                    {productItem.price} VND
                  </div>
                  <div className='description'>
                    {productItem.description}
                  </div>
                  <div className='tools'>
                    <button className='buy_btn'>Buy</button>
                    <button className='detail_btn'>Detail</button>
                  </div>
                </div>
              )
            }
          })
        }
      </div>

    </>
  );
}
