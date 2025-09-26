import React, { Component } from 'react'
import { FaPlus } from 'react-icons/fa';
import { Color } from '../Colors';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import CustomDropdown from '../component/CustomDropdown';
import { CgUnavailable } from 'react-icons/cg';
import { FaCheck } from 'react-icons/fa';
import { handleOnKeyAlpha, handleOnKeyNumber } from '../Validation';
import { SiTruenas } from 'react-icons/si';



export default class LibraryBooks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bookDetails: [],
            row: [
                { id: 1, field: 'title', header: 'Title' },
                { id: 2, field: 'author', header: 'Author' },
                { id: 3, field: 'category', header: 'Category' },
                { id: 4, field: 'copiesAvailable', header: 'Copies Available' },
                { id: 5, field: 'isAvailable', header: 'Availability' },
                { id: 6, field: '', header: 'Action' },
            ],
            isAdd: false,
            category: [],
            title: null,
            titleError: null,
            author: null,
            authorError: null,
            bookCategory: null,
            bookCategoryError: null,
            quantity: null,
            quantityError: null,
            isOpenCategory: false,
            categoryID: null,
            isUpdate: false,
        }
    }

    componentDidMount() {
        this.fetchBook();
        this.fetchCategory();
    }
    fetchBook = async () => {
        try {
            await fetch('https://localhost:7232/GetBookData').then(res => res.json()).then(json => {
                this.setState({
                    bookDetails: json.data
                })
            })
        } catch (e) {

        }
    }
    fetchCategory = async () => {
        try {
            await fetch('https://localhost:7232/GetCategory').then(res => res.json()).then(json => {
                this.setState({
                    category: json.data
                })
            })
        } catch (e) {

        }
    }

    handleTitle = (e) => {
        this.setState({
            title: e.target.value,
            titleError: '',
        })
    }
    handleAuthor = (e) => {
        this.setState({
            author: e.target.value,
            authorError: '',
        })
    }
    handleCategory = (e) => {
        this.setState({
            isOpenCategory: this.state.isOpenCategory ? false : true,
        })
    }
    handleQuentity = (e) => {
        this.setState({
            quantity: e.target.value,
            quantityError: '',
        })
    }

    handleSelect = (i) => {
        this.setState({
            bookCategory: i.bookCategory,
            categoryID: i.id,
            bookCategoryError: '',
            isOpenCategory: false,
        })
    }

    handleSave = async () => {
        let isValid = false;



        if (this.state.title) {
            this.setState({
                titleError: '',
            })
            isValid = true;
        }
        else {
            this.setState({
                titleError: 'Field should not be empty',
            })
            isValid = false;
        }
        if (this.state.author) {
            this.setState({
                authorError: '',
            })
            isValid = true;
        }
        else {
            this.setState({
                authorError: 'Field should not be empty',
            })
            isValid = false;
        }
        if (this.state.bookCategory) {
            this.setState({
                bookCategoryError: '',
            })
            isValid = true;
        }
        else {
            this.setState({
                bookCategoryError: 'Field should not be empty',
            })
            isValid = false;
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
            let data = {
                title: this.state.title,
                author: this.state.author,
                categoryID: this.state.categoryID,
                copiesAvailable: this.state.quantity,
                isAvailable: true,
            }
            this.addUpdate(data);
        }

    }
    addUpdate = async (data) => {
        try {
            await fetch('https://localhost:7232/AddBook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json()).then(json => {
                console.log(json.message);
            })
            this.setState({
                isAdd: false
            })
            this.fetchBook();
        } catch (e) {

        }
    }
    updateBook = async (i) => {
        this.setState({
            title: i.title,
            author: i.author,
            categoryID: i.categoryID,
            quantity: i.copiesAvailable,
            bookCategory: i.category,
            isAdd: true,
            isUpdate: true
        })
    }
    deleteBook = async (i) => {
        this.setState({
            title: i.title,
            author: i.author,
            categoryID: i.categoryID,
            quantity: i.copiesAvailable,
            bookCategory: i.category,
            isAdd: true
        })

    }
    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                {/* <LibraryDashboard size={25} /> */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                    <div className='medium-heading'>Books</div>
                    {!this.state.isAdd && <button className='btn-add-book'
                        onClick={() => {
                            this.setState({ isAdd: this.state.isAdd ? false : true })
                        }}
                        style={{ backgroundColor: Color.book, }}>
                        <div className='center'><FaPlus size={20} /></div>
                        <div className='center' >Add Book</div>
                    </button>}
                </div>
                {this.state.isAdd &&
                    <div style={{ flex: 1, display: 'flex', gap: '12px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                            <input maxLength={50} value={this.state.title} onChange={this.handleTitle} style={{ border: this.state.titleError ? '1px solid red' : '' }} className='input-booking' placeholder='Title' />
                            {this.state.titleError && <span className='span-err'>{this.state.titleError}</span>}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                            <input maxLength={25} value={this.state.author} onKeyDown={handleOnKeyAlpha} onChange={this.handleAuthor} style={{ border: this.state.authorError ? '1px solid red' : '' }} className='input-booking' placeholder='Author' />
                            {this.state.authorError && <span className='span-err'>{this.state.authorError}</span>}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', position: 'relative' }}>
                            <input value={this.state.bookCategory} onClick={this.handleCategory} style={{ border: this.state.bookCategoryError ? '1px solid red' : '' }} className='input-booking' placeholder='Category' />
                            {this.state.bookCategoryError && <span className='span-err'>{this.state.bookCategoryError}</span>}
                            {this.state.isOpenCategory &&
                                <div style={{ position: 'absolute', top: '52px', zIndex: 1000 }}>
                                    <CustomDropdown
                                        option={this.state.category}
                                        onSelect={(i) => this.handleSelect(i)}
                                    />
                                </div>}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                            <input value={this.state.quantity} onKeyDown={handleOnKeyNumber} onChange={this.handleQuentity} style={{ border: this.state.quantityError ? '1px solid red' : '' }} className='input-booking' placeholder='Number of Copies' />
                            {this.state.quantityError && <span className='span-err'>{this.state.quantityError}</span>}
                        </div>
                        <button className='btn-add-book' onClick={this.handleSave} style={{ backgroundColor: Color.book, height: '49px' }}>
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
                                                ? j.header == 'Availability' ? i[j.field]
                                                    ? <FaCheck size={25} color={Color.green} />
                                                    : <CgUnavailable size={25} color='#ff3b4b' />
                                                    : i[j.field]
                                                        ? i[j.field]
                                                        : i[j.field]
                                                : j.header === 'Action'
                                                && <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                    <AiFillEdit size={25} color={Color.grey} onClick={() => this.updateBook(i)} />
                                                    <AiFillDelete size={25} color='#ff3b4b' onClick={() => this.deleteBook(i)} />
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
