import React from 'react'
import { FaPlus } from 'react-icons/fa';
import { Color } from '../Colors';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { CgUnavailable } from 'react-icons/cg';
import { FaCheck } from 'react-icons/fa';
import DeletePopup from '../component/DeletePopup';
import { TableSkeleton } from '../component/TableSkeleton';
import { ApiUrl } from '../Api';
import WithRouter from '../context/WithRouter';
import CustomDropdown from '../component/CustomDropdown';
import { handleOnKeyNumber, ValidateField } from '../Validation';
import AddDeal from './AddDeal';
import { ApiCall } from '../ApiCall';
import WithToaster from '../context/WithToaster';
import UpdateContact from './UpdateContact';
import { BsEyeFill } from 'react-icons/bs';
import WithSearch from '../context/WithSearch';
import { TbSortAscending2Filled, TbSortDescending2Filled } from "react-icons/tb";
import { Size } from '../Size';

class CRMContacts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contactDetails: [],
            contactDetailsClone: [],
            row: [
                { id: 1, field: 'leadname', header: 'Name' },
                { id: 2, field: 'email', header: 'Email' },
                { id: 3, field: 'mobile', header: 'Mobile' },
                { id: 4, field: 'source', header: 'Source' },
                { id: 5, field: 'dealCount', header: 'Deal Count' },
                { id: 6, field: null, header: 'Action' },
            ],
            isUpdate: false,
            isDelete: false,
            itemToBedelete: '',
            deleteID: null,
            successMessage: '',
            failureMessage: '',
            isLoading: true,
            name: null,
            mobile: null,
            source: null,
            sourceID: null,
            sourceData: [],
            isOpenSourceMenu: false,
            notes: null,
            email: null,
            data: [],
            updateData: [],
            isAddDeal: false,
            errors: {},
            isView: false,
            sortOrder: '',
            sortField: ['leadname', 'email'],
            hoverField: null,
            screenWidth: window.innerWidth,
            userID: null

        }
    }

    componentDidMount() {
        let i = JSON.parse(sessionStorage.getItem("data"))
        let data = {
            roleID: i.roleID,
            userID: i.id,
            teamID: i.teamID
        }
        this.setState({ userID: i.id })
        this.fetchContact(data);
        this.fetchSource();
    }
    fetchSource = async () => {
        try {
            await fetch(`${ApiUrl.url}/CRM/FetchLeadSource`)
                .then(res => res.json())
                .then(json => {
                    if (json.data) {
                        this.setState({
                            sourceData: json.data,
                        })
                    }
                });
        } catch (e) {

        }
    }
    handleSearch = () => {
        if (this.state.searchValue == '') return;
        let data = this.state.contactDetailsClone?.filter(i =>
            i?.title.toLowerCase().includes(this.state.searchValue)
        )
        this.setState({
            contactDetailsClone: data,
            contactDetails: data
        })
    }
    fetchContact = async (data) => {
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/FetchContacts`, 'POST', data);
            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.setState({
                    contactDetails: json.data,
                    contactDetailsClone: json.data,
                    isLoading: false,
                    isUpdate: false,
                })
            }
            else {
                this.props.toast.show('F', json.message);
            }

        } catch (e) {
            this.props.toast.show('F', e.message);
        }
    }
    handleChange = (field, value) => {
        this.setState((prevState) => ({
            [field]: value,
            errors: {
                ...prevState.errors,
                [field]: ValidateField(field, value)
            }
        }));
    }

    handleMouseLeaveSource = () => {
        this.setState({
            isOpenSourceMenu: false,
        })

    }
    handleSource = () => {
        this.setState({
            isOpenSourceMenu: true,
        })
    }
    handleSelectSource = (field, i) => {
        this.setState((prevState) => ({
            isOpenSourceMenu: false,
            sourceID: i.sourceID,
            source: i.source,
            errors: {
                ...prevState.errors,
                [field]: ""
            }
        }))
    }

    handleNote = (e) => {
        this.setState({
            notes: e.target.value
        })
    }

    updateContact = (i) => {
        this.setState({
            isUpdate: true,
            updateData: i,
            isView: false,
        });
    }
    handleView = (i) => {
        this.setState({
            isUpdate: false,
            updateData: i,
            isView: true,
        });
    }

    handleUpdate = async () => {
        let data =
        {
            id: this.state.updateID,
            userID: this.state.userID || 0,
            leadname: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            sourceID: this.state.sourceID,
            source: "",
            notes: this.state.notes
        }
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/AddUpdateContact`, 'POST', data);
            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.handleClear();
                this.fetchContact();
                this.setState({
                    isUpdate: false,
                })
            }
            else {
                this.props.toast.show('F', json.message);
            }

        } catch (e) {
            this.props.toast.show('F', e.message);
        }
    }
    handleClear = () => {
        this.setState({
            name: '',
            email: '',
            mobile: '',
            source: '',
            notes: '',
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
            notes: "",
            source: "",
        }
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/DeleteContact`, 'POST', deleteID);
            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.fetchContact();

            }
            else {
                this.props.toast.show('F', json.message);
            }

        } catch (e) {
            this.props.toast.show('F', e.message);
        }

    }
    deleteContact = (i) => {
        this.setState({
            deleteID: i.id,
            isDelete: true,
            itemToBedelete: i.leadname,
        })
    }
    AddDeal = (i) => {
        this.setState({
            data: i,
            isAddDeal: true
        })
    }
    closeDeal = () => {
        this.setState({
            isAddDeal: false
        })
    }
    handleSave = () => {
        this.setState({
            isAddDeal: false
        })
        this.fetchContact();
    }
    closeContact = () => {
        this.setState({
            isView: false,
            isUpdate: false,
        })
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

        const contactDetails = this.state.contactDetails?.filter(contact =>
            contact?.leadname.toLowerCase().includes(searchValue?.toLowerCase() || "") ||
            contact?.email.toLowerCase().includes(searchValue?.toLowerCase() || "") ||
            contact?.mobile.toLowerCase().includes(searchValue?.toLowerCase() || "")
        )
        const { sortField, sortOrder } = this.state;

        let sortedLeads = [...contactDetails];
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
                {this.state.isDelete && <div
                    style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', zIndex: 100 }}>
                    <DeletePopup
                        onClose={this.closeMenu}
                        item={this.state.itemToBedelete}
                        onDelete={(v, id) => { this.handleDelete(v, id) }}
                        ID={this.state.deleteID}
                        message={'Do you want delete this Contact?'}
                    />
                </div>}
                {this.state.isAddDeal && <div
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
                        background: 'rgba(0,0,0,0.2)'
                    }}
                    onClick={() => this.closeDeal()}
                >
                    <AddDeal
                        data={this.state.data}
                        Saved={() => this.handleSave()}
                        onClose={() => this.closeDeal()}
                    />
                </div>}
                <div className='medium-heading'>Contacts</div>

                {(this.state.isUpdate || this.state.isView) &&
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
                        onClick={() => this.closeContact()}>
                        <UpdateContact
                            isUpdate={this.state.isUpdate}
                            isView={this.state.isView}
                            data={this.state.updateData}
                            onClose={() => this.closeContact()}
                            fetchContact={this.fetchContact}
                        />
                    </div>
                }
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
                                    </th>
                                )}
                            </tr>
                        </thead>
                        {this.state.isLoading ? (<TableSkeleton rows={5} cols={this.state.row?.length} />) : (<tbody>
                            {sortedLeads.length > 0 ?
                                sortedLeads?.map(i =>
                                    <tr key={i.id}>
                                        {this.state.row?.map(j =>
                                            <td key={j.id} data-label={j.header}>{
                                                j.field
                                                    ? j.header == 'Availability' ? i[j.field]
                                                        ? <FaCheck size={Size(this.state.screenWidth)} color={Color.green} />
                                                        : <CgUnavailable size={Size(this.state.screenWidth)} color={Color.red} />
                                                        : i[j.field]
                                                            ? i[j.field]
                                                            : i[j.field]
                                                    : j.header === 'Action'
                                                    && <div className='center' style={{ gap: '12px' }}>
                                                        <AiFillEdit size={Size(this.state.screenWidth)} style={{ cursor: 'pointer' }} color={Color.grey} onClick={() => this.updateContact(i)} />
                                                        {i.dealCount > 0 ? <AiFillDelete color='rgba(224, 112, 121, 0.48)' style={{ cursor: 'not-allowed' }} size={Size(this.state.screenWidth)} /> :
                                                            <AiFillDelete size={Size(this.state.screenWidth)} style={{ cursor: 'pointer' }} color={Color.red} onClick={() => this.deleteContact(i)} />
                                                        }
                                                        <button style={{
                                                            backgroundColor: Color.crmPrimary,
                                                            cursor: 'pointer'
                                                        }}
                                                            onClick={() => this.AddDeal(i)}
                                                            className='btn-add-book center'><FaPlus /> Deal</button>
                                                        <BsEyeFill style={{ cursor: 'pointer' }} size={Size(this.state.screenWidth)} color={Color.blackFont} onClick={() => this.handleView(i)} />
                                                    </div>



                                            }</td>
                                        )}
                                    </tr>
                                ) : "No Contacts"}

                        </tbody>)}
                    </table>
                </div>
            </div>
        )
    }
}

export default WithRouter(WithToaster(WithSearch(CRMContacts)));
