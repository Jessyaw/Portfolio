import React, { Component } from 'react'
import { LuLayoutDashboard } from 'react-icons/lu';
import { BiSolidBookAlt } from 'react-icons/bi';
import { BiBookAlt } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { HiShoppingCart } from 'react-icons/hi';
import { TbMessageChatbotFilled } from 'react-icons/tb';
import { TbMessageChatbot } from 'react-icons/tb';
import { BiSolidDashboard } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa';
import { Color } from '../Colors';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs'

import Profile from '../../src/component/Profile'
import { CgUnavailable } from 'react-icons/cg';
import { FaCheck } from 'react-icons/fa';

import LibraryBooks from './LibraryBooks';
import LibraryUser from './LibraryUser';
import BorrowOrReturn from './BorrowOrReturn';
import LibraryDashboard from './LibraryDashboard';
import ChatBot from './ChatBot';

export default class LibraryManagementSystem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sideMenu: [
                { id: 1, color: Color.dashboard, iconFilled: <BiSolidDashboard size={25} color='#ff6105' />, icon: <LuLayoutDashboard size={25} />, menu: 'Dashboard', isHover: false, isSelect: true, },
                { id: 2, color: Color.book, iconFilled: <BiSolidBookAlt size={25} color='#13a3b5' />, icon: <BiBookAlt size={25} />, menu: 'Books', isHover: false, isSelect: false, },
                { id: 3, color: Color.user, iconFilled: <FaUser size={25} color='#992bff' />, icon: <FaRegUser size={25} />, menu: 'Users', isHover: false, isSelect: false, },
                { id: 4, color: Color.borrow, iconFilled: <HiShoppingCart size={25} color='#ff3b4b' />, icon: <MdOutlineShoppingCart size={25} />, menu: 'Borrow/Return', isHover: false, isSelect: false, },
                { id: 5, color: Color.chatBot, iconFilled: <TbMessageChatbotFilled size={25} color='#0ba84a' />, icon: <TbMessageChatbot size={25} />, menu: 'AI Assistant', isHover: false, isSelect: false, },
            ],
        }
    }

    selectMenu = (i) => {
        this.setState({
            sideMenu: this.state.sideMenu?.map(item => {
                return {
                    ...item, isSelect: i.id === item.id
                }
            }
            )
        })
    }

    render() {

        return (

            <div>
                {/* Header */}
                <div style={{}}>
                    <div style={{ display: 'flex', position: 'fixed', right: 0, left: '255px', backgroundColor: Color.whiteFont, zIndex: 1000 }}>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '12px 0px', width: '100%', gap: '12px' }}>
                            <div className='heading' style={{ display: 'flex', flex: 1, fontSize: '34px', color: Color.flightBG }}>LMS</div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 3, }}>
                                <div style={{ position: 'relative', width: '88%', }}>
                                    <BsSearch color={Color.grey} style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '16px',
                                        transform: 'translateY(-50%)',
                                        pointerEvents: 'none', // Allows click to pass through to input
                                    }} />
                                    <input
                                        onChange={(e) => this.handleTopSearch(e)}
                                        placeholder='Search something...'
                                        style={{ border: 'none', borderRadius: '7px', width: '88%', background: Color.lineColor, padding: '20px 0px 20px 43px', margin: '0px', outline: 'none' }} />
                                </div>
                            </div>
                            <div><Profile /></div>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {/* Side bar */}
                    <div style={{ flex: 1 }}>
                        <div className='side-menu-container'>
                            {this.state.sideMenu?.map(i =>
                                <div className='side-menu-items' onClick={() => this.selectMenu(i)}>
                                    <div className={`center ${i.isSelect ? 'side-menu-icon' : ''}`} style={{ padding: '5px' }}>{i.isSelect ? i.iconFilled : i.icon}</div>
                                    <div className='center' style={{ color: i.isSelect ? i.color : Color.libraryPrimaryText }}>{i.menu}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main content */}
                    <div style={{ flex: 5, margin: '100px 25px 0px', boxShadow: '1px 2px 10px rgba(145, 156, 155, 0.47)', borderRadius: '16px', padding: '12px' }}>
                        {this.state.sideMenu?.map(i =>
                            (i.isSelect && i.id == 1) ? <LibraryDashboard /> : (i.isSelect && i.id == 2) ? <LibraryBooks /> : (i.isSelect && i.id == 3) ? <LibraryUser /> : (i.isSelect && i.id == 4) ? <BorrowOrReturn /> : (i.isSelect && i.id == 5) && <ChatBot />
                        )}


                    </div>
                </div>
            </div >
        )
    }
}
