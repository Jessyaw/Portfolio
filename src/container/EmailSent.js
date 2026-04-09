import React from 'react'
import WithRouter from '../context/WithRouter'
import { Constant } from '../Constant'
import { Color } from '../Colors';
class EmailSent extends React.Component {
    render() {
        return (
            <div className='center' style={{ height: '40rem' }}>
                <div>
                    <h1 style={{ color: Color.green }}>{Constant.accountCreated}</h1>
                    <div style={{ color: Color.grey }} className='nor-header center'>{Constant.emailSent}</div>
                    <div style={{ color: Color.grey }} className='nor-header center'>{Constant.verify}</div>
                </div>
            </div>
        )
    }
}

export default WithRouter(EmailSent);
