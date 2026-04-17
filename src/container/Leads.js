import React from 'react'
import { FaPlus } from 'react-icons/fa';
import { Color } from '../Colors';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import DeletePopup from '../component/DeletePopup';
import { TableSkeleton } from '../component/TableSkeleton';
import { ApiUrl } from '../Api';
import AddLead from './AddLead';
import { HiSwitchHorizontal } from 'react-icons/hi';
import WithRouter from '../context/WithRouter';
import WithToaster from '../context/WithToaster';
import { ApiCall } from '../ApiCall';
import { BsEyeFill } from 'react-icons/bs';
import WithSearch from '../context/WithSearch';
import { TbSortAscending2Filled, TbSortDescending2Filled } from "react-icons/tb";
import { Size } from '../Size';


class Leads extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            LeadDetails: [],
            LeadDetailsClone: [],
            row: [
                { id: 1, field: 'leadname', header: 'Name', showIcon: true },
                { id: 2, field: 'email', header: 'Email', showIcon: true },
                { id: 3, field: 'mobile', header: 'Mobile', showIcon: false },
                { id: 4, field: 'status', header: 'Status', showIcon: false },
                { id: 5, field: 'source', header: 'Source', showIcon: false },
                { id: 6, field: null, header: 'Action', showIcon: false },
            ],
            isAdd: false,
            successMessage: '',
            failureMessage: '',
            isLoading: true,
            updateRow: null,
            isDelete: false,
            isUpdate: false,
            isView: false,
            sortOrder: '',
            sortField: ['leadname', 'email'],
            hoverField: null,
            screenWidth: window.innerWidth,
            userID: null,
            roleFilter: [],
        }
    }

    componentDidMount() {

        let i = JSON.parse(sessionStorage.getItem("data"))
        console.log(i)
        let data = {
            roleID: i?.roleID,
            userID: i?.id,
            teamID: i?.teamID
        }
        this.setState({ userID: i.id, roleFilter: data })
        this.fetchLead(data);
    }
    handleSort = (field) => {
        if (!field) return;
        let { sortField, sortOrder } = this.state;

        if (sortField === field) {
            sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            sortField = field;
            sortOrder = 'asc';
        }
        this.setState({ sortField, sortOrder });
    };
    fetchLead = async (data) => {

        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/FetchLead`, 'POST', data);
            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.setState({
                    LeadDetails: json.data,
                    LeadDetailsClone: json.data,
                    isLoading: false,
                })
            }
            else {
                this.props.toast.show('F', json.message);
            }

        } catch (e) {
            this.props.toast.show('F', e.message);
        }
    }

    handleAddClick = () => {
        this.setState({ isAdd: this.state.isAdd ? false : true, isUpdate: false })
        this.fetchLead(this.state.roleFilter);
    }
    handleSaveClick = () => {
        this.setState({ isAdd: false, isUpdate: false })
        this.fetchLead(this.state.roleFilter);
    }
    updateLead = (i) => {
        this.setState({
            isAdd: true,
            updateRow: i,
            isUpdate: true,
            isView: false
        })
    }
    closeMenu = () => {
        this.setState({
            isDelete: false,
        })
    }
    deleteLead = (i) => {
        this.setState({
            deleteID: i.id,
            isDelete: true,
            itemToBedelete: i.leadname,
        })
    }

    handleDelete = async (i) => {
        let deleteID = {
            id: this.state.deleteID,
            userID: 0,
            leadname: "",
            email: "",
            mobile: "",
            sourceID: 0,
            source: "",
            status: "",
            statusID: 0,
            notes: "",
            isConverted: true
        }
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/DeleteLead`, 'POST', deleteID);

            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.setState({ isDelete: false })
                this.fetchLead(this.state.roleFilter);
            }
            else {
                this.props.toast.show('F', json.message);
            }

        } catch (e) {
            this.props.toast.show('F', e.message);
        }

    }

    CovertLead = async (i) => {
        let data =
        {
            id: 0,
            userID: this.state.userID || 0,
            leadname: i.leadname,
            email: i.email,
            mobile: i.mobile,
            sourceID: i.sourceID,
            source: "",
            status: "",
            statusID: i.statusID,
            notes: i.notes
        }
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/AddUpdateContact`, 'POST', data);

            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.fetchLead(this.state.roleFilter);
            }
            else {
                this.props.toast.show('F', json.message);
            }

        } catch (e) {
            this.props.toast.show('F', e.message);
        }

    }
    closeLead = () => {
        this.setState({
            isAdd: false,
            isView: false
        })
    }
    handleView = (i) => {
        this.setState({
            isAdd: true,
            updateRow: i,
            isUpdate: false,
            isView: true
        })
    }

    render() {
        const { searchValue } = this.props?.search;
        const LeadDetails = this.state.LeadDetails?.filter(lead =>
            lead?.leadname.toLowerCase().includes(searchValue?.toLowerCase() || "") ||
            lead?.email.toLowerCase().includes(searchValue?.toLowerCase() || "") ||
            lead?.mobile.toLowerCase().includes(searchValue?.toLowerCase() || "")
        )
        const { sortField, sortOrder } = this.state;

        let sortedLeads = [...LeadDetails];
        if (sortField) {
            sortedLeads.sort((a, b) => {
                let valA = a[sortField];
                let valB = b[sortField];

                if (typeof valA === 'string') {
                    valA = valA.toLowerCase();
                    valB = valB.toLowerCase();
                }

                if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
                if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                {/* <LibraryDashboard size={Size(this.state.screenWidth)} /> */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                    <div className='medium-heading'>Leads</div>
                    {!this.state.isAdd && <button className='btn-add-book'
                        onClick={this.handleAddClick}
                        style={{ backgroundColor: Color.crmPrimary, }}>
                        <div className='center'><FaPlus /></div>
                        <div className='center' > Lead</div>
                    </button>}
                </div>


                {this.state.isDelete && <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', zIndex: 100 }}>
                    <DeletePopup
                        onClose={this.closeMenu}
                        item={this.state.itemToBedelete}
                        onDelete={(v, id) => { this.handleDelete(v, id) }}
                        ID={this.state.deleteID}
                        message={'Do you want delete this Lead?'}
                    />
                </div>}
                {this.state.isAdd &&
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                        backdropFilter: 'blur(2px)',
                        background: '#00000033'
                    }}
                        onClick={() => this.closeLead()}>
                        <AddLead
                            Saved={this.handleSaveClick}
                            update={this.state.updateRow}
                            isUpdate={this.state.isUpdate}
                            isView={this.state.isView}
                            onClose={() => this.closeLead()}
                        />
                    </div>
                }
                <div className='tbl-scroll'>
                    <table style={{ width: '100%' }}>
                        <thead style={{ backgroundColor: Color.crmPrimary, position: 'sticky', top: 0, zIndex: 1 }}>
                            <tr>
                                {this.state.row?.map(j =>
                                    <th
                                        key={j.id}
                                        onMouseEnter={() => this.setState({ hoverField: j.field })}
                                        onMouseLeave={() => this.setState({ hoverField: null })}
                                        onClick={() => {
                                            j.field && this.handleSort(j.field);
                                        }}
                                        style={{ textAlign: 'center', padding: '16px 5px', borderRadius: '4px', color: Color.whiteFont }}
                                    >
                                        <div className='center' style={{ justifyContent: 'space-evenly' }}>{j.header}
                                            {j.field && (
                                                (this.state.sortField === j.field || this.state.hoverField === j.field) && (
                                                    <span >
                                                        {this.state.sortField === j.field
                                                            ? (this.state.sortOrder === 'asc' ? <TbSortAscending2Filled size={18} /> : <TbSortDescending2Filled size={18} />)
                                                            : <TbSortDescending2Filled size={18} />}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </th>
                                )}
                            </tr>
                        </thead>
                        {this.state.isLoading ? (<TableSkeleton rows={5} cols={this.state.row?.length} />) : (<tbody>

                            {sortedLeads.length > 0 ? sortedLeads?.map(i =>
                                <tr key={i.id}>
                                    {this.state.row?.map(j =>
                                        <td key={j.id} data-label={j.header}>{
                                            j.field
                                                ? (i[j.field])
                                                :
                                                (<div className='center' style={{ gap: '12px' }}>
                                                    {i.status === 'Qualified' && i.isConverted !== true && (<HiSwitchHorizontal style={{ cursor: 'pointer' }} size={Size(this.state.screenWidth)} color={Color.borrow} onClick={() => this.CovertLead(i)} />)}
                                                    <AiFillEdit style={{ cursor: 'pointer' }} size={Size(this.state.screenWidth)} color={Color.lightGrey} onClick={() => this.updateLead(i)} />
                                                    <AiFillDelete size={Size(this.state.screenWidth)} color={Color.red} onClick={() => this.deleteLead(i)} />
                                                    <BsEyeFill style={{ cursor: 'pointer' }} size={Size(this.state.screenWidth)} color={Color.blackFont} onClick={() => this.handleView(i)} />
                                                </div>)
                                        }</td>
                                    )}
                                </tr>
                            ) : "No leads"}

                        </tbody>)}
                    </table>
                </div>
            </div>
        )
    }
}

export default WithRouter(WithToaster(WithSearch(Leads)));
