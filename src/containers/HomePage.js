import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'

class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            profile: '',
            loggedIn: null
        }
    }


    render() {
        const profile = localStorage.getItem('profile')
        if(profile == null){
            return <Redirect to='/' />
        }
        return (
            <div>
                <div className='container col-md-8 text-center'>
                    <h1 className='mt-5' style={{ fontSize: 120 }}>404</h1>
                    <h2 className='mb-4'>Notw Found</h2>
                    <p className='title mb-5'>ขออภัยไม่พบหน้าที่คุณค้นหา ดูเหมือนว่าเว็บที่คุณพยายามเข้าถึงไม่มีอยู่อีกต่อไปหรืออาจจะย้ายไปยังหน้าเว็บเพจอื่น</p>
                </div>
            </div>
        )
    }
}

export default HomePage