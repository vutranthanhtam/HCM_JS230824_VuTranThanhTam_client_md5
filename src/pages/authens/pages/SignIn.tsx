import apis from '@/apis'
import { LoginUser } from '@/apis/modules/user.api'
import { Modal } from 'antd'
import React from 'react'

export default function SignIn() {

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    let data: LoginUser = {
      userName: (e.target as any).userName.value,
      password: (e.target as any).password.value,
    }
    apis.user.login(data)
      .then((res) => {
        localStorage.setItem('token', res.data.data)
        Modal.success({
          title: 'Thông báo!',
          content: res.data.message,
          onOk: () => {
            window.location.href = '/'
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
      handleLogin(e)
    }}>
      <div className="sign-in-htm">
        <div className="group">
          <label htmlFor="user" className="label" >
            Username
          </label>
          <input id="user" type="text" className="input" name='userName' />
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
          <input
            type="checkbox"
            className="check"
            defaultChecked
          />
          <label htmlFor="check">
            <span className="icon" /> Keep me Signed in
          </label>
        </div>
        <div className="group">
        <input type="submit" className="button" defaultValue="Sign In" />
        </div>
        <div className="hr" />
        <div className="foot-lnk">
          <a href="/forgot-password">Forgot Password?</a>
        </div>
      </div>
    </form>
  )
}
