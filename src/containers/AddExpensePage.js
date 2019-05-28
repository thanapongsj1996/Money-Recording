import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

class AddExpenxePage extends Component {

    constructor(props) {
        super(props)
        this.state = {

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
                    <img className='imgAdd' src='/images/expense.png' alt='' />
                </div>
                <div className="row justify-content-center">
                    <form onSubmit={this.registerSubmit} className='form col-10 col-md-10 col-lg-6' >
                        <label className='formAdd'>Amount</label>
                        <input className='form-control' />
                        <label className='formAdd'>Remark</label>
                        <textarea className='form-control' style={{height:120}} />
                        <button className='btn btn-block btn-secondary' style={{ marginTop: 30, fontSize: 22 }} type="submit" value="Submit" >Add Expense</button>
                        <Link to='/home' style={{ textDecoration: 'none' }}><button className='btn btn-block btn-danger' style={{ marginTop: 10, fontSize: 22 }} >Cancel</button></Link>
                    </form>
                </div>
            </div>
        )
    }


}
export default AddExpenxePage