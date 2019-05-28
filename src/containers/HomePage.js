import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            profile: '',
            pageType: 'income',
            incomeData: null,
            expenseData: null
        }
        this.feed()
        this.logOut = this.logOut.bind(this)
    }

    async feed() {
        const profile = await localStorage.getItem('profile')
        var incomeData = []
        var expenseData = []
        this.setState({ profile: profile })
        axios.get(`http://172.20.10.4:9000/home`, { params: { username: profile } })
            .then(async res => {
                const data = res.data.results
                for (var i in data) {
                    if (data[i].type === 'income') incomeData.push(data[i])
                    else if (data[i].type === 'expense') expenseData.push(data[i])
                }
                this.setState({     
                    loggedIn: true,  
                    incomeData: incomeData,
                    expenseData: expenseData
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    showIncomeinTable() {
        if (this.state.incomeData) {
            return this.state.incomeData.map((data, index) => (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{data.remark}</td>
                    <td>{data.amount}</td>
                    <td>{data.date}</td>
                    <td>button</td>
                </tr>
            ))
        }
    }
    
    showExpenseinTable() {
        if (this.state.expenseData) {
            return this.state.expenseData.map((data, index) => (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{data.remark}</td>
                    <td>{data.amount}</td>
                    <td>{data.date}</td>
                    <td>button</td>
                </tr>
            ))
        }
    }

    selectPageType(type) {
        this.setState({ pageType: type })
    }

    logOut() {
        localStorage.removeItem('profile')
        this.setState({ loggedIn: false })
    }

    render() {
        const profile = localStorage.getItem('profile')
        if (profile == undefined) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <div className="jumbotron jumbotron-fluid text-center">
                    <div className="container">
                        <h1 className="display-4">Money Record</h1>
                        <h3>Username : {this.state.profile} <button className='btn btn-light logoutBtn' onClick={this.logOut} >X</button></h3>
                    </div>
                    <div className="mt-4 form-group container col-10 offset-1 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        <select className="form-control" onChange={(event) => this.selectPageType(event.target.value)}>
                            <option value='income'>Income</option>
                            <option value='expense'>Expense</option>
                        </select>
                    </div>
                </div>
                <div className='container'>
                    {this.state.pageType === 'income' &&
                        <button className='btn btn-info addBtn' >Add Income</button>
                    }
                    {this.state.pageType === 'expense' &&
                        <button className='btn btn-info addBtn' >Add Expense</button>
                    }
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Remark</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Date</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.pageType === 'income' && this.showIncomeinTable()}
                            {this.state.pageType === 'expense' && this.showExpenseinTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default HomePage