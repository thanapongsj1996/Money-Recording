import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'

class EditPage extends Component {
    constructor(props) {
        super(props)
        const { profile, id } = this.props.match.params
        this.state = {
            profile: profile,
            id: id,
            amount:null,
            remark:''
        }
        this.feed()
        this.amountChange = this.amountChange.bind(this);
        this.remarkChange = this.remarkChange.bind(this);
        this.editSubmit = this.editSubmit.bind(this);
    }

    async feed() {
        axios.get(`http://172.20.10.4:9000/edit`, { params: { username: this.state.profile, id: this.state.id } })
            .then(async res => {
                const data = res.data.results[0]
                this.setState({
                    amount: data.amount,
                    remark: data.remark,
                    calldata: true
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    async amountChange(event) {
        await this.setState({ amount: event.target.value });
    }
    async remarkChange(event) {
        await this.setState({ remark: event.target.value });
    }
    async editSubmit(event) {
        event.preventDefault()
        const { amount, remark, id } = this.state
        if (amount === '' || remark === '') {
            alert('Please check your details and try again.')
            event.preventDefault();
        } else {
            const data = { amount, remark, id }
            axios.post(`http://172.20.10.4:9000/edit`, data)
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
        if (profile == undefined || profile != this.state.profile) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <div className='row justify-content-center'>
                    <img className='imgAdd' src='/images/income.png' alt='' />
                </div>
                <div className="row justify-content-center">
                    <form onSubmit={this.editSubmit} className='form col-10 col-md-10 col-lg-6' >
                        <label className='formAdd'>Amount(Baht)</label>
                        <input className='form-control' type='number' onChange={this.amountChange} value={this.state.amount} />
                        <label className='formAdd'>Remark</label>
                        <textarea className='form-control' type='text' style={{ height: 120 }} onChange={this.remarkChange} value={this.state.remark} />
                        <button className='btn btn-block btn-secondary' style={{ marginTop: 30, fontSize: 22 }} type="submit" value="Submit" >Save</button>
                        <Link to='/home' style={{ textDecoration: 'none' }}><button className='btn btn-block btn-danger' style={{ marginTop: 10, fontSize: 22 }} >Cancel</button></Link>
                    </form>
                </div>
            </div>
        )
    }


}
export default EditPage