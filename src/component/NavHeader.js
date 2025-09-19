import React, { useState } from 'react'
import WithRouter from '../navigate/WithRouter';
import { Color } from '../Colors';
import { FaBars } from "react-icons/fa6";



function NavHeader(props) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuList, setMenuList] = useState([
        { id: 1, list: 'list 1', isHighlight: false },
        { id: 2, list: 'list 2', isHighlight: false },
        { id: 3, list: 'list 3', isHighlight: false },
        { id: 4, list: 'list 4 ', isHighlight: false },
        { id: 5, list: 'list 5 ', isHighlight: false },
        { id: 6, list: 'list 6 ', isHighlight: false },
        { id: 7, list: 'list 7 ', isHighlight: false },
    ]);
    const redirectToJournal = () => {
        props.navigate('/dashboard');
    }
    const redirectToDictionary = () => {
        props.navigate('/dictionary');
    }
    const redirectToTaskmate = () => {
        props.navigate('/taskManager');
    }
    const redirectToForm = () => {
        props.navigate('/details');
    }
    const redirectToJournalsList = () => {
        props.navigate('/journalsList');
    }
    const redirectToResume = () => {
        props.navigate('/resume');
    }
    const menuHover = (item) => {
        setMenuList((prevMenuList) =>
            prevMenuList.map((i) =>
                i.id === item.id ? { ...i, isHighlight: true } : { ...i, isHighlight: i.isHighlight }
            )
        );
    };

    // Handle mouse leave
    const menuLeave = () => {
        setMenuList((prevMenuList) =>
            prevMenuList.map((i) => ({ ...i, isHighlight: false }))
        );
    };
    const closeMenu = () => {
        setIsMenuOpen(false)
    }
    const openMenu = () => {
        setIsMenuOpen(true)
    }
    return (
        <div>
            {isMenuOpen &&

                <div style={{ height: '750px', backgroundColor: '#FFF', width: '300px', position: 'fixed', boxShadow: '2px 12px 16px #80008077', margin: '0px 0px 0px 0px' }}>
                    <div
                        onClick={closeMenu}
                        style={{ display: 'flex', justifyContent: 'flex-end', padding: '12px', cursor: 'pointer' }}>
                        X
                    </div>

                    <div>
                        <input
                            style={{ color: Color.whiteFont, border: 'none', borderRadius: '7px', outline: 'none', backgroundColor: Color.theme, width: '80%', margin: '5px 12px', padding: '15px 18px' }}
                            placeholder='Search'
                            color={Color.whiteFont}
                        />
                    </div>
                    <div style={{ overflow: 'auto' }}>

                        {menuList.map(i =>
                            <div
                                onMouseOver={() => menuHover(i)}
                                onMouseLeave={() => menuLeave(i)}
                                style={{
                                    padding: '12px 12px',
                                    backgroundColor: '#FFF',
                                    margin: '5px 12px',
                                    borderRadius: '7px',
                                    background: i.isHighlight ? Color.theme : '#FFF',
                                    color: i.isHighlight ? Color.whiteFont : Color.blackFont,

                                }}
                            >
                                {i.list}
                            </div>)}
                    </div>
                </div>

            }
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: Color.theme,position:'fixed',top:0,left:0,right:0 }}>
                <div
                    //onClick={openMenu}
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', margin: '0px 2%',color:Color.whiteFont }}>
                    <FaBars/>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ padding: '12px', cursor: 'pointer',color:Color.whiteFont }} onClick={redirectToJournal}>Home </div>
                    <div style={{ padding: '12px', cursor: 'pointer',color:Color.whiteFont }} onClick={redirectToForm}>Page</div>
                    <div style={{ padding: '12px', cursor: 'pointer',color:Color.whiteFont }} onClick={redirectToJournalsList}>Journal</div>
                  
                    <div style={{ padding: '12px', cursor: 'pointer',color:Color.whiteFont }} onClick={redirectToDictionary}>My Dictionary</div>
                    <div style={{ padding: '12px', cursor: 'pointer',color:Color.whiteFont }} onClick={redirectToResume}>View CV</div>
                    <div style={{ padding: '12px', cursor: 'pointer',color:Color.whiteFont }} onClick={redirectToTaskmate}>Task Mate</div>

                </div>
            </div>
        </div>
    )
}

export default WithRouter(NavHeader);
