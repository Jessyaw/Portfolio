import React from 'react'
import { Color } from '../Colors'
import { TableSkeleton } from '../component/TableSkeleton';
import WithRouter from '../context/WithRouter';
import CustomDropdown from '../component/CustomDropdown';
import DatePicker from '../component/DatePicker';
import { ApiCall } from '../ApiCall';
import { ApiUrl } from '../Api';
import WithToaster from '../context/WithToaster';
import { formatDate, ValidateField } from '../Validation';
import { FaCheckCircle, FaTimesCircle, FaTasks, FaCheckDouble, FaClock, FaHandshake } from "react-icons/fa";
import { MdAttachMoney, MdWarning } from "react-icons/md";
import WithSearch from '../context/WithSearch';

const now = new Date();

class CRMREports extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dealStat: [
                { id: 1, key: 'totalDeals', icon: <FaHandshake size={20} />, card: 'Total Deals', count: 0, isHover: false },
                { id: 2, key: 'totalWon', icon: <FaCheckCircle size={20} />, card: 'Total Won', count: 0, isHover: false },
                { id: 3, key: 'totalLost', icon: <FaTimesCircle size={20} />, card: 'Deals Lost', count: 0, isHover: false },
                { id: 4, key: 'totalRevenue', icon: <MdAttachMoney size={20} />, card: 'Tasks Revenue', count: 0, isHover: false },
            ],
            taskStat: [
                { id: 1, key: 'totalTasks', icon: <FaTasks size={20} />, card: 'Total Tasks', count: 0, isHover: false },
                { id: 2, key: 'completed', icon: <FaCheckDouble size={20} />, card: 'Completed', count: 0, isHover: false },
                { id: 3, key: 'pending', icon: <FaClock size={20} />, card: 'Pending', count: 0, isHover: false },
                { id: 4, key: 'overDue', icon: <MdWarning size={20} />, card: 'Overdue', count: 0, isHover: false },
            ],
            reportType: [
                { id: 1, icon: <FaHandshake size={20} />, title: 'Deal Report', isOpen: false, isHover: false },
                { id: 2, icon: <FaTasks size={20} />, title: 'Task Report', isOpen: false, isHover: false },
            ],
            statusData: [],
            stageData: [],
            report: 'Deal Report',
            reportID: 1,
            dealReport: [],
            isOpenReport: false,
            isOpenStartDate: '',
            startDate: formatDate(new Date(now.getFullYear(), now.getMonth(), 1)),
            isOpenEndDate: '',
            endDate: formatDate(new Date(now.getFullYear(), now.getMonth() + 1, 0)),
            dealReportRow: [
                { id: 1, field: 'title', header: 'Deal' },
                { id: 2, field: 'leadName', header: 'Contact' },
                { id: 3, field: 'amount', header: 'Amount' },
                { id: 4, field: 'stage', header: 'Stage' },
                { id: 5, field: 'closeDate', header: 'Closing date' },
            ],
            taskReport: [],
            taskReportRow: [
                { id: 1, field: 'title', header: 'Title' },
                { id: 2, field: 'fullName', header: 'Assigned To' },
                { id: 3, field: 'dueDate', header: 'Due Date' },
                { id: 4, field: 'taskPriority', header: 'Priority' },
                { id: 5, field: 'taskStatus', header: 'Status' },
            ],
            isOpenStage: false,
            stage: '',
            errors: {},
            stageID: null,
            statusID: null,
            isLoading: true,
            isDeals: true,
            isStage: true,
        }
    }
    componentDidMount() {
        this.fetchStatus()
        this.fetchStage()
        this.handleFilter(true);
    }

    fetchStage = async () => {
        try {
            await fetch(`${ApiUrl.url}/CRM/FetchDealsStages`)
                .then(res => res.json())
                .then(json => {
                    if (json.data) {
                        this.setState({
                            stageData: [...json.data],
                        })
                    }
                });
        } catch (e) {

        }
    }

    fetchStatus = async () => {
        try {
            await fetch(`${ApiUrl.url}/CRM/FetchTasksStatus`)
                .then(res => res.json())
                .then(json => {
                    if (json.data) {
                        this.setState({
                            statusData: [...json.data],
                        })
                    }
                });
        } catch (e) {

        }
    }
    handleReportType = () => {
        this.setState(prev => ({
            isOpenReport: !prev.isOpenReport
        }));
    }
    handleMouseLeaveReport = () => {
        this.setState({
            isOpenReport: false,
        })
    }
    handleSelectReport = (fields, i) => {
        this.setState((prevState) => ({
            isOpenReport: false,
            report: i.title,
            reportID: i.id,
            errors: {
                ...prevState.errors,
                [fields]: "",
            },
            isStage: i.id == 1,
            stage: '',
            stageID: null,
            statusID: null,
        }))
    }
    handleStartDate = () => {
        this.setState({
            isOpenStartDate: true,
        })
    }
    handleOffStartDate = () => {
        this.setState({
            isOpenStartDate: false,
        })
    }
    handleSelectStartDate = (fields, d, m, y) => {
        let date = d + " " + m + " " + y
        this.setState((prevState) => ({
            isOpenStartDate: false,
            startDate: date,
            errors: {
                ...prevState.errors,
                [fields]: ""
            },
        }))
    }
    handleEndDate = () => {
        this.setState({
            isOpenEndDate: true,
        })
    }
    handleOffEndDate = () => {
        this.setState({
            isOpenEndDate: false,
        })
    }
    handleSelectEndDate = (fields, d, m, y) => {
        let date = d + " " + m + " " + y
        this.setState((prevState) => ({
            isOpenEndDate: false,
            endDate: date,
            errors: {
                ...prevState.errors,
                [fields]: ""
            }
        }))
    }
    handleStage = () => {
        this.setState(prev => ({
            isOpenStage: !prev.isOpenStage
        }))
    }
    handleOffStage = () => {
        this.setState(prev => ({
            isOpenStage: !prev.isOpenStage
        }))
    }
    handleSelectStage = (i) => {
        if (this.state.isStage) {
            this.setState({
                isOpenStage: false,
                stage: i.stage,
                stageID: i.id,
                statusID: null,
            })
        } else {
            this.setState({
                isOpenStage: false,
                stage: i.status,
                statusID: i.id,
                stageID: null,
            })
        }
    }
    handleSave = async () => {
        const { report, startDate, endDate } = this.state;
        const fields = { report, startDate, endDate }

        let errors = {};

        Object.keys(fields).forEach(field => {
            const error = ValidateField(field, fields[field]);
            if (error) errors[field] = error;
        });

        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            errors.startDate = "Start date cannot be after end date";
        }

        this.setState({ errors });

        if (Object.keys(errors).length === 0) {
            const isDeals = this.state.reportID == 1;
            await this.handleFilter(isDeals);
        }
    }
    handleFilter = async (isDeals) => {
        let data = {
            id: 0,
            isDeals: isDeals,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            stageID: this.state.stageID,
            statusID: this.state.statusID,
            title: "",
            leadName: "",
            amount: 0,
            stage: "",
            closeDate: null,
            dueDate: null,
            taskStatus: "",
            taskPriority: "",
            totalDeals: 0,
            totalTasks: 0,
            totalRevenue: 0,
            completed: 0,
            pending: 0,
            overDue: 0,
            totalWon: 0,
            totalLost: 0
        }
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/FilterDealsOrTasks`, 'POST', data);
            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.handleClear();
                const hasData = Array.isArray(json.data) && json.data.length > 0;
                let stat = hasData ? json.data[0] : {};
                this.setState((prevState) => ({
                    dealStat: prevState.dealStat.map(i => ({
                        ...i,
                        count: stat[i.key] ?? 0
                    })),
                    taskStat: prevState.taskStat.map(i => ({
                        ...i,
                        count: stat[i.key] ?? 0
                    })),
                    dealReport: json.data,
                    taskReport: json.data,
                    isLoading: false,
                    isDeals
                }))
            }
            else {
                this.props.toast.show('F', json.message);
            }
        } catch (e) {
            this.props.toast.show('F', e.message);
        }
    }
    handleClear = () => {
        this.setState({ stage: '' });
    }
    render() {
        const { searchValue = "" } = this.props?.search || {};

        const taskReport = (this.state.taskReport || []).filter(task =>
            (task?.fullName || "").toLowerCase().includes(searchValue.toLowerCase()) ||
            (task?.title || "").toLowerCase().includes(searchValue.toLowerCase())
        );

        const dealReport = (this.state.dealReport || []).filter(deal =>
            (deal?.title || "").toLowerCase().includes(searchValue.toLowerCase()) ||
            (deal?.leadName || "").toLowerCase().includes(searchValue.toLowerCase())
        );
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className='report-container'>
                    <div className='inpt-container' style={{ gap: '7px', position: 'relative', }} >
                        <input className='inpt-login' placeholder='Report type' onMouseDown={this.handleReportType} value={this.state.report} readOnly />
                        {this.state.errors.report && <span className='span-err'>{this.state.errors.report}</span>}
                        {this.state.isOpenReport &&
                            <div style={{ position: 'absolute', top: '52px', zIndex: 1000, width: '100%', }} >
                                <CustomDropdown
                                    height={'auto'}
                                    option={this.state.reportType}
                                    onSelect={(i) => this.handleSelectReport("report", i)}
                                // defaultID={1}
                                />
                            </div>
                        }
                    </div>
                    <div className='inpt-container' style={{ gap: '7px', position: 'relative', }} >
                        <input className='inpt-login' placeholder='Start date' maxLength={50} onClick={this.handleStartDate} value={this.state.startDate} />
                        {this.state.errors.startDate && <span className='span-err'>{this.state.errors.startDate}</span>}
                        {this.state.isOpenStartDate &&
                            <div style={{ position: 'absolute', margin: '0px', top: '52px', zIndex: 10000 }} onMouseLeave={this.handleOffStartDate}>
                                <DatePicker
                                    onSave={(d, m, y) => this.handleSelectStartDate("startDate", d, m, y)}
                                    isDOB={true}
                                    minDate={null}
                                    maxDate={this.state.endDate || null}
                                />
                            </div>}
                    </div>
                    <div className='inpt-container' style={{ gap: '7px', position: 'relative', }} >
                        <input className='inpt-login' placeholder='End date' maxLength={50} onClick={this.handleEndDate} value={this.state.endDate} />
                        {this.state.errors.endDate && <span className='span-err'>{this.state.errors.endDate}</span>}
                        {this.state.isOpenEndDate &&
                            <div style={{ position: 'absolute', margin: '0px', top: '52px', zIndex: 10000 }} onMouseLeave={this.handleOffEndDate}>
                                <DatePicker
                                    onSave={(d, m, y) => this.handleSelectEndDate("endDate", d, m, y)}
                                    isDOB={true}
                                    minDate={this.state.startDate || null}
                                    maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
                                />
                            </div>}
                    </div>
                    <div className='inpt-container' style={{ gap: '7px', position: 'relative', }} >
                        <input className='inpt-login' placeholder='Status/Stage' onClick={this.handleStage} value={this.state.stage} />
                        {this.state.isOpenStage &&
                            <div style={{ position: 'absolute', top: '52px', zIndex: 1000, width: '100%', }} onMouseLeave={this.handleOffStage}>
                                <CustomDropdown
                                    height={'auto'}
                                    option={this.state.isStage ? this.state.stageData : this.state.statusData}
                                    onSelect={(i) => this.handleSelectStage(i)}
                                />
                            </div>
                        }
                    </div>
                    <button className='btn-add-book center' onClick={this.handleSave} style={{ backgroundColor: Color.crmPrimary, height: '49px' }}>
                        <div>Save</div>
                    </button>
                </div>
                <div className='card-conatainer'>
                    {this.state.isDeals ?
                        this.state.dealStat?.map(i =>
                            <div className='stat-card' style={{ color: Color.whiteFont, backgroundColor: Color.crmPrimary }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div className='center'>{i.card}</div>
                                    <div className='center'>{i.icon}</div>
                                </div>
                                <div>{i.count}</div>
                            </div>
                        )
                        : this.state.taskStat?.map(i =>
                            <div className='stat-card' style={{ color: Color.whiteFont, backgroundColor: Color.crmPrimary }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div className='center'>{i.card}</div>
                                    <div className='center'>{i.icon}</div>
                                </div>
                                <div>{i.count}</div>
                            </div>
                        )}
                </div>
                {/* tab */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className='tbl-scroll'>
                        {this.state.isDeals ?
                            < table style={{ width: '100%' }}>
                                <thead style={{ backgroundColor: Color.crmPrimary, position: 'sticky', top: 0, zIndex: 1 }}>
                                    <tr>
                                        {this.state.dealReportRow?.map(j =>
                                            <th key={j.id} style={{ textAlign: 'center', padding: '12px', borderRadius: '4px', color: Color.whiteFont }}>{j.header}</th>
                                        )}
                                    </tr>
                                </thead>
                                {this.state.isLoading ?
                                    (<TableSkeleton rows={dealReport?.length} cols={this.state.dealReportRow?.length} />)
                                    : (<tbody>
                                        {
                                            dealReport.length > 0 ?
                                                this.state.dealReport?.map(i =>
                                                    <tr key={i.id}>
                                                        {this.state.dealReportRow?.map(j =>
                                                            <td data-label={j.header} key={j.id} style={{ textAlign: 'center', padding: '12px 0px' }}>{
                                                                j.field === 'closeDate' ? formatDate(i[j.field]) : i[j.field]
                                                            }</td>
                                                        )}
                                                    </tr>
                                                )
                                                : <tr>
                                                    <td colSpan={this.state.dealReportRow?.length} style={{ textAlign: 'center' }}>
                                                        No data
                                                    </td>
                                                </tr>
                                        }
                                    </tbody>)}
                            </table>
                            : < table style={{ width: '100%' }}>
                                <thead style={{ backgroundColor: Color.crmPrimary, position: 'sticky', top: 0, zIndex: 1 }}>
                                    <tr>
                                        {this.state.taskReportRow?.map(j =>
                                            <th key={j.id} style={{ textAlign: 'center', padding: '12px', borderRadius: '4px', color: Color.whiteFont }}>{j.header}</th>
                                        )}
                                    </tr>
                                </thead>
                                {this.state.isLoading ? (<TableSkeleton rows={this.state.taskReport?.length} cols={this.state.taskReportRow?.length} />) : (<tbody>
                                    {
                                        taskReport.length > 0 ?
                                            taskReport?.map(i =>
                                                <tr key={i.id}>
                                                    {this.state.taskReportRow?.map(j =>
                                                        <td data-label={j.header} key={j.id} style={{ padding: '12px 0px' }}>{
                                                            j.field === 'dueDate' ? formatDate(i[j.field]) : i[j.field]
                                                        }</td>
                                                    )}
                                                </tr>
                                            )
                                            : <tr>
                                                <td colSpan={this.state.dealReportRow?.length} style={{ textAlign: 'center' }}>
                                                    No data
                                                </td>
                                            </tr>
                                    }
                                </tbody>)}
                            </table>}
                    </div>
                </div>
            </div>
        )
    }
}

export default WithRouter(WithToaster(WithSearch(CRMREports)));
