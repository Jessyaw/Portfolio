import React from 'react'
import { formatDate, handleOnKeyAmount, ValidateField, } from '../Validation';
import CustomDropdown from '../component/CustomDropdown';
import { Color } from '../Colors';
import DatePicker from '../component/DatePicker'
import { ApiUrl } from '../Api';
import { ApiCall } from '../ApiCall'
import WithToaster from '../context/WithToaster';
import { CgClose } from 'react-icons/cg';

class AddDeal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            contact: '',
            conatctdata: [],
            isContactMenuOpen: false,
            contactID: null,
            amount: '',
            stage: '',
            stageID: null,
            stageData: [],
            isOpenStageMenu: false,
            expectedCloseDate: '',
            isCloseDate: false,
            isUpdate: false,
            updateID: null,
            errors: {},
            isView: false,
            row: [
                { id: 1, field: 'title', header: 'Title ', fontWeight: 'bold', size: '25px' },
                { id: 2, field: 'contact', header: 'Contact', fontWeight: "", size: '' },
                { id: 3, field: 'amount', header: 'Amount', fontWeight: "", size: '' },
                { id: 4, field: 'stage', header: 'Stage', fontWeight: "", size: '' },
                { id: 5, field: 'expectedCloseDate', header: 'Close date', fontWeight: "", size: '' },
            ],
            teamID: null,
        }
    }
    componentDidMount() {
        let i = JSON.parse(sessionStorage.getItem("data"))
        this.setState({ teamID: i.teamID })
        this.fetchStage();
        if (this.props?.data) {
            let i = this.props.data;
            this.setState({
                contact: i?.leadname || i?.contact,
                contactID: i?.id,
                title: i?.title,
                expectedCloseDate: i?.closeDate ? formatDate(i?.closeDate) : '',
                stage: i?.stage,
                stageID: i?.stageID,
                amount: i?.amount,
                isUpdate: this.props?.isUpdate,
                updateID: i?.id,
                isView: this.props?.isView
            })
        }
    }
    componentDidUpdate() {

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

    handleChange = (field, value) => {
        this.setState((prevState) => ({
            [field]: value,
            errors: {
                ...prevState.errors,
                [field]: ValidateField(field, value)
            }
        }));
    }


    handleStage = () => {
        this.setState((prev) => ({
            isOpenStageMenu: !prev.isOpenStageMenu,
            isCloseDate: false,
        }))
    }

    handleSelectStage = (field, i) => {
        this.setState((prevState) => ({
            isOpenStageMenu: false,
            stageID: i.id,
            stage: i.stage,
            errors: {
                ...prevState.errors,
                [field]: ""
            }
        }));
    }
    handleCloseDate = (e) => {
        this.setState((prev) => ({
            isCloseDate: !prev.isCloseDate,
            isOpenStageMenu: false,
        }))
    }

    handleCloseDateSelection = (field, d, m, y) => {
        let date = d + ' ' + m + ' ' + y;
        this.setState((prevState) => ({
            expectedCloseDate: date,
            isCloseDate: false,
            errors: {
                ...prevState.errors,
                [field]: ""
            }
        }))
    }
    handleSave = () => {
        const { title, stage, expectedCloseDate, amount, contact } = this.state;
        const fields = { title, stage, expectedCloseDate, amount, contact }

        let errors = {};

        Object.keys(fields).forEach(field => {
            const error = ValidateField(field, fields[field]);
            if (error) errors[field] = error;
        });

        this.setState({ errors });

        if (Object.keys(errors).length === 0) {
            let date = new Date(this.state.expectedCloseDate);
            date.setHours(12, 0, 0, 0);
            let data = {
                id: this.state.isUpdate ? (this.state.updateID || 0) : 0,
                title: this.state.title,
                contactID: this.state.contactID,
                amount: this.state.amount,
                stageID: this.state.stageID,
                stage: "",
                contact: "",
                closeDate: date.toISOString(),
                teamID: this.state.teamID ? this.state.teamID : null,
            }
            this.handleAddUpdateDeal(data);
        }
    }

    handleAddUpdateDeal = async (data) => {
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/AddUpdateDeals`, 'POST', data);

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
            expectedCloseDate: '',
            amount: '',
            contact: '',
            stage: '',
            title: ''
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
                        : (<>
                            <div className='nor-header'>{this.state.isUpdate ? "Update Deal" : "Add Deal"}</div>
                            <div className='input-container' style={{ flexDirection: 'column' }}>
                                <div className='inpt-container' style={{ gap: '7px', }}>
                                    <input className='inpt-login' placeholder='Title' maxLength={50} onChange={(e) => this.handleChange("title", e.target.value)} value={this.state.title} />
                                    {this.state.errors.title && <span className='field-error'>{this.state.errors.title}</span>}
                                </div>
                                <div className='inpt-container' style={{ gap: '7px', position: 'relative', }} >
                                    <input className='inpt-login' contentEditable={false} placeholder='Contact' value={this.state.contact} />
                                </div>
                                <div className='inpt-container' style={{ gap: '7px', }}>
                                    <input className='inpt-login' placeholder='Amount' onKeyDown={(e) => handleOnKeyAmount(e)} maxLength={10} onChange={(e) => this.handleChange("amount", e.target.value)} value={this.state.amount} />
                                    {this.state.errors.amount && <span className='field-error'>{this.state.errors.amount}</span>}
                                </div>
                                <div className='inpt-container' style={{ gap: '7px', position: 'relative', }} >
                                    <input className='inpt-login' placeholder='Stage' onClick={this.handleStage} value={this.state.stage} />
                                    {this.state.errors.stage && <span className='field-error'>{this.state.errors.stage}</span>}
                                    {this.state.isOpenStageMenu &&
                                        <div style={{ position: 'absolute', top: '52px', zIndex: 1000, width: '100%', }} onMouseLeave={this.handleStage}>
                                            <CustomDropdown
                                                option={this.state.stageData}
                                                onSelect={(i) => this.handleSelectStage("stage", i)}
                                                height={'auto'}
                                            />
                                        </div>
                                    }
                                </div>
                                <div className='inpt-container' style={{ gap: '7px', position: 'relative', }} >
                                    <input className='inpt-login' placeholder='Expected close date' maxLength={50} onClick={this.handleCloseDate} value={this.state.expectedCloseDate} />
                                    {this.state.isCloseDate &&
                                        <div style={{ position: 'absolute', margin: '0px', top: '52px', zIndex: 10000 }} onMouseLeave={this.handleCloseDate}>
                                            <DatePicker
                                                onSave={(d, m, y) => this.handleCloseDateSelection("expectedCloseDate", d, m, y)}
                                                isDOB={true}
                                                minDate={new Date()}
                                                maxDate={new Date(new Date().setMonth(new Date().getMonth() + 2))}
                                            />
                                        </div>}
                                    {this.state.errors.expectedCloseDate && <span className='span-err'>{this.state.errors.expectedCloseDate}</span>}
                                </div>

                                <button className='btn-add-book center' onClick={this.handleSave} style={{ backgroundColor: Color.crmPrimary, height: '49px' }}>
                                    <div>{this.state.isUpdate ? "Update" : "Save"}</div>
                                </button>
                            </div>
                        </>)}
                </div>
            </div>
        )
    }
}


export default WithToaster(AddDeal);