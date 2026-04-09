import { Color } from '../Colors'

export default function DeletePopup(props) {
    const handleOnClose = () => {
        props.onClose();
    }

    const handleOkay = () => {
        props.onDelete(true, props?.ID ? props.id : 0);
    }
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#ffffff66',
                backdropFilter: 'blur(2px)'
            }}>
            <div onClick={(e) => { e.preventDefault() }} style={{ backgroundColor: Color.whiteFont, padding: '12px', borderRadius: '12px', boxShadow: '0px 2px 30px #ccc6' }}>
                <div style={{ margin: '7px 12px 20px' }}>
                    <div style={{ padding: '0px 25px 0px 0px', color: Color.grey, margin: '0px 0px 7px 0px', fontSize: '12px' }}>{props.message}</div>
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