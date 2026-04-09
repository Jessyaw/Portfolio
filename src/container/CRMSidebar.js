import React from 'react'
import { Color } from '../Colors'
import { PiHamburgerFill } from 'react-icons/pi';
import { PiHamburgerLight } from 'react-icons/pi';
import { LuLayoutDashboard } from 'react-icons/lu';
import { FaTasks, FaUserPlus, FaHandshake, FaUsers } from 'react-icons/fa'
import { BiCalendar } from 'react-icons/bi'
import { MdOutlineTimeline, MdContacts, MdBarChart, MdSource } from 'react-icons/md'
import { CiSettings } from 'react-icons/ci'
import { BiLogOut } from 'react-icons/bi'
import Profile from '../component/Profile'
import WithRouter from '../context/WithRouter';


class CRMSidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openSettings: false,
            isDelete: false,
            itemToBedelete: '',
            isOpenSideBar: false,
            screenWidth: window.innerWidth,
            searchValue: '',
            isSearch: false,
            sideMenu: [
                { id: 1, menu: 'Dashboard', icon: <LuLayoutDashboard size={25} />, path: '/crm' },

                { id: 2, menu: 'Leads', icon: <FaUserPlus size={25} />, path: '/crm/leads' },

                { id: 3, menu: 'Contacts', icon: <MdContacts size={25} />, path: '/crm/contact' },

                { id: 4, menu: 'Deals', icon: <FaHandshake size={25} />, path: '/crm/deals' },

                { id: 5, menu: 'Tasks', icon: <FaTasks size={25} />, path: '/crm/tasks' },

                { id: 6, menu: 'Calendar', icon: <BiCalendar size={25} />, path: '/crm/calendar' },

                { id: 7, menu: 'Reports', icon: <MdBarChart size={25} />, path: '/crm/crm-reports' },

                {
                    id: 8,
                    menu: 'Settings',
                    icon: <CiSettings size={25} />, path: '/crm/add-user',
                    sideSubMenu: [
                        { id: 1, menu: 'Users', icon: <FaUsers />, path: '/crm/add-user' },
                        { id: 2, menu: 'Lead sources', icon: <MdSource />, path: '/crm/add-leadsources' },
                        { id: 3, menu: 'Deal Stages', icon: <MdOutlineTimeline />, path: '/crm/add-dealstages' }
                    ]
                },

                { id: 9, menu: 'Logout', icon: <BiLogOut size={25} /> }
            ],
            activeMenu: null,
        }
        this.sideBarRef = React.createRef();
    }
    componentDidMount() {
        if (this.props?.val) {
            this.setState({
                searchValue: this.props?.val,
            })
        }
    }
    selectMenu = (menu) => {
        this.setState({ activeMenu: menu.id })
        if (menu.id === 9) {
            this.handleOpenSidebar();
            this.handleLogout();
            return;
        }
        if (menu.path) {
            this.handleOpenSidebar();
            this.props.navigate(menu.path);
        }
    }
    selectSubMenu = (menu) => {
        this.setState({
            activeSubMenu: menu.id,
        })
        if (menu.path) {
            this.handleOpenSidebar();
            this.props.navigate(menu.path);
        }

    }
    handleLogout = () => {

    }
    handleOpenSidebar = () => {
        this.setState((prev) => ({
            isOpenSideBar: !prev.isOpenSideBar
        }))
    }
    render() {
        const path = this.props.location.pathname;
        let isSettingsOpen = false
        if (path.includes("add-user") ||
            path.includes("add-leadsources") ||
            path.includes("add-dealstages")) {
            isSettingsOpen = true
        }
        else {
            isSettingsOpen = false
        }

        return (
            <div>
                {this.state.screenWidth <= 892 &&
                    <div
                        onClick={() => this.handleOpenSidebar()}
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
                        <div className='side-menu-icon' style={{ display: 'flex' }}>
                            {this.state.isOpenSideBar ?
                                <PiHamburgerFill color={Color.darkPurple} size={25} /> : <PiHamburgerLight color={Color.darkPurple} size={25} />
                            }
                        </div>
                    </div>}
                <div style={{ display: 'flex', flexDirection: 'row', }}>
                    {/* Side bar */}
                    {(this.state.screenWidth > 892 || this.state.isOpenSideBar) &&
                        <div >
                            <div
                                ref={this.sideBarRef}
                                className='side-menu-container' style={{
                                    //flex: this.state.screenWidth > 892 ? 1 : 'none',
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    height: 'calc(100vh - 79px)',
                                    zIndex: 1000,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: this.state.screenWidth < 892 ? '240px' : '',
                                }}>
                                <div className='scroll' style={{ flex: 1, "--scroll-color": Color.lightGrey }}>
                                    {this.state.sideMenu?.map(i =>
                                        <>
                                            <div key={i.id} className='crm-side-menu-items'
                                                style={{
                                                    backgroundColor: (path === i.path || (isSettingsOpen && i.id === 8) ||
                                                        this.state.activeMenu === i.id) ? Color.crmPrimary : Color.whiteFont,
                                                    color: (path === i.path || (isSettingsOpen && i.id === 8) ||
                                                        this.state.activeMenu === i.id) ? '#F1F3F9' : Color.bgDark,
                                                    borderBottomRightRadius: '12px',
                                                    borderTopRightRadius: '12px',
                                                    boxShadow: 'none'
                                                }}
                                                onClick={() => this.selectMenu(i)}
                                            >
                                                <div className={`center ${(path === i.path || (isSettingsOpen && i.id === 8)) ? 'crm-side-menu-icon' : ''}`} style={{ padding: '5px', background: 'none', boxShadow: 'none' }}>{i.icon}</div>
                                                <div className='center' style={{}}>{i.menu}</div>
                                            </div>
                                            {i.sideSubMenu && (this.state.activeSubMenu || isSettingsOpen) && i.id === 8 && i.sideSubMenu?.map(j =>
                                                <div key={j.id}
                                                    className='crm-side-menu-items'
                                                    onClick={() => this.selectSubMenu(j)}
                                                    style={{
                                                        backgroundColor: path === j.path ? Color.crmSecondary : Color.whiteFont,
                                                        paddingLeft: '52px',
                                                        color: Color.bgDark,
                                                        borderBottomRightRadius: '12px',
                                                        borderTopRightRadius: '12px',
                                                        boxShadow: 'none'
                                                    }}>
                                                    <div className={`center ${path === j.path ? 'crm-side-menu-icon' : ''}`} style={{ padding: '5px', background: 'none', boxShadow: 'none' }}>{j.icon}</div>
                                                    <div className='center' style={{}}>{j.menu}</div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                                <div style={{ padding: '10px' }}>
                                    <Profile />
                                </div>
                            </div>

                        </div>}

                </div>
            </div>
        )
    }
}

export default WithRouter(CRMSidebar)
