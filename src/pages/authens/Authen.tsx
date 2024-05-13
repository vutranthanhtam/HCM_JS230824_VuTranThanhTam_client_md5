// import React from 'react'
import './authen.scss'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
export default function Authen() {
    return (
        <div className="login-wrap">
  <div className="login-html">
    <input
      id="tab-1"
      type="radio"
      name="tab"
      className="sign-in"
      defaultChecked
    />
    <label htmlFor="tab-1" className="tab">
      Sign In
    </label>
    <input id="tab-2" type="radio" name="tab" className="sign-up" />
    <label htmlFor="tab-2" className="tab">
      Sign Up
    </label>
    <div className="login-form">
      <SignIn/>
      <SignUp/>
    </div>
  </div>
</div>

    )
}

