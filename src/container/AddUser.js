import React from 'react'
import WithRouter from '../context/WithRouter'
import { ApiUrl } from '../Api';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Color } from '../Colors';
import CustomDropdown from '../component/CustomDropdown';
import { TableSkeleton } from '../component/TableSkeleton';
import { AiFillEdit } from 'react-icons/ai';
import CustomToggle from '../component/CustomToggle';
import WithToaster from '../context/WithToaster';
import { ValidateField } from '../Validation';
import { ApiCall } from '../ApiCall';
import WithSearch from '../context/WithSearch';

class AddUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            fullName: '',
            email: '',
            password: '',
            role: '',
            confirmPassword: '',
            isOpenRoleMenu: false,
            roleID: null,
            roleMenu: [],
            successMessage: '',
            failureMessage: '',
            isPWVisible: false,
            isConfirmPWVisible: false,
            UserDetails: [],
            UserDetailsClone: [],
            row: [
                { id: 1, field: 'fullName', header: 'Name' },
                { id: 2, field: 'email', header: 'Email' },
                { id: 3, field: 'role', header: 'Role' },
                { id: 4, field: 'team', header: 'Team' },
                { id: 5, field: 'isActive', header: 'Status' },
                { id: 6, field: null, header: 'Action' },
            ],
            isLoading: true,
            isUpdate: false,
            UpdateID: null,
            errors: {},
            teamsData: [],
            team: '',
            teamID: null,
            isOpenTeamMenu: false,
            isTeam: false,
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
        this.setState({ roleFilter: data })
        this.fetchUser(data);
        this.fetchRoles();
        this.fetchTeams();
    }
    fetchUser = async (data) => {
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/FetchLeadUser`, 'POST', data);
            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.setState({
                    UserDetails: json.data,
                    UserDetailsClone: json.data,
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
    fetchRoles = async () => {
        try {
            await fetch(`${ApiUrl.url}/CRM/FetchRoles`)
                .then(res => res.json())
                .then(json => {
                    if (json.data) {
                        console.log(json.data)
                        this.setState({
                            roleMenu: json.data,
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
    fetchTeams = async () => {
        try {
            await fetch(`${ApiUrl.url}/CRM/FetchTeams`)
                .then(res => res.json())
                .then(json => {
                    if (json.data) {
                        this.setState({
                            teamsData: json.data,
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
    handleChange = (field, value, compareValue) => {
        this.setState((prevState) => ({
            [field]: value,
            errors: {
                ...prevState.errors,
                [field]: ValidateField(field, value, compareValue)
            }
        }));
    }



    handleRole = (e) => {
        this.setState((prev) => ({ isOpenRoleMenu: !prev.isOpenRoleMenu }))
    }
    handleRoleLeave = () => {
        this.setState({ isOpenRoleMenu: false })
    }
    handleSelectRole = (field, i) => {
        this.setState((prevState) => ({
            isOpenRoleMenu: false, roleID: i.id, role: i.title,
            errors: {
                ...prevState.errors,
                [field]: ""
            },
            isTeam: (i.id !== 1)
        }))
    }
    handleTeam = (e) => {
        this.setState((prev) => ({ isOpenTeamMenu: !prev.isOpenTeamMenu }))
    }
    handleOffTeam = () => {
        this.setState({ isOpenTeamMenu: false })
    }
    handleSelectTeam = (field, i) => {
        this.setState((prevState) => ({
            isOpenTeamMenu: false, teamID: i.id, team: i.team,
            errors: {
                ...prevState.errors,
                [field]: ""
            }
        }))
    }

    handleCreateAccount = () => {
        let { fullName, email, password, confirmPassword, role } = this.state;
        const fields = { fullName, email, password, confirmPassword, role }

        let errors = {};

        Object.keys(fields).forEach(field => {
            const error = ValidateField(field, fields[field]);
            if (error) errors[field] = error;
        });

        this.setState({ errors });
        if (Object.keys(errors).length === 0) {

            let data = {
                id: this.state.isUpdate ? this.state.UpdateID : 0,
                fullName: this.state.fullName,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
                roleID: this.state.roleID,
                role: "",
                teamID: this.state.teamID,
                team: "",
                isActive: true,
                isEmailVerified: false,
                emailVerificationToken: "",
                emailVerificationTokenExpiry: null,
            }
            this.AddUpdateUser(data);
        }
    }
    AddUpdateUser = async (data) => {
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/CreateUser`, 'POST', data);

            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.handleClear();
                this.fetchUser(this.state.roleFilter);
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
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: '',
            team: '',
        })
    }
    handleToggle = async (id, val) => {
        let status = true;
        if (val === 'inactive') {
            status = false;
        }
        let data = {
            id: id,
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            roleID: 0,
            role: "",
            isActive: status,
            isEmailVerified: true,
            emailVerificationToken: "",
            emailVerificationTokenExpiry: null,
        }
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/ActiveDeactiveUser`, 'POST', data);

            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.fetchUser(this.state.roleFilter);
            }
            else {
                this.props.toast.show('F', json.message);
            }

        } catch (e) {
            this.props.toast.show('F', e.message);
        }

    }

    updateUser = async (i) => {
        this.setState({
            isUpdate: true,
            UpdateID: i.id,
            fullName: i.fullName,
            email: i.email,
            password: i.password,
            confirmPassword: i.confirmPassword,
            role: i.role,
            roleID: i.roleID,
            team: i.team,
            teamID: i.teamID,
            isTeam: (i.roleID !== 1)
        })
    }
    render() {
        const { searchValue } = this.props?.search;
        const UserDetails = this.state.UserDetails?.filter(user =>
            user?.fullName?.toLowerCase().includes(searchValue?.toLowerCase() || "") ||
            user?.email?.includes(searchValue || "") ||
            user?.role?.toLowerCase().includes(searchValue?.toLowerCase() || "")
        )
        console.log(this.state.roleMenu, this.state.teamsData)
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                <h2>Add User</h2>
                <div className='report-container'>
                    <div className='report-container' style={{ gap: '7px' }}>
                        <div className='inpt-container' style={{ gap: '7px' }}>
                            <input className='inpt-login' placeholder='Full Name' maxLength={50} onChange={(e) => this.handleChange("fullName", e.target.value)} value={this.state.fullName} />
                            {this.state.errors.fullName && <span className='field-error'>{this.state.errors.fullName}</span>}
                        </div>
                        <div className='inpt-container' style={{ gap: '7px' }}>
                            <input className='inpt-login' placeholder='Work Email' maxLength={75} onChange={(e) => this.handleChange("email", e.target.value)} value={this.state.email} />
                            {this.state.errors.email && <span className='field-error'>{this.state.errors.email}</span>}
                        </div>
                        <div className='inpt-container' >
                            <div style={{ position: 'relative', width: '100%', }}>
                                {this.state.isPWVisible ?
                                    <FaRegEye
                                        onClick={() => this.setState({ isPWVisible: false })}
                                        color={Color.blackFont}
                                        className='eye-icon'
                                    />
                                    :
                                    <FaRegEyeSlash
                                        onClick={() => this.setState({ isPWVisible: true })}
                                        color={Color.grey}
                                        className='eye-icon'
                                    />}

                                <input
                                    type={this.state.isPWVisible ? 'text' : 'password'}
                                    onCopy={(e) => e.preventDefault()}
                                    onPaste={(e) => e.preventDefault()}
                                    onCut={(e) => e.preventDefault()}
                                    onContextMenu={(e) => e.preventDefault()}
                                    className='inpt-login'
                                    placeholder='Password'
                                    maxLength={25}
                                    onChange={(e) => this.handleChange("password", e.target.value)}
                                    value={this.state.password}
                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                />
                            </div>
                            {this.state.errors.password && <span className='field-error'>{this.state.errors.password}</span>}
                        </div>
                        <div className='inpt-container' style={{ gap: '7px', position: 'relative' }}>
                            <div style={{ position: 'relative', width: '100%', }}>
                                {this.state.isConfirmPWVisible ?
                                    <FaRegEye
                                        onClick={() => this.setState({ isConfirmPWVisible: false })}
                                        color={Color.blackFont}
                                        className='eye-icon'
                                    />
                                    :
                                    <FaRegEyeSlash
                                        onClick={() => this.setState({ isConfirmPWVisible: true })}
                                        color={Color.grey}
                                        className='eye-icon'
                                    />}
                                <input
                                    type={this.state.isConfirmPWVisible ? 'text' : 'password'}
                                    onCopy={(e) => e.preventDefault()}
                                    onPaste={(e) => e.preventDefault()}
                                    onCut={(e) => e.preventDefault()}
                                    onContextMenu={(e) => e.preventDefault()}
                                    className='inpt-login'
                                    placeholder='Confirm Password'
                                    maxLength={25}
                                    onChange={(e) => this.handleChange("confirmPassword", e.target.value, this.state.password)}
                                    value={this.state.confirmPassword}
                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                />
                            </div> {this.state.errors.confirmPassword && <span className='field-error'>{this.state.errors.confirmPassword}</span>}
                        </div>
                        <div className='inpt-container' style={{ gap: '7px', position: 'relative', }}>
                            <input className='inpt-login' placeholder='Role' onClick={this.handleRole} value={this.state.role} />
                            {this.state.errors.role && <span className='field-error'>{this.state.errors.role}</span>}
                            {this.state.isOpenRoleMenu &&
                                <div style={{ position: 'absolute', top: '52px', zIndex: 1000, width: '100%', }} onMouseLeave={this.handleRoleLeave}>
                                    <CustomDropdown
                                        option={this.state.roleMenu}
                                        onSelect={(i) => this.handleSelectRole("role", i)}
                                    />
                                </div>
                            }
                        </div>
                        {this.state.isTeam && <div className='inpt-container' style={{ gap: '7px', position: 'relative', }}>
                            <input className='inpt-login' placeholder='Team' onClick={this.handleTeam} value={this.state.team} />
                            {this.state.errors.team && <span className='field-error'>{this.state.errors.team}</span>}
                            {this.state.isOpenTeamMenu &&
                                <div style={{ position: 'absolute', top: '52px', zIndex: 1000, width: '100%', }} onMouseLeave={this.handleOffTeam}>
                                    <CustomDropdown
                                        option={this.state.teamsData}
                                        onSelect={(i) => this.handleSelectTeam("team", i)}
                                        height='auto'
                                    />
                                </div>
                            }
                        </div>}
                    </div>

                    <button onClick={this.handleCreateAccount} className='btn-add-book center' style={{ backgroundColor: Color.crmPrimary, height: '49px' }}>
                        <div >{this.state.isUpdate ? 'Update' : 'Add'}</div>
                    </button>
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
                            {UserDetails?.map(i =>
                                <tr key={i.id}>
                                    {this.state.row?.map(j =>
                                        <td key={j.id} data-label={j.header}>{
                                            j.field
                                                ? (j.field === 'isActive' ?
                                                    <CustomToggle
                                                        status={i[j.field] == 1 ? 'active' : 'inactive'}
                                                        onClick={(v) => this.handleToggle(i.id, v)}
                                                    /> : i[j.field] ? i[j.field] : "-"
                                                )
                                                :
                                                (<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                    <AiFillEdit size={25} color={Color.grey} onClick={() => this.updateUser(i)} />
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

export default WithRouter(WithToaster(WithSearch(AddUser)));
