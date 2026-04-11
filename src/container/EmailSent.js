import React from 'react'
import WithRouter from '../context/WithRouter'
import { Constant } from '../Constant'
import { Color } from '../Colors';
class EmailSent extends React.Component {
    render() {
        const params = new URLSearchParams(this.props?.location?.search);
        const type = params.get('type') || 'signup';
        return (
            <div className='center' style={{ height: '40rem' }}>
                <div>
                    <div className='heading center' style={{ color: Color.green }}>{type === 'login' ? Constant.loggedIn : Constant.accountCreated}</div>
                    < div style={{ color: Color.grey }} className='nor-header center'>{Constant.emailSent}</div>
                    <div style={{ color: Color.grey }} className='nor-header center'>{Constant.verify}</div>
                </div>
            </div>
        )
    }
}

export default WithRouter(EmailSent);
