import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";

class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            profile: '',
            data: null,
            pickDate: new Date()
        }
        this.feed()
        this.logOut = this.logOut.bind(this)
        this.selectDate = this.selectDate.bind(this);
        this.deleteData = this.deleteData.bind(this)
    }

    async feed() {
        const profile = await localStorage.getItem('profile')
        this.setState({ profile: profile })
        var d = this.state.pickDate.getDate()
        var m = this.state.pickDate.getMonth() + 1
        var y = this.state.pickDate.getFullYear()
        var date = y + '-' + m + '-' + d
        console.log(date)
        axios.get(`http://172.20.10.4:9000/home`, { params: { username: profile, date: date } })
            .then(async res => {
                const data = res.data.results
                for (var i in data) {
                    var n_date = new Date(data[i].date)
                    data[i].date = n_date.toDateString()
                }
                this.setState({
                    loggedIn: true,
                    data: data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    selectDate(date) {
        this.setState({
            pickDate: date
        });
        this.feed()
    }

    deleteData(id) {

        var cf = window.confirm('Do you want to delete this transaction?')
        if (cf) {
            const data = { id: id }
            axios.post(`http://172.20.10.4:9000/delete`, data)
                .then(res => {
                    const { success } = res.data
                    if (!success) {
                        alert('Fail')
                    } else if (success) {
                        window.location.pathname = '/home'
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }

    showTable() {
        if (this.state.data) {
            return this.state.data.map((data, index) =>
                (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{data.remark}</td>
                        <td>{data.amount}</td>
                        <td>{data.type}</td>
                        <td>{data.date}</td>
                        <td>
                            <Link to={{ pathname: `/edit/${this.state.profile}/${data.id}` }}><button>a</button></Link>
                            <button onClick={this.deleteData.bind(this, data.id)}>b</button>
                        </td>
                    </tr>
                )
            )
        }
    }

    logOut() {
        localStorage.removeItem('userid')
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
                        <h3>Username : {this.state.profile}</h3>
                    </div>
                </div>
                <div className='container'>
                    <button className='btn btn-danger logoutBtn' onClick={this.logOut} >Exit</button>
                    <Link to='/add/expense' style={{ textDecoration: 'none' }}><button className='btn btn-info addBtn' >Add Expense</button></Link>
                    <Link to='/add/income' style={{ textDecoration: 'none' }}><button className='btn btn-info addBtn' >Add Income</button></Link>
                    <div className='datepickerHome'>
                        <DatePicker
                            selected={this.state.pickDate}
                            onChange={this.selectDate}
                            maxDate={addDays(new Date(), 0)}
                        />
                    </div>
                    <table className="table">
                        <thead className='thead-light'>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Remark</th>
                                <th scope="col">Amount(Baht)</th>
                                <th scope="col">Type</th>
                                <th scope="col">Date</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default HomePage