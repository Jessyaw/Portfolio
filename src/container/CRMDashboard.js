import React from 'react'
import { Color } from '../Colors'
import { FaCaretUp } from 'react-icons/fa';
import { FaCaretDown } from 'react-icons/fa';
import { MdContacts, MdCurrencyRupee } from "react-icons/md";
import { FaUserPlus, FaTasks, FaHandshake } from "react-icons/fa";
import { TableSkeleton } from '../component/TableSkeleton';
import { ApiUrl } from '../Api';
import { formatDate } from '../Validation'
import WithRouter from '../context/WithRouter';
import WithToaster from '../context/WithToaster';
import WithSearch from '../context/WithSearch';
import { ApiCall } from '../ApiCall';

class CRMDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isDelete: false,
            itemToBedelete: '',
            statCards: [
                { id: 1, key: 'leads', icon: <FaUserPlus size={20} />, card: 'Total Leads', count: 0, isHover: false },
                { id: 2, key: 'contacts', icon: <MdContacts size={20} />, card: 'Total Contacts', count: 0, isHover: false },
                { id: 3, key: 'deals', icon: <FaHandshake size={20} />, card: 'Total Deals', count: 0, isHover: false },
                { id: 4, key: 'tasks', icon: <FaTasks size={20} />, card: 'Total Tasks', count: 0, isHover: false },
                { id: 5, key: 'revenue', icon: <MdCurrencyRupee size={20} />, card: 'Total Revenue', count: 0, isHover: false },
            ],

            list: [
                { id: 1, icon: <FaHandshake size={20} />, menu: 'Recent Deals', isOpen: true, isHover: false },
                { id: 2, icon: <FaTasks size={20} />, menu: 'Recent Tasks', isOpen: false, isHover: false },
            ],

            recentDeals: [],

            recentDealsRow: [
                { id: 1, field: 'title', header: 'Title' },
                { id: 2, field: 'contact', header: 'Contact' },
                { id: 3, field: 'amount', header: 'Amount' },
                { id: 3, field: 'stage', header: 'Stage' },


            ],
            recentTasks: [],

            recentTasksRow: [
                { id: 1, field: 'title', header: 'Title' },
                { id: 2, field: 'leadName', header: 'Contact' },
                { id: 3, field: 'dueDate', header: 'Due Date' },
                { id: 4, field: 'priority', header: 'Priority' },
                { id: 5, field: 'status', header: 'Status' },


            ],

            isLoading: true,
        }
    }

    componentDidMount() {
        let i = JSON.parse(sessionStorage.getItem("data"))
        let data = {
            roleID: i.roleID,
            userID: i.id,
            teamID: i.teamID
        }
        if (this.props.isDelete) {
            this.setState({
                isDelete: true,
            })
        }
        window.scrollTo(0, 0);
        this.fetchStatData(data);
        this.fetchRecentTasks(data);
        this.fetchRecentDeals(data);
    }

    fetchStatData = async (data) => {

        this.setState({ isLoading: true, })
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/FetchCRMStatData`, 'POST', data);
            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                let stat = json.data[0];
                if (stat) {
                    this.setState(prevState => ({
                        statCards: prevState.statCards?.map(i => ({
                            ...i,
                            count: stat[i.key] || 0
                        }))
                    }))
                }
            }
            else {
                this.props.toast.show('F', json.message);
            }

        } catch (e) {
            this.props.toast.show('F', e.message);
        }
    }
    fetchRecentDeals = async (data) => {

        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/FetchRecentDeals`, 'POST', data);
            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.setState({
                    recentDeals: json.data,
                    isLoading: false
                })
            }
            else {
                this.props.toast.show('F', json.message);
            }

        } catch (e) {
            this.props.toast.show('F', e.message);
        }

    }
    fetchRecentTasks = async (data) => {
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/FetchRecentTasks`, 'POST', data);
            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.setState({
                    recentTasks: json.data,
                    isLoading: false
                })
            }
            else {
                this.props.toast.show('F', json.message);
            }

        } catch (e) {
            this.props.toast.show('F', e.message);
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
        const { searchValue = "" } = this.props?.search || {};

        const recentTasks = (this.state.recentTasks || []).filter(task =>
            (task?.leadName || "").toLowerCase().includes(searchValue.toLowerCase()) ||
            (task?.title || "").toLowerCase().includes(searchValue.toLowerCase())
        );

        const recentDeals = (this.state.recentDeals || []).filter(deal =>
            (deal?.title || "").toLowerCase().includes(searchValue.toLowerCase()) ||
            (deal?.contact || "").toLowerCase().includes(searchValue.toLowerCase())
        );
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                <div className='card-conatainer'>
                    {this.state.statCards?.map(i =>
                        <div className='stat-card' style={{ color: Color.whiteFont, backgroundColor: Color.crmPrimary }}>
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
                                            padding: '4px', borderRadius: '4px', color: i.isOpen ? Color.red : Color.crmPrimary,
                                            boxShadow: i.isOpen ? '1px 1px 7px #a4acac64' : '',
                                        }}>{i.icon}</div>
                                    <div className='center' style={{ color: i.isOpen ? Color.red : Color.crmPrimary, }}>{i.menu}</div>
                                </div>
                                <div>{i.isOpen ? <FaCaretUp size={25} color={Color.red} /> : <FaCaretDown size={25} />}</div>
                            </div>
                            {i.isOpen && i.id == 1 &&
                                < table style={{ width: '100%' }}>
                                    <thead style={{ backgroundColor: Color.crmPrimary, position: 'sticky', top: 0, zIndex: 1 }}>
                                        <tr>
                                            {this.state.recentDealsRow?.map(j =>
                                                <th key={j.id} style={{ textAlign: 'center', padding: '12px', borderRadius: '4px', color: Color.whiteFont }}>{j.header}</th>
                                            )}
                                        </tr>
                                    </thead>
                                    {this.state.isLoading ? (<TableSkeleton rows={this.state.recentDeals?.length || 0} cols={this.state.recentDealsRow?.length || 0} />) : (<tbody>
                                        {recentDeals.length > 0 ?
                                            recentDeals?.slice(0, 5).map(i =>
                                                <tr key={i.id}>
                                                    {this.state.recentDealsRow?.map(j =>
                                                        <td data-label={j.header} key={j.id} style={{ textAlign: 'center', padding: '12px 0px' }}>{
                                                            i[j.field]
                                                        }</td>
                                                    )}
                                                </tr>
                                            )
                                            :
                                            <tr>No data</tr>
                                        }
                                    </tbody>)}
                                </table>
                            }
                            {i.isOpen && i.id == 2 && < table style={{ width: '100%' }}>
                                <thead style={{ backgroundColor: Color.crmPrimary, position: 'sticky', top: 0, zIndex: 1 }}>
                                    <tr>
                                        {this.state.recentTasksRow?.map(j =>
                                            <th key={j.id} style={{ textAlign: 'center', padding: '12px', borderRadius: '4px', color: Color.whiteFont }}>{j.header}</th>
                                        )}
                                    </tr>
                                </thead>
                                {this.state.isLoading ? (<TableSkeleton rows={this.state.recentTasks?.length || 0} cols={this.state.recentTasksRow?.length || 0} />) : (<tbody>
                                    {
                                        recentTasks.length > 0 ?
                                            recentTasks?.slice(0, 5).map(i =>
                                                <tr key={i.id}>
                                                    {this.state.recentTasksRow?.map(j =>
                                                        <td data-label={j.header} key={j.id} style={{ textAlign: 'center', padding: '12px 0px' }}>{
                                                            j.field === 'dueDate' ? formatDate(i[j.field]) : i[j.field]
                                                        }</td>
                                                    )}
                                                </tr>
                                            )
                                            : <tr>No data</tr>
                                    }
                                </tbody>)}
                            </table>}

                        </div>

                    )}
                </div>


            </div >
        )
    }
}

export default WithRouter(WithToaster(WithSearch(CRMDashboard)));
