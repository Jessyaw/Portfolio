import React, { useEffect } from 'react'
import { Color } from '../Colors'

export default function Toaster(props) {
    useEffect(() => {
    }, [])
    return (
        <div
            style={{
                padding: '12px', margin: '12px',
                backgroundColor: props.fail ? Color.red : props.success ? Color.green : Color.bgDark, color: Color.whiteFont, borderRadius: '12px'
            }}>{props.fail ? props.fail : props.success ? props.success : props.message}</div>
    )
}
