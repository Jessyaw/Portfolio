import React from 'react'

export default function CustomInput(props) {
    return (
        <input
            placeholder={props.placeHolder}
            className='custom-input'
            value={props.value}
            onChange={props.onInputChange}
            maxLength={props.max}
            minLength={props.min}
        />
    )
}
