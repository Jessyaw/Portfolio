import React from 'react'
import WithRouter from '../context/WithRouter'
import { ApiUrl } from '../Api'
import DeletePopup from '../component/DeletePopup'
import Header from './Header'
import CRMSidebar from './CRMSidebar'
import { Outlet } from 'react-router-dom'

class CRM extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            calendarData: [],
            activeMenu: 1,
            activeSubMenu: null,
            openSettings: false,
            isDelete: false,
            itemToBedelete: '',
            isOpenSideBar: false,
            screenWidth: window.innerWidth,

        }
    }


    selectMenu = (menu) => {
        if (menu.id === 9) {
            this.handleLogout();
            return;
        }

        if (menu.sideSubMenu) {
            this.setState({
                openSettings: !this.state.openSettings,
                activeMenu: menu.id,
                activeSubMenu: menu.sideSubMenu[0].id,
            })
        }
        else {
            this.setState({
                activeMenu: menu.id,
                activeSubMenu: null,
                openSettings: false
            })
        }

    }
    selectSubMenu = (sub) => {

        this.setState({
            activeSubMenu: sub.id
        })

    }

    openSideBar = () => {
        this.setState({
            isOpenSideBar: this.state.isOpenSideBar ? false : true,
        })
    }

    componentDidMount() {
        this.updateWindowDimensions();
        this.fetchCalendarData();
        window.addEventListener('resize', this.updateWindowDimensions);
        window.addEventListener('mousedown', this.closeSideBar);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        window.removeEventListener('mousedown', this.closeSideBar);
    }
    fetchCalendarData = async () => {
        try {
            await fetch(`${ApiUrl.url}/CRM/fetchCalendarData`).then(res => res.json()).then(json => {

            })
        }
        catch (e) {

        }


    }
    closeSideBar = (e) => {
        if (this.state.isOpenSideBar && this.sideBarRef.current && !this.sideBarRef.current.contains(e.target)) {
            this.setState({
                isOpenSideBar: false
            })
        }
    }
    updateWindowDimensions = () => {
        this.setState({ screenWidth: window.innerWidth });
    }


    handleLogout = () => {
        this.setState({ isDelete: true })
    }
    closeMenu = () => {
        this.setState({
            isDelete: false
        })
    }

    deleteUser = (v, id) => {
        sessionStorage.removeItem();
    }
    render() {
        return (
            <div>
                {this.state.isDelete &&
                    <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', zIndex: 10000 }}>
                        <DeletePopup
                            onClose={this.closeMenu}
                            item={this.state.itemToBedelete}
                            onDelete={(v, id) => { this.deleteUser(v, id) }}
                            ID={this.state.deleteID}
                            message={'Are you sure you want to Logout?'}
                        />
                    </div>}
                {/* Header */}
                <Header searchValue={(v) => { this.setState({ searchValue: v }) }} />
                <CRMSidebar val={this.state.searchValue} />
                <div className='main-container'>
                    <Outlet />
                </div>
            </div >
        )
    }
}

export default WithRouter(CRM)
