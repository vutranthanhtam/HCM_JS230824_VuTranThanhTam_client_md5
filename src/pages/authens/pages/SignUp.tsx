import apis from '@/apis';
import { CreateUser } from '@/apis/modules/user.api';
import { Modal } from 'antd';
import React from 'react'

export default function SignUp() {

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    let data: CreateUser = {
      userName: (e.target as any).userName.value,
      password: (e.target as any).password.value,
      email: (e.target as any).email.value,
    }
    
    
    apis.user.register(data)
      .then((res) => {
        Modal.success({
          title: 'Thông báo!',
          content: res.data.message,
          onOk: () => {
            window.location.href = '/authen'
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
    <form onSubmit={(e) => {
      handleRegister(e);
    }}>
      <div className="sign-up-htm">
        <div className="group">
          <label htmlFor="user" className="label">
            Username
          </label>
          <input type="text" className="input" name='userName' />
        </div>
        <div className="group">
          <label htmlFor="pass" className="label">
            Password
          </label>
          <input
           
            type="password"
            className="input"
            name='password'
            
          />
        </div>
        <div className="group">
          <label htmlFor="pass" className="label">
            Repeat Password
          </label>
          <input
            
            type="password"
            className="input"
            name='password1'
            
          />
        </div>
        <div className="group">
          <label htmlFor="pass" className="label">
            Email 
          </label>
          <input type="text" className="input" name='email' />
        </div>
        <div className="group">
          <input type="submit" className="button" defaultValue="Sign Up" />
        </div>
        <div className="hr" />
        <div className="foot-lnk">
          <label htmlFor="tab-1">Already Member?</label>
        </div>
      </div>
    </form>
  )
}
