import React, { Component } from 'react'
import WithRouter from '../navigate/WithRouter'
import { Color } from '../Colors'
import { BiLeftArrow } from 'react-icons/bi'
import { BiSolidPencil } from 'react-icons/bi'
import { db } from '../dexie/DB'
import { BiCamera } from 'react-icons/bi'
import { decryption, encryption } from '../dexie/EncodeDecode'


class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: [
                { id: 1, list: 'Theme', isSelected: false, isHover: false },
                { id: 2, list: 'Theme', isSelected: false, isHover: false },
                { id: 3, list: 'Theme', isSelected: false, isHover: false },
                { id: 4, list: 'Theme', isSelected: false, isHover: false },
                { id: 5, list: 'Theme', isSelected: false, isHover: false },
                { id: 6, list: 'Theme', isSelected: false, isHover: false },
                { id: 7, list: 'Theme', isSelected: false, isHover: false },
            ],
            isEditable: false,
            profile: [],
        }
    }
    async componentDidMount() {

        const data = await db.profile.toArray();
        let decode = decryption(data);
        this.addUpdateData(decode);
        this.setState({
            profile: decode
        })
    }
    addUpdateData = async (data) => {
        if (this.state.profile.length < 0) {
            let data = encryption({ img: '', name: 'Jessy Angel', role: 'UI Developer', theme: 'Default' })
            await db.profile.add(data)
        }
        else {
        }
    }
    redirectToTask = () => {
        this.props.navigate('/taskManager');
    }
    handleEdit = () => {
        this.setState({
            isEditable: true,
        })
    }
    handleNameEdit = (e) => {
    }
    render() {
        return (
            <div style={{ backgroundColor: Color.whiteFont, borderRadius: '12px', margin: '25px', padding: '25px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', }}>
                    <button
                        onClick={this.redirectToTask}
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', backgroundColor: Color.blackFont, padding: '12px', borderRadius: '7px', color: Color.whiteFont }}>
                        <div style={{ margin: '0px 12px 0px 0px' }}><BiLeftArrow /></div>
                        <div> Back</div>
                    </button>
                </div>

                <div style={{ display: 'flex' }}>
                    <div style={{ flex: 2, display: 'flex', backgroundColor: Color.FlightTheme, borderRadius: '12px', padding: '12px' }}>
                        <div className='center' style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div className='center' style={{ cursor: 'pointer', height: '140px', width: '140px', borderRadius: '70px', backgroundColor: Color.whiteFont }}>
                                <div className='center' style={{ height: '70px', width: '70px', borderRadius: '3px', backgroundColor: Color.lineColor }}>
                                    <BiCamera size={25} />
                                </div>
                            </div>
                        </div>
                        <div style={{ flex: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                            <div contentEditable={this.state.isEditable}
                                onInput={(e) => this.handleNameEdit(e)}
                                style={{ outline: 'none', borderBottom: this.state.isEditable && '1px solid red', fontSize: '50px', fontWeight: 'bold' }}>Jessy Angel</div>
                            <div contentEditable={this.state.isEditable}
                                style={{ outline: 'none', borderBottom: this.state.isEditable && '1px solid red', fontSize: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>UI Designer</div>
                                <div style={{ cursor: 'pointer', }}>
                                    <BiSolidPencil onClick={this.handleEdit} /></div>
                            </div>
                        </div>
                    </div>
                    <div style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', }}>
                        <div style={{ margin: '12px', display: 'flex', justifyContent: 'flex-end' }}>THEME</div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <div style={{ border: '1px solid lightgrey', display: 'flex', flexDirection: 'column', padding: '12px', margin: '12px' }}>
                                <div className='center'><BiSolidPencil /></div>
                                <div className='center'>Dark</div>
                            </div>
                            <div style={{ border: '1px solid lightgrey', display: 'flex', flexDirection: 'column', padding: '12px', margin: '12px' }}>
                                <div className='center'><BiSolidPencil /></div>
                                <div className='center'>Light</div>
                            </div>
                            <div style={{ border: '1px solid lightgrey', display: 'flex', flexDirection: 'column', padding: '12px', margin: '12px' }}>
                                <div className='center'><BiSolidPencil /></div>
                                <div className='center'>Default</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default WithRouter(Settings)
