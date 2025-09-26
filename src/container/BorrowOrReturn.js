import React, { Component } from 'react'
import { FaPlus } from 'react-icons/fa';
import { Color } from '../Colors';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs'

import Profile from '../../src/component/Profile'
import { CgUnavailable } from 'react-icons/cg';
import { FaCheck } from 'react-icons/fa';
import { data } from 'react-router-dom';
import CustomDropdown from '../component/CustomDropdown';
import { handleOnKeyNumber } from '../Validation';



export default class BorrowOrReturn extends Component {
    constructor(props) {
        super(props)
        this.state = {


            borrow: [],

            borrowRow: [
                { id: 1, field: 'memberName', header: 'Memeber name' },
                { id: 2, field: 'title', header: 'Title' },
                { id: 3, field: 'bookQuantity', header: 'Quantity' },
                { id: 4, field: 'borrowedDate', header: 'Borrowed Date' },
                { id: 5, field: 'dueDate', header: 'Due date' },
                { id: 6, field: 'bookStatus', header: 'status' },
            ],
            return: [],

            returnRow: [
                { id: 1, field: 'memberName', header: 'Memeber name' },
                { id: 2, field: 'title', header: 'Title' },
                { id: 3, field: 'bookQuantity', header: 'Quantity' },
                { id: 4, field: 'borrowedDate', header: 'Borrowed Date' },
                { id: 5, field: 'dueDate', header: 'Due date' },
                { id: 5, field: 'returnDate', header: 'Return date' },
                { id: 6, field: 'bookStatus', header: 'status' },


            ],
            isAdd: true,
            isBorrow: true,
            isReturn: false,

            userData: [],
            user: null,
            userError: null,
            userID: null,
            books: [],
            book: null,
            bookError: null,
            bookID: null,
            isOpenUserMenu: false,
            isOpenBookMenu: false,
            quantity: null,
            quantityError: null,

        }
    }
    componentDidMount() {
        this.fetchBorrowData();
        this.fetchReturnData();
        this.fetchUser();
        this.fetchBook();
    }
    fetchBook = async () => {
        try {
            await fetch('https://localhost:7232/GetBookData').then(res => res.json()).then(json => {
                this.setState({
                    books: json.data
                })
            })
        } catch (e) {

        }
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
    fetchBorrowData = async () => {
        try {
            await fetch('https://localhost:7232/GetBorrowedData').then(res => res.json()).then(json => {
                this.setState({
                    borrow: json.data
                })
            })
        } catch (e) {

        }
    }
    fetchReturnData = async () => {
        try {
            await fetch('https://localhost:7232/GetReturnData').then(res => res.json()).then(json => {
                this.setState({
                    return: json.data
                })
            })
        } catch (e) {

        }
    }
    handleUsername = () => {
        this.setState({
            isOpenUserMenu: this.state.isOpenUserMenu ? false : true,
            userError: '',

        })
    }
    handleBook = () => {
        this.setState({
            isOpenBookMenu: this.state.isOpenBookMenu ? false : true,
            bookError: '',

        })
    }
    handleQuentity = (e) => {
        this.setState({
            quantity: e.target.value,
            quantityError: '',
        })
    }
    handleSelectUser = (i) => {
        this.setState({
            user: i.memberName,
            userID: i.ID,
            userError: '',
            isOpenUserMenu: false,
        })
    }
    handleSelectBook = (i) => {
        this.setState({
            book: i.title,
            bookID: i.ID,
            bookError: '',
            isOpenBookMenu: false,
        })
    }

    handleSave = async () => {
        let isValid = false;
        if (this.state.user) {
            this.setState({
                userError: '',
            })
            isValid = true;
        }
        else {
            this.setState({
                userError: 'Field should not be empty',
            })
            isValid = false;
        }
        if (this.state.book) {
            this.setState({
                bookError: '',
            })
            isValid = true;
        }
        else {
            this.setState({
                bookError: '',
            })
            isValid = true;
        }
        if (this.state.quantity) {
            if (this.state.quantity <= 1000) {
                this.setState({
                    quantityError: '',
                })
                isValid = true;
            }
            else {
                this.setState({
                    quantityError: 'Reduce the quentity of book',
                })
                isValid = false;
            }
        }
        else {
            this.setState({
                quantityError: 'Field should not be empty',
            })
            isValid = false;
        }
        if (isValid) {
            if (this.state.isBorrow) {
                let data = {
                    userID: this.state.userID,
                    bookID: this.state.bookID,
                    bookQuantity: this.state.quantity,
                    borrowedDate: "2025-09-25",
                    dueDate: "2025-09-25",
                    returnDate: "",
                }
                await fetch('https://localhost:7232/AddUpdateBorrowReturnDetails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/json'
                    },
                    body: JSON.stringify(data)
                }).then(res => res.json()).then(json => {

                })
            }
            else {
                let data = {
                    userID: this.state.userID,
                    bookID: this.state.bookID,
                    bookQuantity: this.state.quantity,
                    borrowedDate: "",
                    dueDate: "2025-09-25",
                    returnDate: "2025-09-25",
                }
                await fetch('https://localhost:7232/AddUpdateBorrowReturnDetails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/json'
                    },
                    body: JSON.stringify(data)
                }).then(res => res.json()).then(json => {

                })
            }
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
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', position: 'relative' }}>
                                <input value={this.state.user} onClick={this.handleUsername} style={{ border: this.state.userError ? '1px solid red' : '' }} className='input-booking' placeholder='Member' />
                                {this.state.userError && <span className='span-err'>{this.state.userError}</span>}
                                {this.state.isOpenUserMenu &&
                                    <div style={{ position: 'absolute', top: '52px', zIndex: 1000 }}>
                                        <CustomDropdown
                                            option={this.state.userData}
                                            onSelect={(i) => this.handleSelectUser(i)}
                                        />
                                    </div>}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', position: 'relative' }}>
                                <input value={this.state.book} onClick={this.handleBook} style={{ border: this.state.bookError ? '1px solid red' : '' }} className='input-booking' placeholder='Book Title' />
                                {this.state.bookError && <span className='span-err'>{this.state.bookError}</span>}
                                {this.state.isOpenBookMenu &&
                                    <div style={{ position: 'absolute', top: '52px', zIndex: 1000 }}>
                                        <CustomDropdown
                                            option={this.state.books}
                                            onSelect={(i) => this.handleSelectBook(i)}
                                        />
                                    </div>}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                                <input value={this.state.quantity} onKeyDown={handleOnKeyNumber} onChange={this.handleQuentity} style={{ border: this.state.quantityError ? '1px solid red' : '' }} className='input-booking' placeholder='Number of Copies' />
                                {this.state.quantityError && <span className='span-err'>{this.state.quantityError}</span>}
                            </div>
                            <button className='btn-add-book' style={{ backgroundColor: Color.borrow }} onClick={this.handleSave}>
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
