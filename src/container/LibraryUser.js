import React, { Component } from 'react'
import { FaPlus } from 'react-icons/fa';
import { Color } from '../Colors';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs'

import Profile from '../../src/component/Profile'
import { CgUnavailable } from 'react-icons/cg';
import { FaCheck } from 'react-icons/fa';



export default class LibraryUser extends Component {
    constructor(props) {
        super(props)
        this.state = {


            userData: [
                { id: 1, name: "Rahul Sharma", email: "rahul.sharma@example.com", borrowedBooks: 3 },
                { id: 2, name: "Priya Nair", email: "priya.nair@example.com", borrowedBooks: 1 },
                { id: 3, name: "Amit Verma", email: "amit.verma@example.com", borrowedBooks: 0 },
                { id: 4, name: "Sneha Gupta", email: "sneha.gupta@example.com", borrowedBooks: 2 },
                { id: 5, name: "Karthik R", email: "karthik.r@example.com", borrowedBooks: 4 },
                { id: 6, name: "Ananya Singh", email: "ananya.singh@example.com", borrowedBooks: 1 },
            ],

            row: [
                { id: 1, field: 'name', header: 'Name' },
                { id: 2, field: 'email', header: 'Email' },
                { id: 3, field: 'borrowedBooks', header: 'Borrowed Books' },
                { id: 4, field: '', header: 'Action' },

            ],
            isAdd: true,

        }
    }
    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', }}>
                {/* <LibraryDashboard size={25} /> */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                    <div className='medium-heading'>Users</div>
                    <button className='btn-add-book'>
                        <div className='center'><FaPlus size={20} /></div>
                        <div className='center'>Add User</div>
                    </button>
                </div>
                {this.state.isAdd &&
                    <div style={{ flex: 1, display: 'flex', gap: '12px' }}>
                        <input style={{ backgroundColor: '#992bff55' }} className='input-booking' placeholder='Name' />
                        <input style={{ backgroundColor: '#992bff55' }} className='input-booking' placeholder='Email' />
                        <button className='btn-add-book'>
                            <div className='center'>Save</div>
                        </button>
                    </div>
                }
                <div className='tbl-scroll'>
                    <table style={{ width: '100%' }}>
                        <thead style={{ backgroundColor: Color.user, position: 'sticky', top: 0, zIndex: 1 }}>
                            <tr>
                                {this.state.row?.map(j =>
                                    <th key={j.id} style={{ textAlign: 'center', padding: '16px 5px', borderRadius: '4px' }}>{j.header}</th>
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
                                                    <AiFillEdit size={25} color={Color.grey} />
                                                    <AiFillDelete size={25} color='#ff3b4b' />
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
