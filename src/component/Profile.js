import { Color } from '../Colors'

export default function Profile(props) {
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'center' }}>
                <div className='center'
                    style={{
                        height: '40px', width: '40px', borderRadius: '20px', backgroundColor: props.backgroundColor ? props.backgroundColor : Color.libraryBG,
                        fontWeight: 'bold', fontSize: '12px', color: props.color ? props.color : Color.blackFont,
                    }}>{props.name ? props.name.split(0, 1) : 'J'}
                </div>
                <div>
                    <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{props.name ? props.name : 'Jessy angel'}</div>
                    <div style={{ color: Color.grey, fontSize: '10px' }}>{props.email ? props.email : 'jessy@itpro.com'}</div>
                </div>
            </div >
        </div >
    )
}
