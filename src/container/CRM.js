import React, { Component } from 'react'
import WithRouter from '../navigate/WithRouter'
import { Color } from '../Colors'
import { BsSearch } from 'react-icons/bs'
import Profile from '../component/Profile'
import SearchBar from '../component/SearchBar'
import { RiDashboard2Line } from 'react-icons/ri'
import { GiLeadPipe } from 'react-icons/gi'
import { LuContactRound } from 'react-icons/lu'
import { LiaSave } from 'react-icons/lia'
import { FaTasks } from 'react-icons/fa'
import { BiBold, BiCalendar } from 'react-icons/bi'
import { MdReport } from 'react-icons/md'
import { CiSettings } from 'react-icons/ci'
import { BiLogOut } from 'react-icons/bi'
import { BiLeftArrow } from 'react-icons/bi'

class CRM extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sideMenu: [
                { id: 1, icon: <RiDashboard2Line size={25} />, menu: 'Dashboard', isSelect: false, isHover: false },
                { id: 2, icon: <GiLeadPipe size={25} />, menu: 'Leads', isSelect: false, isHover: false },
                { id: 3, icon: <LuContactRound size={25} />, menu: 'Contacts', isSelect: false, isHover: false },
                { id: 4, icon: <LiaSave size={25} />, menu: 'Deals', isSelect: false, isHover: false },
                { id: 5, icon: <FaTasks size={25} />, menu: 'Tasks', isSelect: false, isHover: false },
                { id: 6, icon: <BiCalendar size={25} />, menu: 'Calendar', isSelect: false, isHover: false },
                { id: 7, icon: <MdReport size={25} />, menu: 'Reports', isSelect: false, isHover: false },
                { id: 8, icon: <CiSettings size={25} />, menu: 'settings', isSelect: false, isHover: false },
                { id: 9, icon: <BiLogOut size={25} />, menu: 'Logout', isSelect: false, isHover: false },
            ],
            dashboardOverview: [
                { id: 1, menu: 'Total Leads', Count: 34, isHover: false },
                { id: 2, menu: 'Total Leads', Count: 34, isHover: false },
                { id: 3, menu: 'Total Leads', Count: 34, isHover: false },
                { id: 4, menu: 'Total Leads', Count: 34, isHover: false },
            ],
        }
    }

    componentDidMount() {
        document.body.style.backgroundColor = Color.whiteFont;
    }
    componentWillUnmount() {
        document.body.style.backgroundColor = '';
    }
    handleSideMenuHover = (item) => {
        this.setState({
            sideMenu: this.state.sideMenu.map(i => {
                return {
                    ...i,
                    isHover: item.id == i.id,
                }
            }

            )
        })
    }
    handleOnSelectMenu = (item) => {
        this.setState({
            sideMenu: this.state.sideMenu.map(i => {
                return {
                    ...i,
                    isSelect: item.id == i.id,
                }
            }

            )
        })
    }
    handleMouseLeave = (item) => {
        this.setState({
            sideMenu: this.state.sideMenu.map(i => {
                return {
                    ...i,
                    isHover: false,
                }
            }
            )
        })
    }
    render() {
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '25px' }}>
                    {/* Side Menu */}


                    <div style={{ flex: 1, backgroundColor: Color.whiteFont, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '7px', marginTop: '25px' }}>
                        {this.state.sideMenu.map(i =>
                            <div
                                onMouseOver={() => this.handleSideMenuHover(i)}
                                onClick={() => this.handleOnSelectMenu(i)}
                                onMouseLeave={() => { this.handleMouseLeave(i) }}
                                style={{
                                    color: i.isSelect ? Color.whiteFont : i.isHover ? Color.whiteFont : Color.blackFont,
                                    padding: '12px 25px',
                                    backgroundColor: i.isSelect ? Color.theme : i.isHover ? Color.red : Color.whiteFont,
                                    margin: '5px',
                                    borderRadius: '12px',
                                    display: 'flex', flexDirection: 'row', gap: '34px'
                                }}>

                                <div>{i.icon}</div>
                                <div>
                                    {i.menu}
                                </div>
                            </div>
                        )}
                    </div>


                    {/* Main Content */}
                    <div style={{ flex: 5, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* nav bar */}
                        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '12px' }}>
                            <div
                                style={{ flex: 2, fontWeight: '700', fontSize: '34px', textAlign: 'left' }}>Logo</div>
                            <div style={{ flex: 2 }} />
                            <div style={{ flex: 3 }}>
                                <SearchBar />
                            </div>
                            <div className='center' style={{ flex: 2, }}>
                                <Profile
                                    name='Jessy'
                                    email='jessy@itpro.com'
                                    color={Color.whiteFont}
                                    backgroundColor={Color.red}
                                />
                            </div>
                        </div>

                        {/* Middle content */}
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                            <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', }}>
                                    {this.state.dashboardOverview?.map(i =>
                                        <div style={{
                                            display: 'flex', justifyContent: 'space-between', flexDirection: 'column',
                                            backgroundColor: Color.red, padding: '12px', borderRadius: '12px', width: '100%', height: '100px'
                                        }}>
                                            <div style={{ padding: '7px', color: Color.whiteFont, fontSize: '12px', fontWeight: '500' }}>
                                                {i.menu}</div>
                                            <div style={{ padding: '7px', color: Color.whiteFont, fontSize: '25px', fontWeight: 'bold' }}>
                                                {i.Count}</div>
                                        </div>
                                    )}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                                    <div style={{
                                        width: '100%', backgroundColor: Color.whiteFont, boxShadow: '1px 2px 5px grey',
                                        borderRadius: '12px', height: '220px', padding: '12px'
                                    }}>
                                        <div>Lead progress</div>
                                    </div>
                                    <div style={{
                                        width: '100%', backgroundColor: Color.whiteFont, boxShadow: '1px 2px 5px grey',
                                        borderRadius: '12px', height: '220px', padding: '12px'
                                    }}>
                                        <div>Lead progress</div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {/* button */}
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <button style={{
                                        backgroundColor: Color.theme, color: Color.whiteFont, borderRadius: '12px',
                                        padding: '16px 34px', border: 'none', fontWeight: '500', fontSize: '16px', width: '100%',
                                        margin: '0px 12px 0px 0px'
                                    }}>+ Add Lead</button>
                                </div>
                                {/* card */}

                                <div style={{
                                    flex: 1,
                                    width: '90%', backgroundColor: Color.whiteFont, boxShadow: '1px 2px 5px grey', borderRadius: '12px',
                                    height: '295px', padding: '12px'
                                }}>
                                    <div>Lead progress</div>
                                </div>

                            </div>
                        </div>

                        {/* bottom card */}
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', margin: '0px 12px 12px 0px' }}>
                            <div style={{
                                flex: 1,
                                width: '90%', backgroundColor: Color.whiteFont, boxShadow: '1px 2px 5px grey',
                                borderRadius: '12px', height: '220px', padding: '12px'
                            }}>
                                <div>Lead progress</div>
                            </div>

                            <div style={{
                                flex: 2,
                                width: '90%', backgroundColor: Color.whiteFont, boxShadow: '1px 2px 5px grey',
                                borderRadius: '12px', height: '220px', padding: '12px'
                            }}>
                                <div>Lead progress</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default WithRouter(CRM)
