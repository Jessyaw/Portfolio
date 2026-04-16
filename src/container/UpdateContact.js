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
import { BsEyeFill } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';

class UpdateContact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            leadData: [],
            row: [
                { id: 1, field: 'name', header: 'Name' },
                { id: 2, field: 'email', header: 'Email' },
                { id: 3, field: 'mobile', header: 'mobile' },
                { id: 4, field: 'source', header: 'Source' },
                { id: 4, field: 'dealCount', header: 'Deal Count' },
                { id: 5, field: 'notes', header: 'Notes' },
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
            errors: {},
            isView: false,
            dealCount: null,
        }
    }
    componentDidMount() {
        let i = JSON.parse(sessionStorage.getItem("data"))
        this.setState({
            userID: i.id
        })
        this.handleUpdate(this.props.data, this.props?.isUpdate, this.props?.isView);
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
    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.handleUpdate(this.props.data, this.props?.isUpdate, this.props?.isView);
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
                sourceID: i.sourceID,
                source: i.source,
                notes: i.notes,
                dealCount: i.dealCount,
                isView,
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

    handleMouseLeaveSource = () => {
        this.setState({
            isOpenSourceMenu: false,
        })

    }
    handleSource = () => {
        this.setState((prev) => ({
            isOpenSourceMenu: !prev.isOpenSourceMenu,
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
        }))
    }

    handleNote = (e) => {
        this.setState({
            notes: e.target.value
        })
    }
    handleValidate = () => {
        const { name, email, mobile, source } = this.state;
        const fields = { name, email, mobile, source }

        let errors = {};

        Object.keys(fields).forEach(field => {
            const error = ValidateField(field, fields[field]);
            if (error) errors[field] = error;
        });

        this.setState({ errors });

        if (Object.keys(errors).length === 0) {
            if (this.state.isUpdate) {
                this.UpdateContact();
            }
        }
    }


    UpdateContact = async () => {
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
                this.props.fetchContact();
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
    render() {
        return (
            <div className='signin-card-container' onClick={(e) => e.stopPropagation()} >
                <div className='signin-card' >
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
                            <div className='input-container' style={{ gap: '12px', flexDirection: 'column' }}>
                                <div className='nor-header'>Update Contact</div>
                                <div className='inpt-container' style={{ gap: '7px' }}>
                                    <input className='inpt-login' placeholder='Name' maxLength={50} onChange={(e) => this.handleChange("name", e.target.value)} value={this.state.name} />
                                    {this.state.errors.name && <span className='field-error'>{this.state.errors.name}</span>}
                                </div>
                                <div className='inpt-container' style={{ gap: '7px' }}>
                                    <input className='inpt-login' placeholder='Email' maxLength={75} onChange={(e) => this.handleChange("email", e.target.value)} value={this.state.email} />
                                    {this.state.errors.email && <span className='field-error'>{this.state.errors.email}</span>}
                                </div>
                                <div className='inpt-container' style={{ gap: '7px' }}>
                                    <input className='inpt-login' placeholder='mobile' maxLength={10} onChange={(e) => this.handleChange("mobile", e.target.value)} onKeyDown={(e) => handleOnKeyNumber(e)} onMouseLeave={this.handleMouseLeave} value={this.state.mobile} />
                                    {this.state.errors.mobile && <span className='field-error'>{this.state.errors.mobile}</span>}
                                </div>
                                <div className='inpt-container' style={{ gap: '7px', position: 'relative', }} >
                                    <input className='inpt-login' placeholder='Source' onClick={this.handleSource} value={this.state.source} />
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
                                <div className='inpt-container' style={{ gap: '7px', }}>
                                    <textarea
                                        className='inpt-login scroll textarea'
                                        placeholder='Notes'
                                        maxLength={300}
                                        onChange={this.handleNote}
                                        value={this.state.notes}
                                    />
                                </div>
                                <button className='btn-add-book center' onClick={this.handleValidate} style={{ backgroundColor: Color.crmPrimary, height: '49px', cursor: 'pointer' }}>
                                    <div>Update</div>
                                </button>
                            </div>
                        </>
                    }
                </div>
            </div>
        )
    }
}

export default WithToaster(UpdateContact)
