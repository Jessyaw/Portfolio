import React from 'react'
import { Color } from '../Colors'

export default function DeletePopup(props) {
    const handleOnClose = () => {
        props.onClose();
    }

    const handleOkay = () => {
        props.onDelete(true, props.ID);
    }
    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000e0e61' }}>
            <div onClick={(e) => { e.preventDefault() }} style={{ backgroundColor: Color.whiteFont, padding: '12px', borderRadius: '12px' }}>
                <div style={{ margin: '7px 12px 20px' }}>
                    <div style={{ padding: '0px 25px 0px 0px', color: Color.grey, margin: '0px 0px 7px 0px', fontSize: '12px' }}>Do you want delete this task?</div>
                    <div style={{ padding: '0px 25px 0px 0px', fontWeight: 'bold', fontSize: '16px' }}>{props.item}</div>

                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '7px 0px' }}>
                    <button
                        onClick={handleOkay} style={{ border: 'none', color: Color.whiteFont, borderRadius: '7px', padding: '7px 12px', margin: '0px 7px', cursor: 'pointer', backgroundColor: Color.theme }}>Yep</button>
                    <button
                        onClick={handleOnClose} style={{ border: 'none', color: Color.whiteFont, borderRadius: '7px', padding: '7px 12px', margin: '0px 7px', cursor: 'pointer', backgroundColor: Color.red }}>Nope</button>
                </div>
            </div>
        </div>
    )
}
