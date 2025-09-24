import React from 'react'
import { Color } from '../Colors'

export default function Profile(props) {
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '25px', alignItems: 'center' }}>
                <div className='center'
                    style={{
                        height: '50px', width: '50px', borderRadius: '25px', backgroundColor: props.backgroundColor ? props.backgroundColor : Color.libraryBG,
                        fontWeight: 'bold', fontSize: '16px', color: props.color ? props.color : Color.blackFont,
                    }}>{props.name ? props.name.split(0, 1) : 'J'}
                </div>
                <div>
                    <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{props.name ? props.name : 'Jessy angel'}</div>
                    <div style={{ color: Color.grey, fontSize: '12px' }}>{props.email ? props.email : 'jessy@itpro.com'}</div>
                </div>
            </div >
        </div >
    )
}
