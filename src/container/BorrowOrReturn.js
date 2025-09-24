import React, { Component } from 'react'
import { FaPlus } from 'react-icons/fa';
import { Color } from '../Colors';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs'

import Profile from '../../src/component/Profile'
import { CgUnavailable } from 'react-icons/cg';
import { FaCheck } from 'react-icons/fa';



export default class BorrowOrReturn extends Component {
    constructor(props) {
        super(props)
        this.state = {


            borrow: [
                { id: 1, title: 'Dove', borrowedDate: '24-Sep-2025', dueDate: '24-Sep-2025', quantity: 1, status: 'Borrowed', memeberName: "Rahul Sharma", },
                { id: 2, title: 'Dove', borrowedDate: '24-Sep-2025', dueDate: '24-Sep-2025', quantity: 1, status: 'Borrowed', memeberName: "Priya Nair", },
                { id: 3, title: 'Dove', borrowedDate: '24-Sep-2025', dueDate: '24-Sep-2025', quantity: 1, status: 'Borrowed', memeberName: "Amit Verma", },
                { id: 4, title: 'Dove', borrowedDate: '24-Sep-2025', dueDate: '24-Sep-2025', quantity: 1, status: 'Borrowed', memeberName: "Sneha Gupta", },
                { id: 5, title: 'Dove', borrowedDate: '24-Sep-2025', dueDate: '24-Sep-2025', quantity: 1, status: 'Borrowed', memeberName: "Karthik R", },
                { id: 6, title: 'Dove', borrowedDate: '24-Sep-2025', dueDate: '24-Sep-2025', quantity: 1, status: 'Borrowed', memeberName: "Ananya Singh", },
            ],

            borrowRow: [
                { id: 1, field: 'memeberName', header: 'Memeber name' },
                { id: 2, field: 'title', header: 'Title' },
                { id: 3, field: 'quantity', header: 'Quantity' },
                { id: 4, field: 'borrowedDate', header: 'Borrowed Date' },
                { id: 5, field: 'dueDate', header: 'Due date' },
                { id: 6, field: 'status', header: 'status' },
            ],
            return: [
                { id: 1, title: 'Dove', borrowedDate: '24-Sep-2025', returnDate: '24-Sep-2025', dueDate: '24-Sep-2025', quantity: 1, status: 'Borrowed', memeberName: "Rahul Sharma", },
                { id: 2, title: 'Dove', borrowedDate: '24-Sep-2025', returnDate: '24-Sep-2025', dueDate: '24-Sep-2025', quantity: 1, status: 'Borrowed', memeberName: "Priya Nair", },
                { id: 3, title: 'Dove', borrowedDate: '24-Sep-2025', returnDate: '24-Sep-2025', dueDate: '24-Sep-2025', quantity: 1, status: 'Borrowed', memeberName: "Amit Verma", },
                { id: 4, title: 'Dove', borrowedDate: '24-Sep-2025', returnDate: '24-Sep-2025', dueDate: '24-Sep-2025', quantity: 1, status: 'Borrowed', memeberName: "Sneha Gupta", },
                { id: 5, title: 'Dove', borrowedDate: '24-Sep-2025', returnDate: '24-Sep-2025', dueDate: '24-Sep-2025', quantity: 1, status: 'Borrowed', memeberName: "Karthik R", },
                { id: 6, title: 'Dove', borrowedDate: '24-Sep-2025', returnDate: '24-Sep-2025', dueDate: '24-Sep-2025', quantity: 1, status: 'Borrowed', memeberName: "Ananya Singh", },
            ],

            returnRow: [
                { id: 1, field: 'memeberName', header: 'Memeber name' },
                { id: 2, field: 'title', header: 'Title' },
                { id: 3, field: 'quantity', header: 'Quantity' },
                { id: 4, field: 'borrowedDate', header: 'Borrowed Date' },
                { id: 5, field: 'dueDate', header: 'Due date' },
                { id: 5, field: 'returnDate', header: 'Return date' },
                { id: 6, field: 'status', header: 'status' },


            ],
            isAdd: true,
            isBorrow: true,
            isReturn: false,

        }
    }
    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', }}>
                {/* <LibraryDashboard size={25} /> */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                    <div className='medium-heading'>{this.state.isBorrow ? 'Borrow' : 'Return'}</div>
                    <div>
                        <div className='btn-toggle-lib'>
                            <div onClick={() => {
                                this.setState({
                                    isReturn: false,
                                    isBorrow: true
                                })
                            }} style={{ backgroundColor: this.state.isBorrow && Color.borrow, color: this.state.isBorrow && Color.whiteFont, boxShadow: this.state.isBorrow && '1px 2px 10px #c4c1a47e', cursor: 'pointer', padding: '5px 12px', borderRadius: '5px' }}>Borrow</div>
                            <div onClick={() => {
                                this.setState({
                                    isReturn: true,
                                    isBorrow: false
                                })
                            }} style={{ backgroundColor: this.state.isReturn && Color.borrow, color: this.state.isReturn && Color.whiteFont, boxShadow: this.state.isReturn && '1px 2px 10px #c4c1a47e', cursor: 'pointer', padding: '5px 12px', borderRadius: '5px' }}>Return</div>
                        </div>
                    </div>
                </div>
                {this.state.isAdd &&
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <input className='input-booking' placeholder='Name' />
                            <input className='input-booking' placeholder='Book Title' />
                            <input className='input-booking' placeholder='Quentity' />
                            <button className='btn-add-book' style={{ backgroundColor: Color.borrow }}>
                                <div className='center' >{this.state.isBorrow ? 'Borrow' : 'Return'}</div>
                            </button>
                        </div>


                    </div>
                }
                <div className='tbl-scroll'>
                    {this.state.isBorrow ? <table style={{ width: '100%' }}>
                        <thead style={{ backgroundColor: Color.borrow, position: 'sticky', top: 0, zIndex: 1 }}>
                            <tr>
                                {this.state.borrowRow?.map(j =>
                                    <th key={j.id} style={{ textAlign: 'center', padding: '16px 5px', borderRadius: '4px', color: Color.whiteFont }}>{j.header}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.borrow?.map(i =>
                                <tr key={i.id}>
                                    {this.state.borrowRow?.map(j =>
                                        <td style={{ padding: '16px 5px', textAlign: 'center', }} key={j.id}>{
                                            i[j.field]
                                        }</td>
                                    )}
                                </tr>
                            )}
                        </tbody>
                    </table> :
                        <table style={{ width: '100%' }}>
                            <thead style={{ backgroundColor: Color.borrow, position: 'sticky', top: 0, zIndex: 1 }}>
                                <tr>
                                    {this.state.returnRow?.map(j =>
                                        <th key={j.id} style={{ textAlign: 'center', padding: '16px 5px', borderRadius: '4px', color: Color.whiteFont }}>{j.header}</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.return?.map(i =>
                                    <tr key={i.id}>
                                        {this.state.returnRow?.map(j =>
                                            <td style={{ padding: '16px 5px', textAlign: 'center', }} key={j.id}>{
                                                i[j.field]
                                            }</td>
                                        )}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        )
    }
}
