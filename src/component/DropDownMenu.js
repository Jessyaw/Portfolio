import React, { useEffect, useState, forwardRef } from 'react'
import { Color } from '../Colors';

const DropDownMenu = forwardRef((props, ref) => {
    const [menuOption, setMenuOption] = useState([]);
    const [bgColor, setBGColor] = useState('#FFF');
    useEffect(() => {
        setMenuOption(props.option);
    }, [props.option])
    const handleMouseOver = (item) => {

        const update = menuOption.map(i => {
            return {
                ...i,
                isHover: i.id == item.id
            }
        })
        setMenuOption(update);
    }
    const handleSelect = (i) => {
        if (props?.onSelect) {
            props?.onSelect(i);
        }
    }
    const handleSeatSelect = (i) => {
        if (props?.onSelect) {
            if (i.SeatNo !== null && i.IsAvailable) {
                props?.onSelect(i);
            }
        }
    }
    return (
        <div >
            {props.isSeat ?
                <div className='seat-menu seat-row'>
                    {props.option?.map(i =>
                        <div className='seat-option'
                            style={{
                                backgroundColor: i.SeatNo == null ? Color.whiteFont : i.IsAvailable ? Color.flightBG : Color.FlightTheme,
                                color: i.IsAvailable ? Color.whiteFont : Color.flightBG,
                                borderRadius: '7px',
                                margin: '2px',
                                cursor: i.SeatNo == null ? '' : 'pointer',
                            }} onClick={() => handleSeatSelect(i)}>
                            {i.SeatNo}
                        </div>)}
                </div>
                :
                props.isGender ?
                    <div className='gender-menu'>

                        {props.option?.map(i =>
                            <div className='gender-menuOption' onClick={() => handleSelect(i)}>{props.meals ? i.Meal : i.Gender ? i.Gender : i.menu}</div>
                        )}


                    </div> :
                    <div ref={ref} style={{
                        padding: '4px', backgroundColor: '#FFF', display: 'grid', gridTemplateColumns: `repeat(${props.Row},1fr)`, borderRadius: '7px',
                        margin: '2px 43px 0px 0px', textAlign: 'center', minWidth: '65%', mminHeight: '100px',
                    }}>
                        {menuOption.length > 0 && menuOption.map(i =>
                            <div style={{ display: 'flex', }}>
                                {props.isSummary && <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    padding: '0px 7px',
                                    margin: '2px',
                                    borderRadius: '2px',
                                    backgroundColor: i.isHover ? Color.blackFont : Color.disableColor,
                                    color: i.isHover ? Color.yellow : Color.blackFont
                                }}>
                                    9
                                </div>}
                                <div
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onClick={() => handleSelect(i)}
                                    onMouseOver={() => handleMouseOver(i)}
                                    style={{
                                        //border: '1px solid yellow',
                                        cursor: 'pointer',
                                        borderRadius: '4px',
                                        backgroundColor: i.isHover ? Color.yellow : i.isSelected ? Color.blackFont : '#FFF',
                                        margin: '2px',
                                        padding: '2px',
                                        fontSize: '12px',
                                        fontWeight: !props.isSummary && '700',
                                        color: i.isHover ? Color.blackFont : i.isSelected ? Color.yellow : Color.blackFont,
                                        boxShadow: !props.isSummary && '#b7b7a75c 7px 7px 34px',
                                        textAlign: 'left',


                                    }}>{i.menu}
                                </div>
                            </div>
                        )}

                    </div>}
        </div>
    )
})

export default DropDownMenu;
