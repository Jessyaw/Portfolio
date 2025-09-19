import React, { useEffect, useState } from 'react'
import { Color } from '../Colors'
import { db } from '../dexie/DB';
import { encryption } from '../dexie/EncodeDecode';

export default function DictionaryPopUp(props) {
    const [word, setWord] = useState('');
    const [meaning, setMeaning] = useState('');
    const [isOpenMenu, setOpenMenu] = useState(false);
    useEffect(() => {
        setOpenMenu(props.openMenu)
    }, [])
    const handleMeaning = (e) => {
        setMeaning(e.target.value)
    }
    const handleWord = (e) => {
        setWord(e.target.value)
    }
    const closeMenu = () => {
        setOpenMenu(false);
    }
    const handleSave = async () => {
        let data = encryption({ word: word, meaning: meaning });
        await db.dictionaryWords.add(data);
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isOpenMenu && <div style={{ height: '250px', width: '500px', backgroundColor: Color.darkTheme, borderRadius: '12px' }}>
                <input className='input' placeholder='Word' value={word} onChange={handleWord} style={{ backgroundColor: Color.wholeBG }} />
                <button style={{ border: 'none', borderRadius: '7px', background: Color.buttonBG, padding: '12px 20px', color: Color.whiteFont }}
                    onClick={handleSave}>Save</button>
                <span style={{ padding: '0px 35px', color: Color.whiteFont, cursor: 'pointer' }} onClick={closeMenu}>X</span>
                <textarea value={meaning} onChange={handleMeaning} className='input' placeholder='Meaning'
                    style={{ height: '120px', width: '400px', fontStyle: 'itelic', backgroundColor: Color.wholeBG }} />
            </div>}
        </div>
    )
}
