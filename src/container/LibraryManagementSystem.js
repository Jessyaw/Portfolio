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
import { PiHamburgerFill } from 'react-icons/pi';
import { PiHamburgerLight } from 'react-icons/pi';

export default class LibraryManagementSystem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sideMenu: [
                { id: 1, color: Color.dashboard, iconFilled: <BiSolidDashboard size={25} color={Color.dashboard} />, icon: <LuLayoutDashboard size={25} />, menu: 'Dashboard', isHover: false, isSelect: true, },
                { id: 2, color: Color.book, iconFilled: <BiSolidBookAlt size={25} color={Color.book} />, icon: <BiBookAlt size={25} />, menu: 'Books', isHover: false, isSelect: false, },
                { id: 3, color: Color.user, iconFilled: <FaUser size={25} color={Color.user} />, icon: <FaRegUser size={25} />, menu: 'Users', isHover: false, isSelect: false, },
                { id: 4, color: Color.borrow, iconFilled: <HiShoppingCart size={25} color={Color.borrow} />, icon: <MdOutlineShoppingCart size={25} />, menu: 'Borrow/Return', isHover: false, isSelect: false, },
                { id: 5, color: Color.chatBot, iconFilled: <TbMessageChatbotFilled size={25} color={Color.chatBot} />, icon: <TbMessageChatbot size={25} />, menu: 'AI Assistant', isHover: false, isSelect: false, },
            ],
            chat: 5,
            isOpenSideBar: false,
            screenWidth: window.innerWidth,
            searchValue: '',
            isSearch: false,
            prompt: ''
        }
    }

    selectMenu = (i) => {
        this.setState({
            sideMenu: this.state.sideMenu?.map(item => {
                return {
                    ...item, isSelect: (typeof i === 'object' ? i.id : i) === item.id
                }
            }),
            isOpenSideBar: false,
        })
    }
    handlePrompt = (i, v) => {
        this.setState({
            prompt: v,
            sideMenu: this.state.sideMenu?.map(item => {
                return {
                    ...item, isSelect: (typeof i === 'object' ? i.id : i) === item.id
                }
            }),
            isOpenSideBar: false,
        })
    }
    openSideBar = () => {
        this.setState({
            isOpenSideBar: this.state.isOpenSideBar ? false : true,
        })
    }

    componentDidMount() {
        this.updateWindowDimensions();

        window.addEventListener('resize', this.updateWindowDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions = () => {
        this.setState({ screenWidth: window.innerWidth });
    }

    handleTopSearch = (e) => {
        this.setState({
            searchValue: e.target.value,
            isSearch: true
        })
    }

    render() {
        return (

            <div>
                {/* Header */}
                <div style={{}}>
                    <div style={{ display: 'flex', position: 'fixed', right: 20, left: this.state.screenWidth <= 892 ? 70 : 230, backgroundColor: '', zIndex: 1000, }}>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '7px 0px', width: this.state.screenWidth <= 892 ? '79%' : '100%', gap: '12px' }}>
                            <div className={`${this.state.screenWidth <= 892 ? 'small-heading' : 'heading'}`}
                                onClick={this.openSideBar} style={{ fontSize: '34px', color: Color.darkPurple }}>LMS</div>
                            <div style={{ width: '100%', }}>
                                <div style={{ position: 'relative', }} >
                                    <BsSearch color={Color.darkPurple}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '16px',
                                            transform: 'translateY(-50%)',
                                            pointerEvents: 'none',
                                        }} />
                                    <input
                                        value={this.state.searchValue}
                                        onChange={(e) => this.handleTopSearch(e)}
                                        placeholder='Search something...'
                                        onMouseEnter={() => { this.setState({ isSearch: true }) }}
                                        onMouseLeave={() => { this.setState({ isSearch: false }) }}
                                        style={{
                                            border: 'none', borderRadius: '12px', width: this.state.screenWidth <= 892 ? '100%' : '43%',
                                            border: '0.7px solid #0545451f',
                                            boxShadow: this.state.isSearch ? '1px 2px 12px #5e525247' : '',
                                            padding: '20px 0px 20px 52px', margin: '0px', outline: 'none'
                                        }} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {this.state.screenWidth <= 892 &&
                    <div
                        onClick={() => this.setState({ isOpenSideBar: !this.state.isOpenSideBar })}
                        style={{
                            position: 'fixed',
                            top: 10,
                            left: 10,
                            zIndex: 200,
                            cursor: 'pointer',
                            color: 'white',
                            padding: '8px',
                            borderRadius: '5px',
                        }}
                    >
                        <div className='side-menu-icon' style={{}}>
                            {this.state.isOpenSideBar ? <PiHamburgerFill color={Color.darkPurple} size={25} /> : <PiHamburgerLight color={Color.darkPurple} size={25} />}
                        </div>
                    </div>}


                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {/* Side bar */}
                    {(this.state.screenWidth > 892 || this.state.isOpenSideBar) && <div >
                        <div className='side-menu-container' style={{
                            flex: this.state.screenWidth > 892 ? 1 : 'none',
                            position: this.state.screenWidth <= 892 ? 'fixed' : 'relative',
                            top: 0,
                            left: 0,
                            height: this.state.screenWidth <= 892 ? '100vh' : 'auto',
                            zIndex: 1000,
                        }}>
                            {this.state.sideMenu?.map(i =>
                                <div key={i.id} className='side-menu-items' onClick={() => this.selectMenu(i)}>
                                    <div className={`center ${i.isSelect ? 'side-menu-icon' : ''}`} style={{ padding: '5px' }}>{i.isSelect ? i.iconFilled : i.icon}</div>
                                    <div className='center' style={{ color: i.isSelect ? i.color : Color.libraryPrimaryText }}>{i.menu}</div>
                                </div>
                            )}
                        </div>
                    </div>}

                    {/* Main content */}
                    <div style={{ flex: 5, margin: '100px 25px 0px', boxShadow: '1px 2px 10px rgba(145, 156, 155, 0.47)', borderRadius: '16px', padding: '12px' }}>
                        {this.state.sideMenu?.map(i =>
                            (i.isSelect && i.id == 1)
                                ? <LibraryDashboard
                                    openChat={() => this.selectMenu(this.state.chat)}
                                    addPrompt={(v) => this.handlePrompt(this.state.chat, v)}
                                />
                                : (i.isSelect && i.id == 2)
                                    ? <LibraryBooks search={this.state.searchValue} />
                                    : (i.isSelect && i.id == 3)
                                        ? <LibraryUser search={this.state.searchValue} />
                                        : (i.isSelect && i.id == 4)
                                            ? <BorrowOrReturn search={this.state.searchValue} />
                                            : (i.isSelect && i.id == 5)
                                            && <ChatBot prompt={this.state.prompt}
                                            />
                        )}


                    </div>
                </div>
            </div >
        )
    }
}
