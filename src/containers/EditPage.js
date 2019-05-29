import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

class EditPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userid: null,
            id: null
        }
    }
    componentWillMount() {
        const { userid, id } = this.props.match.params
        this.setState({
            userid: userid,
            id: id
        })
    }

    render() {
        const profile = localStorage.getItem('profile')
        if (profile == undefined) {
            return <Redirect to='/' />
        }
        // } else if(local_userid != this.state.userid){
        //     alert('qwdqw')
        // }
        return (
            <h1>Test</h1>
        )
    }


}
export default EditPage