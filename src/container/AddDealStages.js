import React from 'react'
import WithRouter from '../context/WithRouter'
import { ApiUrl } from '../Api';
import { ApiCall } from '../ApiCall';
import { Color } from '../Colors';
import { TableSkeleton } from '../component/TableSkeleton';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { Constant } from '../Constant';
import DeletePopup from '../component/DeletePopup';
import WithSearch from '../context/WithSearch';
import WithToaster from '../context/WithToaster';


class AddDealStages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            dealStages: '',
            dealStagesError: '',
            successMessage: '',
            failureMessage: '',
            isPWVisible: false,
            isConfirmPWVisible: false,
            DealStagesList: [],
            DealStagesListClone: [],
            row: [
                { id: 1, field: 'stage', header: 'Deal Stages' },
                { id: 2, field: null, header: 'Action' },
            ],
            isLoading: true,
            isUpdate: false,
            isDelete: false,
            updateID: null,
            deleteID: null,
        }
    }
    componentDidMount() {
        this.fetchDealStages();
    }
    fetchDealStages = async () => {
        try {
            await fetch(`${ApiUrl.url}/CRM/FetchDealsStages`)
                .then(res => res.json())
                .then(json => {
                    if (json.data) {
                        this.setState({
                            DealStagesList: json.data,
                            DealStagesListClone: json.data,
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
    handleDealStages = (e) => {
        let val = e.target.value
        if (/^[A-Za-z ]*$/.test(val)) {
            this.setState({ dealStages: e.target.value, dealStagesError: '' })
        }
        if (val) {
            this.setState({
                dealStagesError: ''
            })
        }
        else {
            this.setState({
                dealStagesError: Constant.required
            })
        }
    }

    handleDelete = async () => {
        let data = {
            id: this.state.deleteID,
            stage: ""
        }
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/DeleteDealStages`, 'POST', data);

            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.handleClear();
                this.fetchUser();
            }
            else {
                this.props.toast.show('F', json.message);
            }

        } catch (e) {
            this.props.toast.show('F', e.message);
        }
    }
    handleAdd = () => {
        let { isLeadsource } = false;
        if (this.state.dealStages) {
            this.setState({ dealStagesError: '' })
            isLeadsource = true;
        }
        else {
            this.setState({ dealStagesError: Constant.required })
        }
        if (isLeadsource) {
            let data = {
                stage: this.state.dealStages,
                id: this.state.isUpdate ? this.state.updateID : 0
            }
            this.handleAddUpdateDealStages(data);
        }
    }
    handleAddUpdateDealStages = async (data) => {
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/AddUpdateDealStages`, 'POST', data);

            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.handleClear();
                this.fetchDealStages();
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
            dealStages: '',
        })
    }
    updateDeal = (item) => {
        this.setState({
            dealStages: item.stage,
            updateID: item.id,
            isUpdate: true
        })
    }
    closeMenu = () => {
        this.setState({
            isDelete: false
        })
    }
    deleteDeal = (item) => {
        this.setState({
            deleteID: item.id,
            isDelete: true,
            itemToBedelete: item.stage
        })
    }
    render() {
        const { searchValue } = this.props?.search;

        const DealStagesList = this.state.DealStagesListClone?.filter(deal =>
            deal?.stage?.toLowerCase().includes(searchValue?.toLowerCase() || "")
        )
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {this.state.isDelete &&
                    <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', zIndex: 10000 }}>
                        <DeletePopup
                            onClose={this.closeMenu}
                            item={this.state.itemToBedelete}
                            onDelete={(v, id) => { this.handleDelete(v, id) }}
                            ID={this.state.deleteID}
                            message={'Are you sure you want to Delete this?'}
                        />
                    </div>}
                <h2>Add Deal Stages</h2>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '7px' }}>
                        <div className='inpt-container' style={{ gap: '7px' }}>
                            <input className='inpt-login' placeholder='Deal Stages' maxLength={50} onChange={this.handleDealStages} value={this.state.dealStages} />
                            {this.state.dealStagesError && <span className='field-error'>{this.state.dealStagesError}</span>}
                        </div>
                    </div>
                    <div className='center'>
                        <button className='btn-login' onClick={this.handleAdd}>{this.state.isUpdate ? 'Update' : 'Add'}</button>
                    </div>
                </div>

                <div className='tbl-scroll'>
                    <table style={{ width: '100%' }}>
                        <thead style={{ backgroundColor: Color.crmPrimary, position: 'sticky', top: 0, zIndex: 1 }}>
                            <tr>
                                {this.state.row?.map(j =>
                                    <th key={j.id} style={{ textAlign: 'center', padding: '16px 5px', borderRadius: '4px', color: Color.whiteFont }}>{j.header}</th>
                                )}
                            </tr>
                        </thead>
                        {this.state.isLoading ? (<TableSkeleton rows={5} cols={this.state.row?.length} />) : (<tbody>

                            {DealStagesList?.map(i =>
                                <tr key={i.id}>
                                    {this.state.row?.map(j =>
                                        <td key={j.id} data-label={j.header}>{
                                            j.field
                                                ? (i[j.field])
                                                :
                                                (<div className='center' style={{ gap: '12px' }}>
                                                    <AiFillEdit size={25} color={Color.grey} onClick={() => this.updateDeal(i)} />
                                                    <AiFillDelete size={25} color={Color.red} onClick={() => this.deleteDeal(i)} />
                                                </div>)
                                        }</td>
                                    )}
                                </tr>
                            )}

                        </tbody>)}
                    </table>
                </div>

            </div>
        )
    }
}

export default WithRouter(WithToaster(WithSearch(AddDealStages)));
