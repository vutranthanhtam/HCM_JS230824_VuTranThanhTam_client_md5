import React, { useEffect } from 'react';
import './admin.scss';
import { StoreType } from '@/stores';
import { useSelector } from 'react-redux';
import MySidebar from './Sidebar';
import Category from './components/category/Category';
import Product from './components/product/Product';
import { Outlet } from 'react-router';


export default function Admin() {
    const userStore = useSelector((store: StoreType) => store.userStore);
    useEffect(() => {
        if (!userStore.data) {
            alert('Vui lòng đăng nhập!');
            localStorage.removeItem('token');
            window.location.href = '/';
            return;
        }
        if (userStore.data.role == 'USER') {
            alert('Bạn không phải là quản trị viên!');
            window.location.href = '/';
            return;
        }
    }, [userStore.data]);

    

    return (
        <>
            {
                userStore.data?.role != 'USER' && (
                    <div style={{ color: 'black' }} className='admin_page'>
                        <div className='admin-sidebar'>
                            <MySidebar/>
                        </div>
                        <div className='admin-content'>
                            <Outlet/>
                        </div>
                    </div>
                )
            }
        </>
    );
}
