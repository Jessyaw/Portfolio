import React from 'react'
import WithRouter from '../context/WithRouter'
import { Color } from '../Colors';
import { FaCaretUp } from 'react-icons/fa';
import { FaCaretDown } from 'react-icons/fa';
import { BiPen } from 'react-icons/bi';
import { Constant } from '../Constant';

class JournalsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                { id: 1, icon: <BiPen size={20} />, content: Constant.story1, menu: 'Recently borrowed', isOpen: true, isHover: false },
                { id: 2, icon: <BiPen size={20} />, content: Constant.story1, menu: 'Recently returned', isOpen: false, isHover: false },
                { id: 3, icon: <BiPen size={20} />, content: Constant.story1, menu: 'Overdued', isOpen: false, isHover: false },
            ],
        }
        this.contentRef = {};
    }
    componentDidMount() {
        document.body.style.background = Color.bgDark;
        // this.fetchData();
    }
    componentWillUnmount() {
        document.body.style.background = '';
    }
    // fetchData = async () => {
    //     let data = await db.journalsList.toArray();
    //     let decode = decryption(data);
    //     this.setState({
    //         cards: decode
    //     })
    // }
    addPage = async () => {
        // this.setState({
        //     cards: { ...this.state.cards, id: 1, card: 'Heading' }
        // })
        // let data = encryption({ heading: 'untitled', date: Date().slice(4, 15) })
        // await db.journalsList.add(data)

    }
    redirectToJournal = (ID, heading) => {
        //this.props.navigate('/journal', { state: { ID, heading } });
    }
    onEdit = (i) => {
        // this.setState(prevState => ({
        //     isEdit: { ...prevState.isEdit, [i]: true }
        // }), () => {
        //     this.selectAll(this.contentRef[i])
        // })
    }
    selectAll = (e) => {
        let range = document.createRange();
        let selection = window.getSelection();
        range.selectNodeContents(e);
        selection.removeAllRanges();
        selection.addRange(range);
    }
    onHandleInput = async (i) => {
        // let pass = this.contentRef[i]?.innerHTML;


        // try {
        //     if (pass?.trim() !== '') {
        //         let updated = await db.journalsList.update(i, { heading: pass, date: Date().slice(4, 15) })
        //         if (updated) {
        //         }
        //         else {
        //         }
        //     }
        // }
        // catch (error) {
        // }

    };
    outOfFocus = (id) => {
        // this.setState(prevState => ({
        //     isEdit: { ...prevState.isEdit, [id]: false }
        // }))
    }
    handleOpen = (i) => {
        this.setState({
            list: this.state.list?.map(item => {
                return {
                    ...item,
                    isOpen: i.id == item.id
                }
            })
        })
    }
    render() {
        return (
            <div>

                <div style={{ margin: '0px 12px' }}>
                    <h1 className='medium-heading' style={{ color: Color.whiteFont }}>Journals</h1>
                    {this.state.list?.map(i =>
                        <div style={{ display: 'flex', gap: '7px', flexDirection: 'column', }}>
                            <div onClick={() => this.handleOpen(i)}
                                style={{
                                    padding: '16px 12px', borderRadius: '7px',
                                    boxShadow: '1px 1px 7px #a4acac64', display: 'flex', justifyContent: 'space-between', backgroundColor: Color.whiteFont,
                                }}>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <div className='center'
                                        style={{
                                            cursor: 'pointer', backgroundColor: Color.whiteFont,
                                            padding: '4px', borderRadius: '4px', color: i.isOpen ? Color.dashboard : Color.darkPurple,
                                            boxShadow: i.isOpen ? '1px 1px 7px #a4acac64' : '',
                                        }}>{i.icon}</div>
                                    <div className='center' style={{ color: i.isOpen ? Color.dashboard : Color.darkPurple, }}>{i.menu}</div>
                                </div>
                                <div>{i.isOpen ? <FaCaretUp size={25} color={Color.dashboard} /> : <FaCaretDown size={25} />}</div>
                            </div>
                            <div>

                                {i.isOpen && i.id == 1 &&
                                    <div style={{ backgroundColor: Color.whiteFont, borderRadius: '5px', margin: '7px 12px', padding: '12px' }}>{i.content}</div>
                                }
                            </div>

                        </div>
                    )}
                </div>

            </div>
        )
    }
}

export default WithRouter(JournalsList)
