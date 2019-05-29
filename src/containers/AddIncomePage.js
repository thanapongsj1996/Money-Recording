import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'

class AddIncomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            amount: '',
            remark: ''
        }
        this.amountChange = this.amountChange.bind(this);
        this.remarkChange = this.remarkChange.bind(this);
        this.incomeSubmit = this.incomeSubmit.bind(this);
    }
    async amountChange(event) {
        await this.setState({ amount: event.target.value });
    }
    async remarkChange(event) {
        await this.setState({ remark: event.target.value });
    }
    async incomeSubmit(event) {
        event.preventDefault()
        const { amount, remark } = this.state
        const userid = localStorage.getItem('userid')
        if (amount === '' || remark === '') {
            alert('Please check your details and try again.')
            event.preventDefault();
        } else {
            const data = { amount, remark, userid, type: 'income' }
            axios.post(`http://172.20.10.4:9000/add`, data)
                .then(res => {
                    if (res.data.success) {
                        window.location.pathname = '/home'
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    render() {

        const profile = localStorage.getItem('profile')
        if (profile == undefined) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <div className='row justify-content-center'>
                    <img className='imgAdd' src='/images/income.png' alt='' />
                </div>
                <div className="row justify-content-center">
                    <form onSubmit={this.incomeSubmit} className='form col-10 col-md-10 col-lg-6' >
                        <label className='formAdd'>Amount(Baht)</label>
                        <input className='form-control' type='number' onChange={this.amountChange} />
                        <label className='formAdd'>Remark</label>
                        <textarea className='form-control' type='text' style={{ height: 120 }} onChange={this.remarkChange} />
                        <button className='btn btn-block btn-secondary' style={{ marginTop: 30, fontSize: 22 }} type="submit" value="Submit" >Add Income</button>
                        <Link to='/home' style={{ textDecoration: 'none' }}><button className='btn btn-block btn-danger' style={{ marginTop: 10, fontSize: 22 }} >Cancel</button></Link>
                    </form>
                </div>
            </div>
        )
    }


}
export default AddIncomePage