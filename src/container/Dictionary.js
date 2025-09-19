import React, { Component } from 'react'
import NavHeader from '../component/NavHeader'
import DictionaryPopUp from '../component/DictionaryPopUp'
import { db } from '../dexie/DB'
import { Color } from '../Colors'
import { decryption } from '../dexie/EncodeDecode'

export default class Dictionary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isMenuOpen: false,
            wordsCollection: [],
            isOpenSlide: false,
        }
    }
    componentDidMount = async () => {
        const data = await db.dictionaryWords.toArray();
        let decode = decryption(data);
        this.setState({ wordsCollection: decode })
    }
    openMenu = () => {
        this.setState({
            isMenuOpen: true,
        })
    }

    handleSlide = () => {
        this.setState({ isOpenSlide: this.state.isOpenSlide ? false : true })
    }

    render() {

        return (
            <div>
                <NavHeader />

                <div
                    className='heading'
                    style={{
                        margin: '100px 12px 0px',
                        color: '#FFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        cursor: 'pointer'
                    }}
                    onClick={this.openMenu}
                >
                    + Add words
                </div>
                {this.state.isMenuOpen && <div style={{ position: 'fixed', bottom: '35%', right: '35%' }}>
                    <DictionaryPopUp openMenu={this.state.isMenuOpen} />
                </div>}


                {this.state.wordsCollection?.length > 0 && this.state.wordsCollection.map(i =>
                    <div>
                        <div
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '52px', width: '96%', backgroundColor: Color.darkTheme, margin: ' 25px 25px 0px', borderRadius: '7px' }}>
                            <div style={{ color: Color.whiteFont, padding: '0px 12px' }}>
                                {i.id}.   {i.word}
                            </div>
                            <div
                                onClick={this.handleSlide}
                                style={{ color: Color.whiteFont, padding: '0px 12px', cursor: 'pointer' }}>
                                {this.state.isOpenSlide ? 'A' : 'V'}
                            </div>
                        </div>
                        {this.state.isOpenSlide && <div
                            style={{ width: '96%', backgroundColor: Color.grey, margin: ' 0px 25px 0px', borderRadius: '0px 0px 12px 12px' }}>
                            <div style={{ color: Color.darkTheme, padding: '12px 12px' }}>
                                {i.meaning}
                            </div>
                        </div>}
                    </div>
                )}
            </div>
        )
    }
}
