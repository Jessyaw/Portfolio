import React, { useState } from 'react'
import { Color } from '../Colors';

export default function CustomToggle(props) {
    return (
        <div style={{ display: 'inline-block' }}>
            <div className='btn-toggle' style={{ background: Color.whiteFont, boxShadow: '1px 2px 10px #c4c1a47e' }}>
                <div onClick={() => props.onClick('active')} className='toggle'
                    style={{
                        background: props.status == 'active' && Color.green,
                        boxShadow: props.status == 'active' && '1px 2px 10px #c4c1a47e',
                        cursor: 'pointer', padding: '5px 12px', borderRadius: '5px',
                        color: props.status == 'active' ? Color.whiteFont : Color.blackFont
                    }}>Active</div>
                <div onClick={() => props.onClick('inactive')} style={{
                    background: props.status == 'inactive' && Color.red,
                    boxShadow: props.status == 'inactive' && '1px 2px 10px #c4c1a47e',
                    cursor: 'pointer', padding: '5px 12px', borderRadius: '5px',
                    color: props.status == 'inactive' ? Color.whiteFont : Color.blackFont
                }}>
                    InActive</div>
            </div>
        </div>
    )
}
