import React, { Component } from 'react'
import { FaPlus } from 'react-icons/fa';
import { Color } from '../Colors';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs'
import Profile from '../../src/component/Profile'
import { CgUnavailable } from 'react-icons/cg';
import { FaCheck } from 'react-icons/fa';
import { emailValidation, userNameValidation } from '../Validation';
import DeletePopup from '../component/DeletePopup'
import Toaster from '../component/Toaster';
import { TableSkeleton } from '../component/TableSkeleton';



export default class LibraryUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: [],
            row: [
                { id: 1, field: 'memberName', header: 'Name' },
                { id: 2, field: 'emailID', header: 'Email' },
                { id: 3, field: 'booksCount', header: 'Borrowed Books' },
                { id: 4, field: '', header: 'Action' },
            ],
            isAdd: false,
            name: '',
            nameError: '',
            email: '',
            emailError: '',
            isUpdate: false,
            userID: 0,
            isDelete: false,
            itemToBedelete: '',
            deleteID: null,
            failStatus: null,
            successStatus: null,
            isLoading: true,
        }
    }

    componentDidMount() {
        this.fetchUser();
    }
    fetchUser = async () => {
        this.setState({ isLoading: true })
        try {
            await fetch('https://localhost:7232/GetMemberData').then(res => res.json()).then(json => {
                this.setState({
                    userData: json.data || []
                })
            })
        } catch (e) {

        } finally {
            this.setState({ isLoading: false })
        }
    }
    handleName = (e) => {
        this.setState({
            name: e.target.value,
            nameError: '',
        })
    }
    handleEmail = (e) => {
        this.setState({
            email: e.target.value,
            emailError: '',
        })
    }
    handleSave = () => {
        let isValid = false;
        if (this.state.name) {
            if (userNameValidation(this.state.name)) {
                this.setState({
                    nameError: '',
                })
                isValid = true;
            }
            else {
                this.setState({
                    nameError: 'Username is not valid',
                })
                isValid = false;
            }
        }
        else {
            this.setState({
                nameError: 'Field should not be empty',
            })
            isValid = false;
        }
        if (this.state.email) {
            if (emailValidation(this.state.email)) {
                this.setState({
                    emailError: '',
                })
                isValid = true;
            }
            else {
                this.setState({
                    emailError: 'Kindly enter a valid mail',
                })
                isValid = false;
            }
        }
        else {
            this.setState({
                emailError: 'Field should not be empty',
            })
            isValid = false;
        }
        if (isValid) {
            this.setState({ isLoading: true })
            let data = {
                ID: this.state.userID,
                Membername: this.state.name,
                EmailID: this.state.email
            }
            this.addUpdate(data)
        }
    }
    addUpdate = async (data) => {
        try {
            let response = await fetch('https://localhost:7232/AddMember', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            let json = await response.json();
            console.log("API response:", json, data);

            this.setState({
                apiResponse: json,
                isAdd: false
            });

            this.fetchUser();
        } catch (e) {
            console.error("Error:", e);
        }
    }

    updateUser = (i) => {
        console.log(i)
        this.setState({
            isAdd: true,
            isUpdate: true,
            userID: i.id,
            name: i.memberName,
            email: i.emailID,
        })
    }
    deleteUser = (i) => {
        this.setState({
            isDelete: true,
            itemToBedelete: i.memberName,
            name: i.memberName,
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
    deleteTask = async (i) => {
        let deleteID = {
            MemberName: this.state.name
        }
        try {
            await fetch('https://localhost:7232/DeleteUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(deleteID)
            }).then(res => res.json()).then(json => {
                this.setState({
                    isDelete: false,
                    itemToBedelete: '',
                    deleteID: '',
                })
                if (json?.status == 'S') {
                    this.setState({
                        successStatus: json?.message
                    })
                    setTimeout(() => this.setState({ successStatus: '' }), 3000);
                }
                else {
                    this.setState({
                        failStatus: json?.message
                    })
                    setTimeout(() => this.setState({ failStatus: '' }), 3000);

                }
                this.fetchUser();
            })
        } catch (e) {

        }
    }
    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', }}>
                {/* <LibraryDashboard size={25} /> */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                    <div className='medium-heading'>Users</div>
                    {!this.state.isAdd && <button className='btn-add-book'
                        onClick={() => {
                            this.setState({ isAdd: this.state.isAdd ? false : true })
                        }}
                        style={{ backgroundColor: Color.user, }}
                    >
                        <div className='center'><FaPlus size={20} /></div>
                        <div className='center'>Add User</div>
                    </button>}
                </div>
                {(this.state.successStatus && this.state.successStatus != '') || (this.state.failStatus && this.state.failStatus != '') ?
                    (< div style={{ display: 'flex', position: 'fixed', bottom: 0, right: 0 }}>
                        <Toaster
                            fail={this.state.failStatus}
                            success={this.state.successStatus}
                        /></div>)
                    : null}
                {
                    this.state.isDelete && <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', zIndex: 100 }}>
                        <DeletePopup
                            onClose={this.closeMenu}
                            item={this.state.itemToBedelete}
                            onDelete={(v, id) => { this.deleteTask(v, id) }}
                            ID={this.state.deleteID}
                            message={'Do you want delete this User?'}
                        />
                    </div>
                }

                {
                    this.state.isAdd &&
                    <div className='input-container'>
                        <div style={{ display: 'flex', gap: '7px', flexDirection: 'column' }}>
                            <input value={this.state.name} onChange={this.handleName} style={{ border: this.state.nameError ? '1px solid red' : '' }} className='input-booking' placeholder='Name' />
                            {this.state.nameError && <span className='span-err'>{this.state.nameError}</span>}
                        </div>
                        <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
                            <input value={this.state.email} onChange={this.handleEmail} style={{ border: this.state.emailError ? '1px solid red' : '' }} className='input-booking' placeholder='Email' />
                            {this.state.emailError && <span className='span-err'>{this.state.emailError}</span>}
                        </div>
                        <button className='btn-add-book center' onClick={this.handleSave} style={{ backgroundColor: Color.user, height: '49px' }}>
                            <div>Save</div>
                        </button>
                    </div>
                }
                <div className='tbl-scroll'>
                    <table style={{ width: '100%' }}>
                        <thead style={{ backgroundColor: Color.user, position: 'sticky', top: 0, zIndex: 1 }}>
                            <tr>
                                {this.state.row?.map(j =>
                                    <th key={j.id} style={{ textAlign: 'center', padding: '16px 5px', borderRadius: '4px', color: Color.whiteFont }}>{j.header}</th>
                                )}
                            </tr>
                        </thead>
                        {this.state.isLoading ? (<TableSkeleton rows={5} cols={this.state.row?.length} />) :
                            (<tbody>
                                {this.state.userData?.map(i =>
                                    <tr key={i.id}>
                                        {this.state.row?.map(j =>
                                            <td data-label={j.header} key={j.id}>{
                                                j.field
                                                    ? i[j.field]
                                                    : j.header === 'Action'
                                                    && <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                        <AiFillEdit size={25} color={Color.grey} onClick={() => this.updateUser(i)} />
                                                        <AiFillDelete size={25} color='#ff3b4b' onClick={() => this.deleteUser(i)} />
                                                    </div>
                                            }</td>
                                        )}
                                    </tr>
                                )}

                            </tbody>)}
                    </table>
                </div>
            </div >
        )
    }
}
