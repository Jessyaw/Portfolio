import React, { Component } from 'react'
import { FaPlus } from 'react-icons/fa';
import { Color } from '../Colors';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs'

import Profile from '../../src/component/Profile'
import { CgUnavailable } from 'react-icons/cg';
import { FaCheck } from 'react-icons/fa';



export default class LibraryBooks extends Component {
    constructor(props) {
        super(props)
        this.state = {


            bookDetails: [
                {
                    id: 1,
                    title: ' Clean Code',
                    author: 'Robert C.Martin',
                    category: 'Programming',
                    copiesAvailable: 5,
                    availability: 'Available'
                },
                {
                    id: 2,
                    title: 'The Pragmatic Programmer',
                    author: 'Andrew Hunt, David Thomas',
                    category: 'Programming',
                    copiesAvailable: 0,
                    availability: 'Not Available'
                },
                {
                    id: 3,
                    title: 'Introduction to Algorithms',
                    author: 'Thomas H.Cormen',
                    category: 'Computer Science',
                    copiesAvailable: 2,
                    availability: 'Available'
                },
                {
                    id: 4,
                    title: ' Atomic Habits',
                    author: 'James Clear',
                    category: 'Self Help',
                    copiesAvailable: 3,
                    availability: 'Available'
                },
                {
                    id: 5,
                    title: 'The Hobbit',
                    author: 'J.R.R.Tolkien',
                    category: 'Fantasy',
                    copiesAvailable: 1,
                    availability: 'Available'
                },
                {
                    id: 4,
                    title: ' Atomic Habits',
                    author: 'James Clear',
                    category: 'Self Help',
                    copiesAvailable: 3,
                    availability: 'Available'
                },
                {
                    id: 5,
                    title: 'The Hobbit',
                    author: 'J.R.R.Tolkien',
                    category: 'Fantasy',
                    copiesAvailable: 1,
                    availability: 'Available'
                },
            ],
            row: [
                { id: 1, field: 'title', header: 'Title' },
                { id: 2, field: 'author', header: 'Author' },
                { id: 3, field: 'category', header: 'Category' },
                { id: 4, field: 'copiesAvailable', header: 'Copies Available' },
                { id: 5, field: 'availability', header: 'Availability' },
                { id: 6, field: '', header: 'Action' },

            ],
            isAdd: true,

        }
    }
    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                {/* <LibraryDashboard size={25} /> */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                    <div className='medium-heading'>Books</div>
                    <button className='btn-add-book' style={{ backgroundColor: Color.book, }}>
                        <div className='center'><FaPlus size={20} /></div>
                        <div className='center' >Add Book</div>
                    </button>
                </div>
                {this.state.isAdd &&
                    <div style={{ flex: 1, display: 'flex', gap: '12px' }}>
                        <input className='input-booking' placeholder='Title' />
                        <input className='input-booking' placeholder='Author' />
                        <input className='input-booking' placeholder='Category' />
                        <input className='input-booking' placeholder='Number of Copies' />
                        <button className='btn-add-book' style={{ backgroundColor: Color.book, }}>
                            <div className='center'>Save</div>
                        </button>
                    </div>
                }
                <div className='tbl-scroll'>
                    <table style={{ width: '100%' }}>
                        <thead style={{ backgroundColor: Color.book, position: 'sticky', top: 0, zIndex: 1 }}>
                            <tr>
                                {this.state.row?.map(j =>
                                    <th key={j.id} style={{ textAlign: 'center', padding: '16px 5px', borderRadius: '4px', color: Color.whiteFont }}>{j.header}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>

                            {this.state.bookDetails?.map(i =>
                                <tr key={i.id}>
                                    {this.state.row?.map(j =>
                                        <td style={{ padding: '16px 5px', textAlign: 'center', }} key={j.id}>{
                                            j.field
                                                ? i[j.field] == 'Available'
                                                    ? <FaCheck size={25} color={Color.green} />
                                                    : i[j.field] == 'Not Available'
                                                        ? <CgUnavailable size={25} color='#ff3b4b' />
                                                        : i[j.field]
                                                            ? i[j.field]
                                                            : i[j.field]
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
