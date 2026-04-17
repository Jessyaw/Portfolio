import React from 'react'
import { Color } from '../Colors';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import DeletePopup from '../component/DeletePopup';
import { TableSkeleton } from '../component/TableSkeleton';
import { ApiUrl } from '../Api';
import AddDeal from './AddDeal';
import { formatDate } from '../Validation';
import WithToaster from '../context/WithToaster';
import { ApiCall } from '../ApiCall';
import CustomDropdown from '../component/CustomDropdown';
import WithRouter from '../context/WithRouter';
import { FaCheckCircle, FaTimesCircle, FaHandshake, FaCaretDown, FaCaretUp, FaBriefcase } from "react-icons/fa";
import { MdAttachMoney, } from "react-icons/md";

import WithSearch from '../context/WithSearch';
import { FaFilter } from "react-icons/fa6";
import { EyeIcon } from '@heroicons/react/16/solid';
import { BsEye, BsEyeFill } from 'react-icons/bs';
import { TbSortAscending2Filled, TbSortDescending2Filled } from "react-icons/tb";
import { Size } from '../Size';


class Deals extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dealDetails: [],
            dealDetailsClone: [],
            row: [
                { id: 1, field: 'title', header: 'Title' },
                { id: 2, field: 'contact', header: 'Contact' },
                { id: 3, field: 'amount', header: 'Amount' },
                { id: 4, field: 'stage', header: 'Stage' },
                { id: 5, field: 'closeDate', header: 'Close date' },
                { id: 6, field: '', header: 'Action' },
            ],
            updateID: null,
            deleteID: null,
            isUpdate: false,
            isDelete: false,
            itemToBedelete: '',
            successMessage: '',
            failureMessage: '',
            isLoading: true,
            data: [],
            isOpenStageMenuID: null,
            stageData: [],
            dropUp: false,
            dealStat: [
                { id: 1, key: 'totalDeals', icon: <FaHandshake size={20} />, card: 'Total Deals', count: 0, isHover: false },
                { id: 2, key: 'totalWon', icon: <FaCheckCircle size={20} />, card: 'Closed Won', count: 0, isHover: false },
                { id: 3, key: 'totalLost', icon: <FaTimesCircle size={20} />, card: 'Closed Lost', count: 0, isHover: false },
                { id: 4, key: 'openDeals', icon: <FaBriefcase size={20} />, card: 'Open Deals', count: 0, isHover: false },
                { id: 5, key: 'totalRevenue', icon: <MdAttachMoney size={20} />, card: 'Tasks Revenue', count: 0, isHover: false },
            ],
            dealStage: '',
            dealStageID: '',
            isView: false,
            sortOrder: '',
            sortField: ['title', 'contact'],
            hoverField: null,
            screenWidth: window.innerWidth,
            teamID: null,
            roleFilter: [],
        }
    }

    componentDidMount() {
        let i = JSON.parse(sessionStorage.getItem("data"))
        let data = {
            roleID: i.roleID,
            userID: i.id,
            teamID: i.teamID
        }

        this.setState({ teamID: i.id, roleFilter: data })
        this.fetchDeals(data);
        this.fetchStage();
        this.fetchDealsStat();
    }
    fetchStage = async () => {
        try {
            await fetch(`${ApiUrl.url}/CRM/FetchDealsStages`)
                .then(res => res.json())
                .then(json => {
                    if (json.data) {
                        this.setState({
                            stageData: json.data,
                        })
                    }
                });
        } catch (e) {

        }
    }
    fetchDealsStat = async () => {
        try {
            await fetch(`${ApiUrl.url}/CRM/FetchDealsStat`)
                .then(res => res.json())
                .then(json => {
                    if (json.data) {
                        const hasData = Array.isArray(json.data) && json.data.length > 0;
                        let stat = json.data;
                        this.setState((prevState) => ({
                            dealStat: prevState.dealStat.map(i => ({
                                ...i,
                                count: stat[i.key] ?? 0
                            })),
                        }))
                    }
                });
        } catch (e) {

        }
    }

    fetchDeals = async (data) => {
        this.setState({ isLoading: true, })
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/FetchDeals`, 'POST', data);
            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.setState({
                    dealDetails: json.data,
                    dealDetailsClone: json.data,
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



    handleDelete = async (i) => {
        this.setState({
            isDelete: true,
            itemToBedelete: i.title,
            deleteID: i.id,
        })
    }

    closeMenu = () => {
        this.setState({
            isDelete: false,
            itemToBedelete: '',
            deleteID: '',
        })
    }

    updateDeal = (i) => {
        this.setState({
            isUpdate: true,
            data: i,
            isView: false,
        })
    }
    handleView = (i) => {
        this.setState({
            isView: true,
            isUpdate: false,
            data: i,
        })
    }

    handleSave = (i) => {
        this.setState({
            isUpdate: false,
        })
        this.fetchDeals(this.state.roleFilter);
    }
    closeDeal = (i) => {
        this.setState({
            isUpdate: false,
            isView: false,
        })
    }
    deleteDeal = async () => {
        let data = {
            id: this.state.deleteID,
            title: "",
            contactID: 0,
            amount: 0,
            stageID: 0,
            stage: "",
            contact: "",
            closeDate: new Date().toISOString(),
        }
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/DeleteDeal`, 'POST', data);

            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.setState({
                    isDelete: false
                })
                this.fetchDeals(this.state.roleFilter);
            }
            else {
                this.props.toast.show('F', json.message);
            }

        } catch (e) {
            this.props.toast.show('F', e.message);
        }

    }

    handleFilterStage = (i) => {
        this.setState((prev) => ({
            isOpenStage: !prev.isOpenStage,
            dealStage: i.stage,
            dealStageID: i.id,
        }), () => {
            this.handleFilter(i.id);
        })
    }
    handleFilter = async (ID) => {
        let data = {
            id: 0,
            title: "",
            contact: "",
            contactID: 0,
            amount: 0,
            stageID: ID,
            stage: "",
            closeDate: new Date().toISOString()
        }
        this.setState({ isLoading: true, })
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/FilterDeals`, 'POST', data);

            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.setState({
                    dealDetails: json.data,
                    dealDetailsClone: json.data,
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
    OpenStageMenu = () => {
        this.setState((prev) => ({
            isOpenStage: !prev.isOpenStage,
        }))
    }

    handleStage = (id, e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const dropdownHeight = 200;

        this.setState(prev => ({
            isOpenStageMenuID: prev.isOpenStageMenuID == id ? null : id,
            dropUp: rect.bottom + dropdownHeight > viewportHeight,
        }))
    }
    handleMouseLeaveStage = () => {
        this.setState({
            isOpenStageMenuID: null,
        })
    }
    handleSelectStage = (i, v) => {

        this.setState({
            isOpenStageMenuID: null,
            stageID: v.id,
            stage: v.stage,
        })

        let data = {
            id: i.id,
            title: i.title,
            contactID: i.contactID,
            amount: i.amount,
            stageID: v.id,
            stage: "",
            contact: "",
            closeDate: i.closeDate,
            teamID: this.state.teamID
        }
        this.handleAddUpdateDeal(data);
    }
    handleAddUpdateDeal = async (data) => {
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/AddUpdateDeals`, 'POST', data);

            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.fetchDeals(this.state.roleFilter);
            }
            else {
                this.props.toast.show('F', json.message);
            }

        } catch (e) {
            this.props.toast.show('F', e.message);
        }
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
    render() {
        const { searchValue } = this.props?.search;
        const dealDetails = (this.state.dealDetails || []).filter(deal =>
            deal?.title?.toLowerCase().includes(searchValue?.toLowerCase() || "") ||
            deal?.contact?.toLowerCase().includes(searchValue?.toLowerCase() || "")
        )

        const { sortField, sortOrder } = this.state;

        let sortedLeads = [...dealDetails];
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


        const stagecolor = {
            "Prospect": Color.prospect,
            "Proposal Sent": Color.proposal,
            "Qualification": Color.qualification,
            "Closed Won": Color.closedWon,
            "Closed Lost": Color.closedLost,
            "Negotiation": Color.negotiation,
        }
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div className='medium-heading'>Deals</div>

                <div className='card-conatainer'>
                    {this.state.dealStat?.map(i =>
                        <div className='stat-card' style={{ color: Color.whiteFont, backgroundColor: Color.crmPrimary }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div className='center'>{i.card}</div>
                                <div className='center'>{i.icon}</div>
                            </div>
                            <div>{i.count}</div>
                        </div>
                    )}
                </div>
                <div className='inpt-container center' style={{ justifyContent: 'flex-start', flexDirection: 'row', gap: '7px', position: 'relative', width: 'fit-content' }} >
                    <FaFilter />
                    <input className='inpt-login' placeholder='Stage' onClick={this.OpenStageMenu} value={this.state.dealStage} />
                    {this.state.isOpenStage &&
                        <div style={{ position: 'absolute', top: '70px', zIndex: 1000, width: '100%', }} onMouseLeave={this.OpenStageMenu}>
                            <CustomDropdown
                                height={'auto'}
                                option={this.state.stageData}
                                onSelect={(i) => this.handleFilterStage(i)}
                            />
                        </div>
                    }
                </div>
                {(this.state.isUpdate || this.state.isView) && <div
                    style={{
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
                    onClick={() => this.closeDeal()}
                >
                    <AddDeal
                        data={this.state.data}
                        Saved={() => this.handleSave()}
                        isUpdate={this.state.isUpdate}
                        isView={this.state.isView}
                        onClose={this.closeDeal}
                    />
                </div>}


                {this.state.isDelete && <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', zIndex: 100 }}>
                    <DeletePopup
                        onClose={this.closeMenu}
                        item={this.state.itemToBedelete}
                        onDelete={(v, id) => { this.deleteDeal(v, id) }}
                        ID={this.state.deleteID}
                        message={'Do you want delete this Deal?'}
                    />
                </div>}

                <div className='tbl-scroll'>
                    <table style={{ width: '100%' }}>
                        <thead style={{ backgroundColor: Color.crmPrimary, position: 'sticky', top: 0, zIndex: 1 }}>
                            <tr>
                                {this.state.row?.map(j =>
                                    <th key={j.id}
                                        onMouseEnter={() => this.setState({ hoverField: j.field })}
                                        onMouseLeave={() => this.setState({ hoverField: null })}
                                        onClick={() => {
                                            j.field && this.handleSort(j.field);
                                        }}
                                        style={{ textAlign: 'center', padding: '16px 5px', borderRadius: '4px', color: Color.whiteFont }}>
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
                                    </th>)}
                            </tr>
                        </thead>
                        {this.state.isLoading ? (<TableSkeleton rows={5} cols={this.state.row?.length} />) : (<tbody>

                            {sortedLeads.length > 0 ? sortedLeads?.map(i =>
                                <tr key={i.id}>
                                    {this.state.row?.map(j =>
                                        <td key={j.id} data-label={j.header}>{
                                            j.field
                                                ? j.field == 'closeDate' ? formatDate(i[j.field]) :
                                                    j.header === 'Stage' ?
                                                        <div className='center' style={{ gap: '7px', position: 'relative', }}>
                                                            <div className='center dd-deals' style={{
                                                                backgroundColor: stagecolor[i[j.field]],
                                                                width: this.state.screenWidth >= 700 && '50%',
                                                            }} onClick={(e) => this.handleStage(i.id, e)} >
                                                                <div> {i[j.field]}</div>
                                                                <div className='center'> {this.state.isOpenStageMenuID === i.id ? <FaCaretUp size={Size(this.state.screenWidth)} /> : <FaCaretDown size={Size(this.state.screenWidth)} />}</div>
                                                            </div >

                                                            {this.state.isOpenStageMenuID === i.id &&
                                                                <div style={{
                                                                    position: 'absolute',
                                                                    top: this.state.dropUp ? 'auto' : '52px',
                                                                    bottom: this.state.dropUp ? '52px' : 'auto',
                                                                    zIndex: 1000,
                                                                }}
                                                                    onMouseLeave={() => this.handleMouseLeaveStage()}
                                                                >
                                                                    <CustomDropdown
                                                                        option={this.state.stageData}
                                                                        onSelect={(v) => this.handleSelectStage(i, v)}
                                                                        height={'auto'}
                                                                    />
                                                                </div>
                                                            }
                                                        </div> :
                                                        (i[j.field])
                                                :
                                                (<div className='center' style={{ gap: '12px' }}>
                                                    <AiFillEdit className='cursor' size={Size(this.state.screenWidth)} color={Color.lightGrey} onClick={() => this.updateDeal(i)} />
                                                    <AiFillDelete className='cursor' size={Size(this.state.screenWidth)} color={Color.red} onClick={() => this.handleDelete(i)} />
                                                    <BsEyeFill className='cursor' size={Size(this.state.screenWidth)} color={Color.blackFont} onClick={() => this.handleView(i)} />
                                                </div>)
                                        }</td>
                                    )}
                                </tr>
                            ) : "No deals"}


                        </tbody>)}
                    </table>
                </div>
            </div >
        )
    }
}

export default WithRouter(WithToaster(WithSearch(Deals)));
