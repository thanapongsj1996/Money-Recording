import React, { Component } from 'react';


class LoginPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loginPage: true,
      username: '',
      password: '',
      c_password: ''
    }
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changePage = this.changePage.bind(this)
  }
  usernameChange(event) {
    this.setState({ username: event.target.value });
  }
  passwordChange(event) {
    this.setState({ password: event.target.value });
  }
  handleSubmit(event) {
    alert(`A name was submitted: ${this.state.username} password: ${this.state.password}`);
    event.preventDefault();
  }
  changePage() {
    this.setState({ loginPage: !this.state.loginPage })
  }

  render() {
    return (
      <div className="bgLoginPage">
        <div className="container">
          {
            this.state.loginPage &&
            <div>
              <div className='row justify-content-center'>
                <img className='imgLogin' src='/images/man-user.png' />
              </div>
              <div className="row justify-content-center">
                <form onSubmit={this.handleSubmit} className='form col-10 col-md-10 col-lg-6' >
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
                <img className='imgLogin' src='/images/new-user.png' />
              </div>
              <div className="row justify-content-center">
                <form onSubmit={this.handleSubmit} className='form col-10 col-md-10 col-lg-6' >
                  <label className='formLabel'>Username</label>
                  <input className='form-control' onChange={this.usernameChange} />
                  <label className='formLabel'>Password</label>
                  <input className='form-control' type="password" onChange={this.passwordChange} />
                  <label className='formLabel'>Confirm Password</label>
                  <input className='form-control' type="password" onChange={this.passwordChange} />
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
