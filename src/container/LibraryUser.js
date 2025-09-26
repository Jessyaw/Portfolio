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

        }
    }

    componentDidMount() {
        this.fetchUser();
    }
    fetchUser = async () => {
        try {
            await fetch('https://localhost:7232/GetMemberData').then(res => res.json()).then(json => {
                this.setState({
                    userData: json.data
                })
            })
        } catch (e) {

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
            let response = await fetch('https://localhost:7232/AddBook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            let json = await response.json();
            console.log("API response:", json);

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
            userID: i.ID,
            name: i.memberName,
            email: i.emailID,
        })
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
                {this.state.isAdd &&
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <div style={{ display: 'flex', gap: '7px', flexDirection: 'column' }}>
                            <input value={this.state.name} onChange={this.handleName} style={{ border: this.state.nameError ? '1px solid red' : '' }} className='input-booking' placeholder='Name' />
                            {this.state.nameError && <span className='span-err'>{this.state.nameError}</span>}
                        </div>
                        <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
                            <input value={this.state.email} onChange={this.handleEmail} style={{ border: this.state.emailError ? '1px solid red' : '' }} className='input-booking' placeholder='Email' />
                            {this.state.emailError && <span className='span-err'>{this.state.emailError}</span>}
                        </div>
                        <button className='btn-add-book' onClick={this.handleSave} style={{ backgroundColor: Color.user, height: '49px' }}>
                            <div className='center'>Save</div>
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
                        <tbody>

                            {this.state.userData?.map(i =>
                                <tr key={i.id}>
                                    {this.state.row?.map(j =>
                                        <td style={{ padding: '16px 5px', textAlign: 'center', }} key={j.id}>{
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

                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
