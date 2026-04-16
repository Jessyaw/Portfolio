import React from 'react'
import { Color } from '../Colors'
import { BsSearch } from 'react-icons/bs'
import WithSearch from '../context/WithSearch'
import logo from '../image/svg/CRM_LOGO.svg'

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeMenu: 1,
            activeSubMenu: null,
            openSettings: false,
            isDelete: false,
            itemToBedelete: '',
            isOpenSideBar: false,
            screenWidth: window.innerWidth,
            searchValue: '',
            isSearch: false,
        }
    }

    render() {
        const { searchValue, setSearchValue } = this.props.search;
        return (
            <div>
                <div style={{ backgroundColor: Color.whiteFont, display: 'flex', height: '79px', position: 'fixed', left: 0, right: 0, zIndex: 1 }}>
                    <div style={{ display: 'flex', position: 'fixed', right: 20, left: this.state.screenWidth <= 892 ? 70 : 230, backgroundColor: '', zIndex: 1000, }}>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '7px 0px', width: this.state.screenWidth <= 892 ? '79%' : '100%', gap: '12px' }}>
                            <div className={`${this.state.screenWidth <= 892 ? 'small-heading' : 'heading'}`}
                                onClick={this.openSideBar} style={{ fontSize: '34px', color: Color.darkPurple }}>
                                <img src={logo} height={'70px'} width='160px' />
                            </div>
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
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                        placeholder='Search something...'
                                        onMouseEnter={() => { this.setState({ isSearch: true }) }}
                                        onMouseLeave={() => { this.setState({ isSearch: false }) }}
                                        style={{
                                            border: 'none', borderRadius: '12px', width: this.state.screenWidth <= 892 ? '100%' : '43%',
                                            border: '0.7px solid #0545451f',
                                            boxShadow: this.state.isSearch ? '1px 2px 12px #5e525247' : '',
                                            padding: '20px 16px 20px 52px', margin: '0px', outline: 'none'
                                        }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default WithSearch(Header)