import React, { useEffect, useState, forwardRef } from 'react'
import { Color } from '../Colors';

const CustomDropdown = forwardRef((props, ref) => {
    const [menuOption, setMenuOption] = useState([]);
    useEffect(() => {
        setMenuOption(props.option);
        console.log(props.option.length, 'length')
    }, [props.option])

    const handleSelect = (i) => {
        if (props?.onSelect) {
            props?.onSelect(i);
        }
    }

    return (
        <div>
            <div className='gender-menu scroll' style={{ height: props.option.length > 5 ? '400px' : props.option.length > 3 ? '200px' : '140px', }}>
                {props.option?.map(i =>
                    <div className='gender-menuOption' onClick={() => handleSelect(i)}>{i.bookCategory || i.memberName || i.title}</div>
                )}
            </div>
        </div>
    )
})

export default CustomDropdown;
