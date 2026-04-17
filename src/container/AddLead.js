import React from 'react'
import { handleOnKeyAlpha, handleOnKeyNumber } from '../Validation';
import { ValidateField } from '../Validation';
import CustomDropdown from '../component/CustomDropdown';
import { Color } from '../Colors';
import { ApiUrl } from '../Api';
import { ApiCall } from '../ApiCall'
import WithToaster from '../context/WithToaster';
import { CgClose } from 'react-icons/cg';

class AddLead extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            leadData: [],
            row: [
                { id: 1, field: 'name', header: 'Name' },
                { id: 2, field: 'email', header: 'Email' },
                { id: 3, field: 'mobile', header: 'mobile' },
                { id: 4, field: 'status', header: 'Status' },
                { id: 5, field: 'source', header: 'Source' },
                { id: 6, field: 'notes', header: 'Notes' },
            ],
            isAdd: false,
            sourceData: [],
            name: null,
            mobile: null,
            source: null,
            sourceID: null,
            isOpenSourceMenu: false,
            status: null,
            statusID: null,
            statusData: [],
            isOpenStatusMenu: false,
            notes: null,
            email: null,
            isUpdate: false,
            successMessage: '',
            failureMessage: '',
            isLoading: true,
            updateID: null,
            userID: null,
            teamID: null,
            errors: {},
            isView: false,
        }
    }
    componentDidMount() {
        let i = JSON.parse(sessionStorage.getItem("data"))
        console.log(i)
        this.setState({
            userID: i.id,
            teamID: i.teamID
        })
        this.handleUpdate(this.props.update, this.props?.isUpdate, this.props?.isView);
        this.fetchSource();
        this.fetchStatus();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.update !== this.props.update) {
            this.handleUpdate(this.props.update, this.props?.isUpdate, this.props?.isView);
        }
    }
    handleUpdate = (i, isUpdate, isView) => {
        if (isUpdate || isView) {
            this.setState({
                isUpdate,
                updateID: i.id,
                name: i.leadname,
                email: i.email,
                mobile: i.mobile,
                status: i.status,
                statusID: i.statusID,
                sourceID: i.sourceID,
                source: i.source,
                notes: i.notes,
                isView
            })
        }
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
    fetchStatus = async () => {
        try {
            await fetch(`${ApiUrl.url}/CRM/FetchLeadStatus`)
                .then(res => res.json())
                .then(json => {
                    if (json.data) {
                        this.setState({
                            statusData: json.data,
                        })
                    }
                });
        } catch (e) {

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
        this.setState((prev) => ({
            isOpenSourceMenu: !prev.isOpenSourceMenu,
            isOpenStatusMenu: false,
        }))
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
        }));
    }
    handleMouseLeaveStatus = () => {
        this.setState({
            isOpenStatusMenu: false,
        })

    }
    handleStatus = () => {
        this.setState((prev) => ({
            isOpenStatusMenu: !prev.isOpenStatusMenu,
            isOpenSourceMenu: false
        }))
    }
    handleSelectStatus = (field, i) => {
        this.setState((prevState) => ({
            isOpenStatusMenu: false,
            statusID: i.statusID,
            status: i.status,
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
    handleSave = () => {
        const { name, email, status, mobile, source } = this.state;
        const fields = { name, email, status, mobile, source }

        let errors = {};

        Object.keys(fields).forEach(field => {
            const error = ValidateField(field, fields[field]);
            if (error) errors[field] = error;
        });

        this.setState({ errors });

        if (Object.keys(errors).length === 0) {
            let data =
            {
                id: this.state.isUpdate ? this.state.updateID : 0,
                userID: this.state.userID ? this.state.userID : null,
                teamID: this.state.teamID ? this.state.teamID : null,
                leadname: this.state.name,
                email: this.state.email,
                mobile: this.state.mobile,
                sourceID: this.state.sourceID,
                source: "",
                status: "",
                statusID: this.state.statusID,
                notes: this.state.notes
            }

            this.handleAddUpdateLead(data);
        }

    }

    handleClear = () => {
        this.setState({
            name: '',
            email: '',
            mobile: '',
            status: '',
            source: '',
            notes: '',
            isAdd: true
        })
    }

    handleAddUpdateLead = async (data) => {
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/AddUpdateLead`, 'POST', data);

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
                            <div className='input-container' style={{ flexDirection: 'column' }}>
                                <div className='nor-header'>Add Lead</div>
                                <div className='inpt-container' style={{ gap: '7px' }}>
                                    <input className='inpt-login' placeholder='Name' maxLength={50} onChange={(e) => this.handleChange("name", e.target.value)} value={this.state.name} />
                                    {this.state.errors.name && <span className='field-error'>{this.state.errors.name}</span>}
                                </div>
                                <div className='inpt-container' style={{ gap: '7px' }}>
                                    <input className='inpt-login' placeholder='Email' maxLength={75} onChange={(e) => this.handleChange("email", e.target.value)} value={this.state.email} />
                                    {this.state.errors.email && <span className='field-error'>{this.state.errors.email}</span>}
                                </div>
                                <div className='inpt-container' style={{ gap: '7px' }}>
                                    <input className='inpt-login' placeholder='Mobile' onChange={(e) => this.handleChange("mobile", e.target.value)} onKeyDown={(e) => handleOnKeyNumber(e)} onMouseLeave={this.handleMouseLeave} value={this.state.mobile} />
                                    {this.state.errors.mobile && <span className='field-error'>{this.state.errors.mobile}</span>}
                                </div>
                                <div className='inpt-container' style={{ gap: '7px', position: 'relative', }} >
                                    <input className='inpt-login' placeholder='Source' onClick={this.handleSource} value={this.state.source} />
                                    {this.state.errors.source && <span className='field-error'>{this.state.errors.source}</span>}
                                    {this.state.isOpenSourceMenu &&
                                        <div style={{ position: 'absolute', top: '52px', zIndex: 1000, width: '100%', }} onMouseLeave={this.handleMouseLeaveSource}>
                                            <CustomDropdown
                                                height={'auto'}
                                                option={this.state.sourceData}
                                                onSelect={(i) => this.handleSelectSource("source", i)}
                                            />
                                        </div>
                                    }
                                </div>
                                <div className='inpt-container' style={{ gap: '7px', position: 'relative', }} >
                                    <input className='inpt-login' placeholder='Status' onClick={this.handleStatus} value={this.state.status} />
                                    {this.state.errors.status && <span className='field-error'>{this.state.errors.status}</span>}
                                    {this.state.isOpenStatusMenu &&
                                        <div style={{ position: 'absolute', top: '52px', zIndex: 1000, width: '100%', }} onMouseLeave={this.handleMouseLeaveStatus}>
                                            <CustomDropdown
                                                height={'auto'}
                                                option={this.state.statusData}
                                                onSelect={(i) => this.handleSelectStatus("status", i)}
                                            />
                                        </div>
                                    }
                                </div>
                                <div className='inpt-container' style={{ gap: '7px', }}>
                                    <textarea
                                        className='inpt-login scroll'
                                        placeholder='Notes'
                                        maxLength={300}
                                        onChange={this.handleNote}
                                        value={this.state.notes}
                                        style={{
                                            height: 'auto',
                                            resize: 'none',
                                            fontSize: '14px',
                                        }}
                                    />
                                </div>
                                <button className='btn-add-book center' onClick={this.handleSave} style={{ backgroundColor: Color.crmPrimary, height: '49px', cursor: 'pointer' }}>
                                    <div>{this.state.isUpdate ? 'Update' : 'Save'}</div>
                                </button>
                            </div>
                        </>
                    }
                </div>
            </div>
        )
    }
}

export default WithToaster(AddLead);
