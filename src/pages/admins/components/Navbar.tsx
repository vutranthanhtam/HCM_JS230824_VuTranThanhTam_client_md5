import React from 'react'
// import { Dropdown } from 'antd'
import { Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { StoreType } from '@/stores';
import { Modal } from 'antd';

export default function Navbar() {
  
  const userStore = useSelector((store: StoreType) => store.userStore)
  return (
    <div>
      {/* <div className='logo'>
        
      </div> */}
      <div className='user'>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
          <span> Hi {isNaN(Number(userStore.data?.userName)) ? userStore.data?.userName : userStore.data?.email.split('@')[0] }</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => {
              window.location.href = "/"
            }}>Home Page</Dropdown.Item>
            <Dropdown.Item onClick={() => {
              Modal.confirm({
                title: 'Are you sure to logout?',
                content: 'Ok?',
                onOk() {
                  localStorage.removeItem("token")
                  window.location.href = "/"
                },
              })
            }}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  )
}
