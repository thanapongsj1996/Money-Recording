import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios';


class LoginPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loginPage: true,
      username: '',
      password: '',
      c_password: '',
      loggedIn: false
    }
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.c_passwordChange = this.c_passwordChange.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.registerSubmit = this.registerSubmit.bind(this);
    this.changePage = this.changePage.bind(this)
  }
  async usernameChange(event) {
    await this.setState({ username: event.target.value });
  }
  async passwordChange(event) {
    await this.setState({ password: event.target.value });
  }
  async c_passwordChange(event) {
    await this.setState({ c_password: event.target.value });
  }
  async loginSubmit(event) {
    event.preventDefault()
    const { username, password } = this.state
    if (username === '' || password === '') {
      alert('Please check your details and try again.')
      event.preventDefault();
    } else {
      const data = { username, password }
      axios.post(`http://172.20.10.4:9000/login`, data)
        .then(async res => {
          const { success, message, userid, profile } = res.data
          if (!success) {
            await alert(message)
          } else if (success) {
            localStorage.setItem('userid', userid)
            localStorage.setItem('profile', profile)
            this.setState({ loggedIn: true })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  async registerSubmit(event) {
    event.preventDefault()
    const { username, password, c_password } = this.state
    if (username === '' || password === '' || c_password === '') {
      alert('Please check your details and try again.')
    } else if (password !== c_password) {
      alert('Password does not match.')
    } else {
      const data = { username, password }
      axios.post(`http://172.20.10.4:9000/register`, data)
        .then(async res => {
          const { success, message } = res.data
          if (!success) await alert(message)
          else {
            await alert(message)
            this.setState({
              username: '',
              password: '',
              c_password: '',
              loginPage: true
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    }

  }
  changePage() {
    this.setState({ loginPage: !this.state.loginPage })
  }

  render() {
    const { loggedIn } = this.state;
    if (loggedIn) {
      return <Redirect to='home' />
    }
    return (
      <div className="bgLoginPage">
        <div className="container">
          {
            this.state.loginPage &&
            <div>
              <div className='row justify-content-center'>
                <img className='imgLogin' src='/images/man-user.png' alt='' />
              </div>
              <div className="row justify-content-center">
                <form onSubmit={this.loginSubmit} className='form col-10 col-md-10 col-lg-6' >
                  <label className='formLabel'>Username</label>
                  <input className='form-control' onChange={this.usernameChange} />
                  <label className='formLabel'>Password</label>
                  <input className='form-control' type="password" onChange={this.passwordChange} />
                  <button className='btn btn-block btn-info' style={{ marginTop: 30, fontSize: 22 }} type="submit" value="Submit" >Login</button>
                </form>
              </div>
              <div className="row justify-content-center" onClick={this.changePage}><label className='formLabel'>Create your account.</label></div>
            </div>
          }
          {
            !this.state.loginPage &&
            <div>
              <div className='row justify-content-center'>
                <img className='imgLogin' src='/images/new-user.png' alt='' />
              </div>
              <div className="row justify-content-center">
                <form onSubmit={this.registerSubmit} className='form col-10 col-md-10 col-lg-6' >
                  <label className='formLabel'>Username</label>
                  <input className='form-control' onChange={this.usernameChange} />
                  <label className='formLabel'>Password</label>
                  <input className='form-control' type="password" onChange={this.passwordChange} />
                  <label className='formLabel'>Confirm Password</label>
                  <input className='form-control' type="password" onChange={this.c_passwordChange} />
                  <button className='btn btn-block btn-secondary' style={{ marginTop: 30, fontSize: 22 }} type="submit" value="Submit" >Register</button>
                </form>
              </div>
              <div className="row justify-content-center" onClick={this.changePage}><label className='formLabel'>Back to login page.</label></div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default LoginPage
