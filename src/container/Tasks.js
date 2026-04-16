import React from 'react'
import { FaPlus } from 'react-icons/fa';
import { Color } from '../Colors';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import DeletePopup from '../component/DeletePopup';
import { TableSkeleton } from '../component/TableSkeleton';
import { ApiUrl } from '../Api';
import { BiShow } from 'react-icons/bi';
import AddTask from './AddTask';
import { formatDate } from '../Validation';
import WithRouter from '../context/WithRouter';
import WithToaster from '../context/WithToaster';
import { ApiCall } from '../ApiCall';
import { BsEyeFill } from 'react-icons/bs';
import WithSearch from '../context/WithSearch';
import { TbSortAscending2Filled, TbSortDescending2Filled } from "react-icons/tb";
import { Size } from '../Size';


class Tasks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            taskDetails: [],
            taskDetailsClone: [],
            updateData: [],
            row: [
                { id: 1, field: 'title', header: 'Title' },
                { id: 2, field: 'leadName', header: 'Contact' },
                { id: 3, field: 'dueDate', header: 'DueDate' },
                { id: 4, field: 'priority', header: 'Priority' },
                { id: 5, field: 'status', header: 'Status' },
                { id: 6, field: '', header: 'Action' },
            ],
            isAdd: false,
            title: null,
            titleError: null,
            author: null,
            authorError: null,
            TaskCategory: null,
            TaskCategoryError: null,
            quantity: null,
            quantityError: null,
            isOpenCategory: false,
            categoryID: null,
            isUpdate: false,
            isDelete: false,
            itemToBedelete: '',
            deleteID: null,
            isLoading: true,
            isView: false,
            sortOrder: '',
            sortField: ['title', 'leadName'],
            hoverField: null,
            screenWidth: window.innerWidth,
            roleFilter: [],
        }
    }

    componentDidMount() {
        let i = JSON.parse(sessionStorage.getItem("data"))
        let data = {
            roleID: i?.roleID,
            userID: i?.id,
            teamID: i?.teamID
        }
        this.setState({ roleFilter: data })
        this.fetchTask(data);
    }
    handleSearch = () => {
        if (this.state.searchValue == '') return;
        let data = this.state.crmPrimaryDetailsClone?.filter(i =>
            i?.title.toLowerCase().includes(this.state.searchValue)
        )
        this.setState({
            taskDetailsClone: data
        })
    }
    fetchTask = async (data) => {
        this.setState({ isLoading: true, })
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/FetchTasks`, 'POST', data);
            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.setState({
                    taskDetails: json.data,
                    taskDetailsClone: json.data,
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



    handleSave = async () => {
        this.fetchTask(this.state.roleFilter);
        this.setState({
            isAdd: false
        })

    }

    updateTask = async (i) => {
        this.setState({
            updateData: i,
            isAdd: false,
            isUpdate: true,
            isView: false,
        })
    }
    deleteTask = async (i) => {
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
    handleDelete = async (i) => {

        let deleteID = {
            id: this.state.deleteID,
            title: "",
            leadName: "",
            deal: "",
            dealID: 0,
            contactID: 0,
            assignedTo: 0,
            dueDate: new Date(),
            priorityID: 0,
            priority: "",
            statusID: 0,
            status: "",
            userName: ""
        }
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/DeleteTask`, 'POST', deleteID);

            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.fetchTask(this.state.roleFilter);
                this.setState({
                    isDelete: false,
                })
            }
            else {
                this.props.toast.show('F', json.message);
            }

        } catch (e) {
            this.props.toast.show('F', e.message);
        }
    }

    closeTask = (i) => {
        this.setState({
            isAdd: false,
            isView: false,
            isUpdate: false,
        })
    }
    handleView = (i) => {
        this.setState({
            isUpdate: false,
            isView: true,
            updateData: i,
            isAdd: false
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
        const taskDetails = this.state.taskDetails?.filter(task =>
            task?.leadName.toLowerCase().includes(searchValue?.toLowerCase() || "") ||
            task?.title.toLowerCase().includes(searchValue?.toLowerCase() || "")
        )
        const { sortField, sortOrder } = this.state;
        let sortedLeads = [...taskDetails];
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
                    <div className='medium-heading'>Tasks</div>
                    {!this.state.isAdd &&
                        <button className='btn-add-book'
                            onClick={() => {
                                this.setState({ isAdd: true, isUpdate: false, isView: false })
                            }}
                            style={{ backgroundColor: Color.crmPrimary, }}>
                            <div className='center'><FaPlus size={20} /></div>
                            <div className='center' > Task</div>
                        </button>
                    }
                </div>


                {this.state.isDelete && <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', zIndex: 100 }}>
                    <DeletePopup
                        onClose={this.closeMenu}
                        item={this.state.itemToBedelete}
                        onDelete={(v, id) => { this.handleDelete(v, id) }}
                        ID={this.state.deleteID}
                        message={'Do you want delete this Task?'}
                    />
                </div>}
                {(this.state.isAdd || this.state.isView || this.state.isUpdate) &&
                    <div
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
                            //background: '#ffffff66',
                            background: '#00000033'
                        }}
                        onClick={() => this.closeTask()}
                    >
                        <AddTask
                            Saved={() => this.handleSave()}
                            data={(this.state.isUpdate || this.state.isView) && this.state.updateData}
                            isUpdate={this.state.isUpdate}
                            isView={this.state.isView}
                            onClose={() => this.closeTask()}
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
                                                (this.state?.sortField === j.field || this.state.hoverField === j.field) && (
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
                        {this.state.isLoading ? (<TableSkeleton rows={5} cols={this.state.row?.length || 0} />) : (<tbody>

                            {sortedLeads.length > 0 ?
                                sortedLeads?.map(i =>
                                    <tr key={i.id}>
                                        {this.state.row?.map(j =>
                                            <td key={j.id} data-label={j.header}>{
                                                j.field
                                                    ? j.field == 'dueDate' ? formatDate(i[j.field]) : i[j.field]
                                                    : j.header === 'Action'
                                                    && <div className='center' style={{ gap: '12px' }}>
                                                        <AiFillEdit size={Size(this.state.screenWidth)} color={Color.grey} onClick={() => this.updateTask(i)} />
                                                        <AiFillDelete size={Size(this.state.screenWidth)} color={Color.red} onClick={() => this.deleteTask(i)} />
                                                        <BsEyeFill size={Size(this.state.screenWidth)} color={Color.bgDark} onClick={() => this.handleView(i)} />
                                                    </div>
                                            }</td>
                                        )}
                                    </tr>
                                )
                                :
                                "No tasks yet"}

                        </tbody>)}
                    </table>
                </div>
            </div>
        )
    }
}

export default WithRouter(WithToaster(WithSearch(Tasks)));
