import React, { Component } from 'react'
import { db } from '../dexie/DB'
import WithRouter from '../navigate/WithRouter'
import NavHeader from '../component/NavHeader'
import { MdEdit } from "react-icons/md";
import { Color } from '../Colors';
import { IoMdOpen } from "react-icons/io";
import { decryption, encryption } from '../dexie/EncodeDecode';


class JournalsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cards: [],
            isEdit: {},
        }
        this.contentRef = {};
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData = async () => {
        let data = await db.journalsList.toArray();
        let decode = decryption(data);
        this.setState({
            cards: decode
        })
    }
    addPage = async () => {
        this.setState({
            cards: { ...this.state.cards, id: 1, card: 'Heading' }
        })
        let data = encryption({ heading: 'untitled', date: Date().slice(4, 15) })
        await db.journalsList.add(data)

    }
    redirectToJournal = (ID, heading) => {
        this.props.navigate('/journal', { state: { ID, heading } });
    }
    onEdit = (i) => {
        this.setState(prevState => ({
            isEdit: { ...prevState.isEdit, [i]: true }
        }), () => {
            this.selectAll(this.contentRef[i])
        })
    }
    selectAll = (e) => {
        let range = document.createRange();
        let selection = window.getSelection();
        range.selectNodeContents(e);
        selection.removeAllRanges();
        selection.addRange(range);
    }
    onHandleInput = async (i) => {
        let pass = this.contentRef[i]?.innerHTML;


        try {
            if (pass?.trim() !== '') {
                let updated = await db.journalsList.update(i, { heading: pass, date: Date().slice(4, 15) })
                if (updated) {
                }
                else {
                }
            }
        }
        catch (error) {
        }

    };
    outOfFocus = (id) => {
        this.setState(prevState => ({
            isEdit: { ...prevState.isEdit, [id]: false }
        }))
    }
    render() {
        return (
            <div>
                <NavHeader />
                <div onClick={this.addPage} style={{ color: 'blue', cursor: 'pointer', border: 'px solid', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '100px 70px 0px' }}>
                    Add Page +
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }} >
                    {this.state.cards?.map(i =>
                        <div style={{
                            border: '0px solid', width: '250px', backgroundColor: '#0d0131', borderRadius: '12px', margin: '25px',
                            // boxShadow: '2px 12px 16px rgba(107, 97, 107, 0.47)' 
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 12px 0px' }}>
                                <div
                                    className='heading'
                                    style={{ outline: 'none', color: Color.whiteFont }}
                                    contentEditable={this.state.isEdit[i.id] || false}
                                    onInput={() => this.onHandleInput(i.id)}
                                    ref={(e) => (this.contentRef[i.id] = e)}
                                    onBlur={() => this.outOfFocus(i.id)}
                                > {i.heading}</div>

                                <MdEdit onClick={() => this.onEdit(i.id)} style={{ cursor: 'pointer' }} color={this.state.isEdit[i.id] ? Color.disableColor : Color.whiteFont} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 12px' }}>
                                <IoMdOpen onClick={() => this.redirectToJournal(i.id, i.heading)} size={25} color={Color.whiteFont} style={{ cursor: 'pointer' }} />
                                <div style={{ fontSize: '12px', color: 'grey' }}>{i.date}</div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        )
    }
}

export default WithRouter(JournalsList)
