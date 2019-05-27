import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'

class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            profile: '',
            loggedIn: null,
            incomeData: null,
            expenseData: null
        }
        this.feed()
    }

    async feed() {
        const profile = await localStorage.getItem('profile')
        var incomeData = []
        var expenseData = []
        // this.setState({ profile: profile, data: data })
        axios.get(`http://192.168.1.118:9000/home`, { params: { username: profile } })
            .then(async res => {
                const data = res.data.results
                for(var i in data){
                    if(data[i].type === 'income') incomeData.push(data[i])
                    else if(data[i].type === 'expense') expenseData.push(data[i])
                }
                this.setState({
                    incomeData: incomeData,
                    expenseData: expenseData
                })
            })
            .catch(err => {
                console.log(err)
            })

    }

    showDatainTable() {
        if (this.state.incomeData) {
            return this.state.incomeData.map((data, i) => (
                <tr>
                    <th scope="row">{i + 1}</th>
                    <td>{data.remark}</td>
                    <td>{data.amount}</td>
                    <td>{data.date}</td>
                    <td>button</td>
                </tr>
            ))
        }
    }

    render() {
        const profile = localStorage.getItem('profile')
        if (profile == '') {
            return <Redirect to='/' />
        }
        return (
            <div>
                <div class="jumbotron jumbotron-fluid text-center">
                    <div class="container">
                        <h1 class="display-4">Money Record {this.state.profile}</h1>
                    </div>
                    <div class="mt-4 form-group container col-10 offset-1 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        <select class="form-control">
                            <option>Income</option>
                            <option>Expense</option>
                        </select>
                    </div>
                </div>
                <div className='container'>
                    <button className='btn btn-info addIncomeBtn' >Add Income</button>
                    <table class="table">
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
                            {this.showDatainTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default HomePage