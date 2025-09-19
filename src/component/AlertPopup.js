import React from 'react'
import { Color } from '../Colors'
import { MdOutlineClose } from 'react-icons/md';

export default function AlertPopup(props) {
    const handleOnClose = () => {
        props.onClose();
    }

    const handleOkay = () => {
        props.onRedirect();
    }
    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: Color.red }}>
            <div onClick={(e) => { e.preventDefault() }}
                style={{ backgroundColor: Color.whiteFont, padding: '12px', borderRadius: '12px', boxShadow: '1px 2px 5px #938e8ea8' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                    onClick={handleOnClose}>
                    <MdOutlineClose />
                </div>
                <div style={{ margin: '7px 12px 20px' }}>
                    <div style={{ padding: '0px 25px 0px 0px', color: props.alert ? Color.red : Color.green, margin: '0px 0px 7px 0px', fontSize: '16px', fontWeight: 'bold' }}>{props.msg}</div>

                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '7px 0px' }}>
                    <button
                        onClick={handleOkay} style={{ border: 'none', color: Color.whiteFont, borderRadius: '7px', padding: '7px 12px', margin: '0px 7px', cursor: 'pointer', backgroundColor: Color.theme }}>{props.btn}</button>
                </div>
            </div>
        </div >
    )
}
