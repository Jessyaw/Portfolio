import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { Color } from '../Colors'

export default function SearchBar() {
    const handleTopSearch = (e) => {

    }
    return (
        <div>
            <div style={{ position: 'relative', }}>
                <BsSearch color={Color.grey}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '16px',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none', // Allows click to pass through to input
                    }} />
                <input
                    onChange={(e) => handleTopSearch(e)}
                    placeholder='Search something...'
                    style={{ border: 'none', borderRadius: '7px', width: '88%', background: Color.lineColor, padding: '20px 0px 20px 43px', margin: '0px', outline: 'none' }} />
            </div>
        </div>
    )
}
