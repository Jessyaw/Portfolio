import React from 'react'
import CustomDropdown from '../component/CustomDropdown';
import { Color } from '../Colors';
import DatePicker from '../component/DatePicker';
import { ApiUrl } from '../Api';
import WithToaster from '../context/WithToaster';
import { ApiCall } from '../ApiCall';
import { CgClose } from 'react-icons/cg';
import { formatDate, ValidateField } from '../Validation';

class AddTask extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            contact: '',
            contactData: [],
            contactID: null,
            isContactMenuOpen: false,
            deal: '',
            dealData: [],
            dealID: null,
            isDealMenuOpen: false,
            assignedTo: '',
            assignedToData: [],
            assignedToID: null,
            isAssignedToMenuOpen: false,
            dueDate: '',
            isDueDate: false,
            priority: '',
            priorityID: null,
            priorityData: [],
            isPriorityMenuOpen: false,
            status: '',
            statusID: null,
            statusData: [],
            isStatusMenuOpen: false,
            isUpdate: false,
            isView: false,
            updateID: null,
            errors: {},
            row: [
                { id: 1, field: 'title', header: 'Title' },
                { id: 2, field: 'contact', header: 'Contact' },
                { id: 3, field: 'dueDate', header: 'DueDate' },
                { id: 4, field: 'priority', header: 'Priority' },
                { id: 5, field: 'status', header: 'Status' },
                { id: 6, field: 'assignedTo', header: 'Assigned To' },
                { id: 7, field: 'deal', header: 'Deal' },
            ],
        }
    }
    componentDidMount() {
        let i = JSON.parse(sessionStorage.getItem("data"))
        let data = {
            roleID: i.roleID,
            userID: i.id,
            teamID: i.teamID
        }
        this.fetchContact(data);
        this.fetchPriority();
        this.fetchStatus();
        this.fetchUser(data);
        this.fetchDeal(data);
        if ((this.props?.isUpdate || this.props?.isView) && this.props?.data) {
            this.handleUpdate(this.props?.isUpdate, this.props?.isView, this.props?.data)
        }

    }
    componentDidUpdate(prevProps) {
        if (prevProps.isUpdate !== this.props.isUpdate) {
            this.handleUpdate(this.props?.isUpdate, this.props?.isView, this.props?.data)
        }
    }

    handleUpdate = (isUpdate, isView, i) => {
        if (isUpdate || isView) {
            this.setState({
                contact: i?.leadName,
                contactID: i?.contactID,
                title: i?.title,
                deal: i?.deal,
                dealID: i?.dealID,
                dueDate: i?.dueDate ? formatDate(i?.dueDate) : '',
                stage: i?.stage,
                stageID: i?.stageID,
                status: i?.status,
                statusID: i?.statusID,
                priority: i?.priority,
                priorityID: i?.priorityID,
                assignedTo: i?.userName,
                assignedToID: i?.assignedTo,
                isUpdate,
                updateID: i?.id,
                isView
            })
        }
    }
    fetchContact = async (data) => {
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/FetchContacts`, 'POST', data);
            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.setState({
                    contactData: json.data,
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
    fetchDeal = async (data) => {
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/FetchDeals`, 'POST', data);
            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.setState({
                    dealData: json.data,
                    isLoading: false,
                })
            }
            else {
                this.props.toast.show('F', json.message);
            }

        } catch (e) {
            this.props.toast.show('F', e.message);
        }
        finally {
            this.setState({
                isLoading: false,
            })
        }
    }
    fetchPriority = async () => {
        try {
            await fetch(`${ApiUrl.url}/CRM/FetchTasksPriority`)
                .then(res => res.json())
                .then(json => {
                    if (json.data) {
                        this.setState({
                            priorityData: json.data,
                            isLoading: false,
                        })
                    }
                });
        } catch (e) {
            this.setState({
                failureMessage: e.message
            })
        }
        finally {
            this.setState({
                isLoading: false,
            })
        }
    }
    fetchStatus = async () => {
        try {
            await fetch(`${ApiUrl.url}/CRM/FetchTasksStatus`)
                .then(res => res.json())
                .then(json => {
                    if (json.data) {
                        this.setState({
                            statusData: json.data,
                            isLoading: false,
                        })
                    }
                });
        } catch (e) {
            this.setState({
                failureMessage: e.message
            })
        }
        finally {
            this.setState({
                isLoading: false,
            })
        }
    }
    fetchUser = async (data) => {
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/FetchLeadUser`, 'POST', data);
            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.setState({
                    assignedToData: json.data,
                    isLoading: false,
                })
            }
            else {
                this.props.toast.show('F', json.message);
            }

        } catch (e) {
            this.props.toast.show('F', e.message);
        }
        finally {
            this.setState({
                isLoading: false,
            })
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

    handleContact = (e) => {
        this.setState({
            isContactMenuOpen: true
        })
    }
    handleMouseLeaveContact = (e) => {
        this.setState({
            isContactMenuOpen: false
        })
    }
    handleSelectContact = (field, i) => {
        this.setState((prevState) => ({
            isContactMenuOpen: false,
            contact: i.leadname,
            contactID: i.id,
            errors: {
                ...prevState.errors,
                [field]: ""
            }
        }))
    }
    handleDeal = (e) => {
        this.setState({
            isDealMenuOpen: true
        })
    }
    handleMouseLeaveDeal = (e) => {
        this.setState({
            isDealMenuOpen: false
        })
    }
    handleSelectDeal = (field, i) => {
        this.setState((prevState) => ({
            isDealMenuOpen: false,
            deal: i.title,
            dealID: i.id,
            errors: {
                ...prevState.errors,
                [field]: ""
            }
        }))
    }
    handleAssignedTo = (e) => {
        this.setState({
            isAssignedToMenuOpen: true
        })
    }
    handleMouseLeaveAssignedTo = (e) => {
        this.setState({
            isAssignedToMenuOpen: false
        })
    }
    handleSelectAssignedTo = (field, i) => {
        this.setState((prevState) => ({
            isAssignedToMenuOpen: false,
            assignedTo: i.fullName,
            assignedToID: i.id,
            errors: {
                ...prevState.errors,
                [field]: ""
            }
        }))
    }

    handlePriority = (e) => {
        this.setState({
            isPriorityMenuOpen: true
        })
    }
    handleMouseLeavePriority = (e) => {
        this.setState({
            isPriorityMenuOpen: false
        })
    }
    handleSelectPriority = (field, i) => {
        this.setState((prevState) => ({
            isPriorityMenuOpen: false,
            priorityID: i.id,
            priority: i.priority,
            errors: {
                ...prevState.errors,
                [field]: ""
            }
        }))
    }
    handleStatus = (e) => {
        this.setState({
            isStatusMenuOpen: true
        })
    }
    handleMouseLeaveStatus = (e) => {
        this.setState({
            isStatusMenuOpen: false
        })
    }
    handleSelectStatus = (field, i) => {
        this.setState((prevState) => ({
            isStatusMenuOpen: false,
            statusID: i.id,
            status: i.status,
            errors: {
                ...prevState.errors,
                [field]: ""
            }
        }))
    }

    handleCloseDate = () => {
        this.setState({
            isDueDate: true
        })
    }
    handleOffDueDate = () => {
        this.setState({
            isDueDate: false
        })
    }
    handleDueDateSelection = (field, d, m, y) => {
        const dueDate = d + " " + m + " " + y
        this.setState((prevState) => ({
            dueDate,
            isDueDate: false,
            errors: {
                ...prevState.errors,
                [field]: ""
            }
        }))
    }

    handleSave = () => {
        const { title, priority, status, dueDate, contact, assignedTo, deal } = this.state;
        const fields = { title, priority, status, dueDate, contact, assignedTo, deal }

        let errors = {};

        Object.keys(fields).forEach(field => {
            const error = ValidateField(field, fields[field]);
            if (error) errors[field] = error;
        });

        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            let date = new Date(this.state.dueDate);
            date.setHours(12, 0, 0, 0);
            const data = {
                id: this.state.isUpdate ? this.state.updateID : 0,
                title: this.state.title,
                leadName: "",
                dealID: this.state.dealID,
                contactID: this.state.contactID,
                assignedTo: this.state.assignedToID,
                dueDate: date.toISOString(),
                priorityID: this.state.priorityID,
                priority: "",
                statusID: this.state.statusID,
                status: "",
                userName: "",
                deal: "",
            }
            this.handleAddUpdateTask(data);
        }
    }
    handleAddUpdateTask = async (data) => {
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/AddUpdateTasks`, 'POST', data);

            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.handleClear();
                this.props.Saved();
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
            title: '',
            contact: '',
            assignedTo: '',
            dueDate: '',
            priority: '',
            status: '',
        })
    }
    render() {
        return (
            <div className='signin-card-container' onClick={(e) => e.stopPropagation()} >
                <div className='signin-card'>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
                        <CgClose onClick={this.props?.onClose} size={16} />
                    </div>
                    {this.state.isView ?
                        (<div style={{ display: 'flex', gap: '25px', flexDirection: 'column' }} >

                            {this.state.row.map((item) => (
                                <div
                                    key={item.id}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '8px 0',
                                        borderBottom: '1px solid #eee'
                                    }}
                                >
                                    <div
                                        className="nor-header"
                                        style={{ fontWeight: '500', fontSize: '15px', color: Color.lightGrey }}
                                    >
                                        {item.header}
                                    </div>
                                    <div style={{ fontSize: '15px', fontWeight: '700', color: Color.blackFont }}>
                                        {this.state[item.field] ? this.state[item.field] : '-'}
                                    </div>
                                </div>
                            ))}
                        </div>
                        )
                        :
                        <>
                            <div className='nor-header'>{this.state.isUpdate ? "UpdateTask" : "Add Tasks"}</div>
                            <div className='input-container' style={{ flexDirection: 'column' }}>
                                <div className='inpt-container' >
                                    <input className='inpt-login' placeholder='Title' maxLength={50} onChange={(e) => this.handleChange("title", e.target.value)} value={this.state.title} />
                                    {this.state.errors.title && <span className='field-error'>{this.state.errors.title}</span>}
                                </div>
                                <div className='report-container' >
                                    <div className='inpt-container' style={{ position: 'relative', }} >
                                        <input className='inpt-login' placeholder='Contact' onClick={this.handleContact} value={this.state.contact} />
                                        {this.state.errors.contact && <span className='field-error'>{this.state.errors.contact}</span>}
                                        {this.state.isContactMenuOpen &&
                                            <div style={{ position: 'absolute', top: '52px', zIndex: 1000, width: '100%', }} onMouseLeave={this.handleMouseLeaveContact}>
                                                <CustomDropdown
                                                    option={this.state.contactData}
                                                    onSelect={(i) => this.handleSelectContact("contact", i)}
                                                    height={'auto'}
                                                />
                                            </div>
                                        }
                                    </div>
                                    <div className='inpt-container' style={{ position: 'relative', }} >
                                        <input className='inpt-login' placeholder='Deal' onClick={this.handleDeal} value={this.state.deal} />
                                        {this.state.errors.deal && <span className='field-error'>{this.state.errors.deal}</span>}
                                        {this.state.isDealMenuOpen &&
                                            <div style={{ position: 'absolute', top: '52px', zIndex: 1000, width: '100%', }} onMouseLeave={this.handleMouseLeaveDeal}>
                                                <CustomDropdown
                                                    option={this.state.dealData}
                                                    onSelect={(i) => this.handleSelectDeal("deal", i)}
                                                    height={'auto'}
                                                />
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className='inpt-container' style={{ position: 'relative', }}>
                                    <input className='inpt-login' placeholder='Assigned to' onClick={this.handleAssignedTo} value={this.state.assignedTo} />
                                    {this.state.errors.assignedTo && <span className='field-error'>{this.state.errors.assignedTo}</span>}
                                    {this.state.isAssignedToMenuOpen &&
                                        <div style={{ position: 'absolute', top: '52px', zIndex: 1000, width: '100%', }} onMouseLeave={this.handleMouseLeaveAssignedTo}>
                                            <CustomDropdown
                                                option={this.state.assignedToData}
                                                onSelect={(i) => this.handleSelectAssignedTo("assignedTo", i)}
                                                height={'auto'}
                                            />
                                        </div>
                                    }
                                </div>
                                <div className='inpt-container' style={{ position: 'relative', }} >
                                    <input className='inpt-login' placeholder='Duedate' maxLength={50} onClick={this.handleCloseDate} value={this.state.dueDate} />
                                    {this.state.isDueDate &&
                                        <div style={{ position: 'absolute', margin: '0px', top: '52px', zIndex: 1000 }} onMouseLeave={this.handleOffDueDate}>
                                            <DatePicker
                                                onSave={(d, m, y) => this.handleDueDateSelection("dueDate", d, m, y)}
                                                isDOB={true}
                                                minDate={new Date()}
                                                maxDate={new Date(new Date().setMonth(new Date().getMonth() + 2))}
                                            />
                                        </div>}
                                    {this.state.errors.dueDate && <span className='span-err'>{this.state.errors.dueDate}</span>}
                                </div>
                                <div className='report-container' >
                                    <div className='inpt-container' style={{ position: 'relative', }} >
                                        <input className='inpt-login' placeholder='Priority' onClick={this.handlePriority} value={this.state.priority} />
                                        {this.state.errors.priority && <span className='field-error'>{this.state.errors.priority}</span>}
                                        {this.state.isPriorityMenuOpen &&
                                            <div style={{ position: 'absolute', top: '52px', zIndex: 1000, width: '100%', }} onMouseLeave={this.handleMouseLeavePriority}>
                                                <CustomDropdown
                                                    option={this.state.priorityData}
                                                    onSelect={(i) => this.handleSelectPriority("priority", i)}
                                                    height={'auto'}
                                                />
                                            </div>
                                        }
                                    </div>
                                    <div className='inpt-container' style={{ position: 'relative', }}>
                                        <input className='inpt-login' placeholder='Status' onClick={this.handleStatus} value={this.state.status} />
                                        {this.state.errors.status && <span className='field-error'>{this.state.errors.status}</span>}
                                        {this.state.isStatusMenuOpen &&
                                            <div style={{ position: 'absolute', top: '52px', zIndex: 1000, width: '100%', }} onMouseLeave={this.handleMouseLeaveStatus}>
                                                <CustomDropdown
                                                    option={this.state.statusData}
                                                    onSelect={(i) => this.handleSelectStatus("status", i)}
                                                    height={'auto'}
                                                />
                                            </div>
                                        }
                                    </div>
                                </div>
                                <button className='btn-add-book center' onClick={this.handleSave} style={{ backgroundColor: Color.crmPrimary, height: '49px' }}>
                                    <div>{this.state.isUpdate ? "Update" : "Save"}</div>
                                </button>
                            </div>
                        </>
                    }
                </div>
            </div>
        )
    }
}

export default WithToaster(AddTask);

