import React from 'react'
import WithRouter from '../context/WithRouter'
import { ApiUrl } from '../Api';
import { Color } from '../Colors';
import { TableSkeleton } from '../component/TableSkeleton';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { Constant } from '../Constant';
import DeletePopup from '../component/DeletePopup';
import WithSearch from '../context/WithSearch';
import WithToaster from '../context/WithToaster';
import { ApiCall } from '../ApiCall';

class AddLeadResources extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      leadSource: '',
      leadSourcesError: '',
      successMessage: '',
      failureMessage: '',
      LeadSourcesList: [],
      LeadSourcesListClone: [],
      row: [
        { id: 1, field: 'source', header: 'Lead Sources' },
        { id: 2, field: null, header: 'Action' },
      ],
      isDelete: false,
      deleteID: null,
      updateID: null,
      isUpdate: false,
      isLoading: true,
      itemToBedelete: '',
    }
  }
  componentDidMount() {
    this.fetchLeadSources();
  }
  fetchLeadSources = async () => {
    try {
      await fetch(`${ApiUrl.url}/CRM/FetchLeadSource`)
        .then(res => res.json())
        .then(json => {
          if (json.data) {
            this.setState({
              LeadSourcesList: json.data,
              LeadSourcesListClone: json.data,
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
  handleLeadSource = (e) => {
    let val = e.target.value
    if (/^[A-Za-z ]*$/.test(val)) {
      this.setState({ leadSource: e.target.value, leadSourcesError: '' })
    }
    if (val) {
      this.setState({
        leadSourcesError: ''
      })
    }
    else {
      this.setState({
        leadSourcesError: Constant.required
      })
    }
  }


  handleCreateAccount = () => {
    let isLeadsource = false;
    if (this.state.leadSource) {
      this.setState({ leadSourcesError: '' })
      isLeadsource = true;
    }
    else {
      this.setState({ leadSourcesError: Constant.required })
    }
    if (isLeadsource) {
      let data =
      {
        id: this.state.isUpdate ? this.state.updateID : 0,
        source: this.state.leadSource,
      }
      this.handleCreateLeadSource(data);

    }
  }
  handleCreateLeadSource = async (data) => {
    try {
      const json = await ApiCall(`${ApiUrl.url}/CRM/AddUpdateLeadSources`, 'POST', data);

      if (json.status === 'S') {
        this.props.toast.show('S', json.message);
        this.handleClear();
        this.fetchLeadSources();
      }
      else {
        this.props.toast.show('F', json.message);
      }

    } catch (e) {
      this.props.toast.show('F', e.message);
    }

  }
  handleDelete = async () => {
    let data = {
      id: this.state.deleteID,
      source: ""
    }
    try {
      const json = await ApiCall(`${ApiUrl.url}/CRM/DeleteLeadSources`, 'POST', data);

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
  handleClear = () => {
    this.setState({
      leadSource: '',
    })
  }
  updateLead = (item) => {
    this.setState({
      leadSource: item.source,
      updateID: item.sourceID,
      isUpdate: true
    })
  }
  closeMenu = () => {
    this.setState({
      isDelete: false
    })
  }
  deleteLead = (item) => {
    this.setState({
      deleteID: item.sourceID,
      isDelete: true,
      itemToBedelete: item.source
    })
  }
  render() {
    const { searchValue } = this.props?.search;

    const LeadSourcesList = this.state.LeadSourcesListClone?.filter(lead =>
      lead?.source?.toLowerCase().includes(searchValue?.toLowerCase() || "")
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
              message={'Are you sure you want to Delete?'}
            />
          </div>}
        <h2>Add Lead Sources</h2>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '7px' }}>
            <div className='inpt-container' style={{ gap: '7px' }}>
              <input className='inpt-login' placeholder='Lead Sources' maxLength={50} onChange={this.handleLeadSource} value={this.state.leadSource} />
              {this.state.leadSourcesError && <span className='field-error'>{this.state.leadSourcesError}</span>}
            </div>
          </div>
          <div className='center'>
            <button className='btn-login' onClick={this.handleCreateAccount}>{this.state.isUpdate ? 'Update' : 'Add'}</button>
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
              {LeadSourcesList?.map(i =>
                <tr key={i.id}>
                  {this.state.row?.map(j =>
                    <td key={j.id} data-label={j.header}>{
                      j.field
                        ? (i[j.field])
                        :
                        (<div className='center' style={{ gap: '12px' }}>
                          <AiFillEdit size={25} color={Color.grey} onClick={() => this.updateLead(i)} />
                          <AiFillDelete size={25} color={Color.red} onClick={() => this.deleteLead(i)} />
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

export default WithRouter(WithToaster(WithSearch(AddLeadResources)));
