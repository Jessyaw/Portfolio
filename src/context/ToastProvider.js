import React, { useEffect, useState } from 'react'
import { Color } from '../Colors'
import { ToastContext } from './ToastContext'

export const ToasterProvider = ({ children }) => {
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');
    const show = (t, msg) => {
        setType(t);
        setMessage(msg);
        setTimeout(() => {
            setType('');
            setMessage('');
        }, 3000);
    }
    return (
        <ToastContext.Provider value={{ show }}>
            {children}
            {message && <div
                style={{
                    position: 'fixed',
                    bottom: 0,
                    right: 0,
                    padding: '12px',
                    margin: '12px',
                    backgroundColor:
                        type == 'S' ? Color.green
                            : type == 'F' ? Color.red : Color.bgDark,
                    color: Color.whiteFont,
                    borderRadius: '12px'
                }}>
                {message}
            </div>}
        </ToastContext.Provider>
    )
}
