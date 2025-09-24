import React, { Component } from 'react'

export default class ChatBot extends Component {
    render() {
        return (
            <div style={{ position: 'relative', height: window.innerHeight - 200, }}>
                <div className='small-heading'>
                    Chatty
                </div>

                <div className='center scroll' style={{
                    position: 'absolute', bottom: 0, left: '50%',
                    transform: 'translateX(-50%)', width: '70%',
                }}>
                    <input className='input-chat' placeholder='Ask anything' style={{ width: '100%' }} />
                </div>
            </div>

        )
    }
}
