import { useEffect, useState, forwardRef } from 'react'

const CustomDropdown = forwardRef((props, ref) => {

    useEffect(() => {
    }, [props.option])



    const handleSelect = (i) => {
        if (props?.onSelect) {
            props?.onSelect(i);
        }
    }

    return (
        <div>
            <div
                className='gender-menu scroll'
                style={{
                    cursor: 'pointer',
                    height: props.height ? props.height : props.option.length > 5 ? '400px' : props.option.length > 3 ? '200px' : '140px',
                }}>
                {props.option?.map(i =>
                    <div
                        key={i.id}
                        className='gender-menuOption'
                        onClick={() => handleSelect(i)}
                    >
                        {i.bookCategory || i.memberName || i.title || i.leadname || i.source || i.status || i.stage || i?.fullName || i?.priority || i?.team}
                    </div>
                )}
            </div>
        </div>
    )
})

export default CustomDropdown;
