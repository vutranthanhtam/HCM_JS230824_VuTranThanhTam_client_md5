import React, { FunctionComponent } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaList, FaPlus, FaRegGem } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Button, Dropdown, MenuProps, Modal, Space } from 'antd';
import { StoreType } from '@/stores';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';



const MySidebar: FunctionComponent = () => {
  const userStore = useSelector((store: StoreType) => store.userStore)
  const handleMenuClick: MenuProps['onClick'] = (e) => {
      };
  const items: MenuProps['items'] = [
    {
      label: 'Home Page',
      key: '1',
      onClick: () => {
        window.location.href = '/'
      }
    },
    {
      label: 'Log-out',
      key: '2',
      danger: true,
      onClick: () => {
        Modal.confirm({
          content: "Bạn có muốn đăng xuất?",
          onOk: () => {
            localStorage.removeItem("token")
            window.location.href = '/'
          }
        })
      }
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  
  return (
    <>
      <Sidebar className='sidebar'>
        <div>
          <Dropdown menu={menuProps} className='dropdown'>
            <Button>
              <Space>
              <span> Hi {isNaN(Number(userStore.data?.userName)) ? userStore.data?.userName : userStore.data?.email.split('@')[0] }</span>
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
        <Menu>
          <SubMenu component={<Link to="/admin/category"/>} icon={<FaRegGem />} label="Caterory">
            <MenuItem component={<Link to="/admin/category/addnew"/>} icon={<FaPlus />}> Add new </MenuItem>
            <MenuItem icon={<FaList />}> List 
            </MenuItem>
          </SubMenu>
          <SubMenu component={<Link to="/admin/product"/>} icon={<FaRegGem />} label="Product">
            <MenuItem component={<Link to="/admin/product/addnew"/>} icon={<FaPlus />}> Add new </MenuItem>
            <MenuItem icon={<FaList />}> List </MenuItem>
          </SubMenu>
          <MenuItem icon={<FaRegGem />}> Receipt </MenuItem>
          <MenuItem icon={<FaRegGem />}> Calendar </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
};

export default MySidebar;
