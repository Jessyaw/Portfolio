import React, { Component } from 'react'
import { Color } from '../Colors'
import { FaCaretUp } from 'react-icons/fa';
import { FaCaretDown } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { MdAssignmentReturn } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { BiSolidBookAlt } from 'react-icons/bi';
import { TbMessageChatbotFilled } from 'react-icons/tb';


export default class LibraryDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {

            statCards: [
                { id: 1, key: 'totalBooks', icon: <BiSolidBookAlt size={20} />, card: 'Total Books', count: 12, isHover: false },
                { id: 2, key: 'totalMembers', icon: <FaUser size={20} />, card: 'Total Members', count: 12, isHover: false },
                { id: 3, key: 'booksBorrowedToday', icon: <FaBook size={20} />, card: 'Books Borrowed Today', count: 12, isHover: false },
                { id: 4, key: 'booksReturnedToday', icon: <MdAssignmentReturn size={20} />, card: 'Books Returned Today', count: 12, isHover: false },
                { id: 5, key: 'overdueBooks', icon: <MdOutlineAccessTimeFilled size={20} />, card: 'Overdue Books', count: 12, isHover: false },
            ],

            commonQS: [
                { id: 1, qs: 'Show me overdue books this week', isSelect: false },
                { id: 2, qs: 'Who borrowed the most books this month?', isSelect: false },
            ],
            list: [
                { id: 1, icon: <FaBook size={20} />, menu: 'Recently borrowed', isOpen: true, isHover: false },
                { id: 2, icon: <MdAssignmentReturn size={20} />, menu: 'Recently returned', isOpen: false, isHover: false },
                { id: 3, icon: <MdOutlineAccessTimeFilled size={20} />, menu: 'Overdued', isOpen: false, isHover: false },
            ],

            recentlyAdded: [

            ],

            recentlyAddedRow: [
                { id: 1, field: 'title', header: 'Title' },
                { id: 2, field: 'author', header: 'Author' },
                { id: 3, field: 'category', header: 'Category' },


            ],
            recentlyReturned: [

            ],

            recentlyReturnedRow: [
                { id: 1, field: 'memberName', header: 'Memeber name' },
                { id: 2, field: 'title', header: 'Title' },
                { id: 3, field: 'returnedDate', header: 'Returned date' },


            ],
            overdued: [

            ],

            overduedRow: [
                { id: 1, field: 'memberName', header: 'Member name' },
                { id: 2, field: 'title', header: 'Title' },
                { id: 3, field: 'dueDate', header: 'Due Date' },


            ],
        }
    }

    componentDidMount() {
        this.fetchStatData();
        this.fetchRecentlyBorrowed();
        this.fetchRecentlyReturned();
        this.fetchOverdue();
    }

    fetchStatData = async () => {
        try {
            await fetch('https://localhost:7232/GetStatData').then(res => res.json()).then(json => {
                console.log(json.data[0]);
                let stat = json.data[0];
                this.setState(prevState => ({
                    statCards: prevState.statCards?.map(i => ({
                        ...i,
                        count: stat[i.key] ?? stat.count
                    }))
                }))
            })
        } catch (e) {

        }
    }
    fetchRecentlyBorrowed = async () => {
        try {
            await fetch('https://localhost:7232/GetRecentlyBorrowedData').then(res => res.json()).then(json => {
                console.log(json.data);
                this.setState({
                    recentlyAdded: json.data
                })
            })
        } catch (e) {

        }
    }
    fetchRecentlyReturned = async () => {
        try {
            await fetch('https://localhost:7232/GetRecentlyReturnData').then(res => res.json()).then(json => {
                this.setState({
                    recentlyReturned: json.data
                })
            })
        } catch (e) {

        }
    }
    fetchOverdue = async () => {
        try {
            await fetch('https://localhost:7232/GetOverdueData').then(res => res.json()).then(json => {
                this.setState({
                    overdued: json.data
                })
            })
        } catch (e) {

        }
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                <div className='card-conatainer'>
                    {this.state.statCards?.map(i =>
                        <div className='stat-card' style={{ color: Color.whiteFont, backgroundColor: Color.darkPurple }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div className='center'>{i.card}</div>
                                <div className='center'>{i.icon}</div>
                            </div>
                            <div>{i.count}</div>
                        </div>
                    )}
                </div>

                {/* tab */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {this.state.list?.map(i =>
                        <div>
                            <div onClick={() => this.handleOpen(i)}
                                style={{
                                    padding: '16px 12px', borderRadius: '7px',
                                    boxShadow: '1px 1px 7px #a4acac64', display: 'flex', justifyContent: 'space-between'
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
                            {i.isOpen && i.id == 1 && < table style={{ width: '100%' }}>
                                <thead style={{ backgroundColor: Color.darkPurple, position: 'sticky', top: 0, zIndex: 1 }}>
                                    <tr>
                                        {this.state.recentlyAddedRow?.map(j =>
                                            <th key={j.id} style={{ textAlign: 'center', padding: '12px', borderRadius: '4px', color: Color.whiteFont }}>{j.header}</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.recentlyAdded.length > 0 ?
                                        this.state.recentlyAdded?.slice(0, 3).map(i =>
                                            <tr key={i.id}>
                                                {this.state.recentlyAddedRow?.map(j =>
                                                    <td style={{ padding: '16px 5px', textAlign: 'center', }} key={j.id}>{
                                                        i[j.field]
                                                    }</td>
                                                )}
                                            </tr>
                                        )
                                        :
                                        <tr>No data</tr>
                                    }
                                </tbody>
                            </table>}
                            {i.isOpen && i.id == 2 && < table style={{ width: '100%' }}>
                                <thead style={{ backgroundColor: Color.darkPurple, position: 'sticky', top: 0, zIndex: 1 }}>
                                    <tr>
                                        {this.state.recentlyReturnedRow?.map(j =>
                                            <th key={j.id} style={{ textAlign: 'center', padding: '12px', borderRadius: '4px', color: Color.whiteFont }}>{j.header}</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.recentlyReturned.length > 0 ?
                                            this.state.recentlyReturned?.slice(0, 3).map(i =>
                                                <tr key={i.id}>
                                                    {this.state.recentlyReturnedRow?.map(j =>
                                                        <td style={{ padding: '16px 5px', textAlign: 'center', }} key={j.id}>{
                                                            i[j.field]
                                                        }</td>
                                                    )}
                                                </tr>
                                            )
                                            : <tr>No data</tr>
                                    }
                                </tbody>
                            </table>}
                            {i.isOpen && i.id == 3 && < table style={{ width: '100%' }}>
                                <thead style={{ backgroundColor: Color.darkPurple, position: 'sticky', top: 0, zIndex: 1 }}>
                                    <tr>
                                        {this.state.overduedRow?.map(j =>
                                            <th key={j.id} style={{ textAlign: 'center', padding: '12px', borderRadius: '4px', color: Color.whiteFont }}>{j.header}</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.overdued.length > 0 ?
                                        this.state.overdued?.slice(0, 3).map(i =>
                                            <tr key={i.id}>
                                                {this.state.overduedRow?.map(j =>
                                                    <td style={{ padding: '16px 5px', textAlign: 'center', }} key={j.id}>{
                                                        i[j.field]
                                                    }</td>
                                                )}
                                            </tr>
                                        ) :
                                        <tr>no data</tr>
                                    }
                                </tbody>
                            </table>}
                        </div>

                    )}
                </div>


                {/* chat bot */}
                <div onClick={this.props.openChat} style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {this.state.commonQS?.map(i =>
                            <div style={{ backgroundColor: Color.dashboard, padding: '10px', borderRadius: '12px', color: Color.whiteFont, fontSize: '0.9rem', fontWeight: '500' }}>{i.qs}</div>
                        )}
                    </div>
                    <div className='center' style={{
                        cursor: 'pointer', backgroundColor: Color.whiteFont,
                        padding: '10px', borderRadius: '7px', color: Color.dashboard,
                        boxShadow: '1px 2px 10px #a4acac64', display: 'flex', gap: '12px'
                    }}>
                        <div>Ask chat</div>
                        <TbMessageChatbotFilled size={25} />
                    </div>
                </div>



            </div >
        )
    }
}
