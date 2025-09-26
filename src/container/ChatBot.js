import React, { Component } from 'react'
import { RiSendPlaneFill } from 'react-icons/ri';
import { Color } from '../Colors';

export default class ChatBot extends Component {
    render() {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '70vh'
            }}>
                {/* Heading */}
                <div className='small-heading'>
                    Chatty
                </div>

                {/* Messages placeholder */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                    {/* Chat messages will go here */}
                </div>

                {/* Textarea at bottom */}

                <div className='center scroll' style={{
                    width: '70%',
                    margin: '10px auto', gap: '12px'
                }}>
                    <textarea
                        className='input-chat'
                        placeholder='Ask anything...'
                        style={{
                            width: '100%',
                            resize: 'none',
                            padding: '10px',
                            borderRadius: '8px',
                            fontSize: '14px'
                        }}

                    />
                    <div style={{
                        cursor: 'pointer', backgroundColor: Color.whiteFont,
                        padding: '10px', borderRadius: '7px', color: Color.chatBot,
                        boxShadow: '1px 2px 10px #a4acac64', display: 'flex', gap: '12px'
                    }}>
                        <RiSendPlaneFill size={25} />
                    </div>
                </div>
            </div>
        )
    }
}
