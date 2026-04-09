import React from 'react'
import { FaPlus } from 'react-icons/fa';
import { Color } from '../Colors';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import CustomDropdown from '../component/CustomDropdown';
import { CgUnavailable } from 'react-icons/cg';
import { FaCheck } from 'react-icons/fa';
import { handleOnKeyAlpha, handleOnKeyNumber } from '../Validation';
import DeletePopup from '../component/DeletePopup';
import Toaster from '../component/Toaster';
import { TableSkeleton } from '../component/TableSkeleton';
import { ApiUrl } from '../Api';


export default class LibraryBooks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bookDetails: [],
            bookDetailsClone: [],
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
            isDelete: false,
            itemToBedelete: '',
            deleteID: null,
            successMessage: '',
            failureMessage: '',
            isLoading: true,
        }
    }

    componentDidMount() {
        this.fetchBook();
        this.fetchCategory();
    }
    handleSearch = () => {
        if (this.state.searchValue == '') return;
        let data = this.state.bookDetailsClone?.filter(i =>
            i?.title.toLowerCase().includes(this.state.searchValue)
        )
        this.setState({
            bookDetailsClone: data
        })
    }
    fetchBook = async () => {
        this.setState({ isLoading: true, })
        try {
            await fetch(`${ApiUrl.url}/Library/GetBookData`).then(res => res.json()).then(json => {
                this.setState({
                    bookDetails: json.data,
                    bookDetailsClone: json.data,
                })
            })
        } catch (e) {

        }
        finally {
            this.setState({ isLoading: false, })
        }
    }
    fetchCategory = async () => {
        try {
            await fetch(`${ApiUrl.url}/Library/GetCategory`).then(res => res.json()).then(json => {
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
            this.setState({ isLoading: true, })
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
            await fetch(`${ApiUrl.url}/Library/AddBook`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json()).then(json => {
                if (json.status == 'S') {
                    this.setState({
                        successMessage: json.message
                    })
                }
                else {
                    this.setState({
                        failureMessage: json.message
                    })
                }
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
    deleteTask = async (i) => {

        let deleteID = {
            id: this.state.deleteID
        }
        try {
            await fetch(`${ApiUrl.url}/Library/DeleteBook`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(deleteID)
            }).then(res => res.json()).then(json => {

                if (json.status == 'S') {
                    this.setState({
                        successMessage: json.message
                    })
                    setTimeout(() => this.setState({ successMessage: '' }), 3000);
                }
                else {
                    this.setState({
                        failureMessage: json.message
                    })
                    setTimeout(() => this.setState({ failureMessage: '' }), 3000);
                }

                this.setState({
                    isDelete: false,
                })
                this.fetchBook();
            })
        } catch (e) {

        }
    }
    render() {

        const bookDetails = this.state.bookDetails?.filter(book =>
            book?.title.toLowerCase().includes(this.props.search) ||
            book?.author.toLowerCase().includes(this.props.search) ||
            book?.category.toLowerCase().includes(this.props.search)
        )
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
                {(this.state.successMessage && this.state.successMessage !== '') ||
                    (this.state.failureMessage && this.state.failureMessage !== '') ? (
                    <div style={{ display: 'flex', position: 'fixed', bottom: 0, right: 0 }}>
                        <Toaster
                            fail={this.state.failureMessage}
                            success={this.state.successMessage}
                        />
                    </div>
                ) : null}

                {this.state.isDelete && <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', zIndex: 100 }}>
                    <DeletePopup
                        onClose={this.closeMenu}
                        item={this.state.itemToBedelete}
                        onDelete={(v, id) => { this.deleteTask(v, id) }}
                        ID={this.state.deleteID}
                        message={'Do you want delete this Book?'}
                    />
                </div>}
                {this.state.isAdd &&
                    <div className='input-container'>
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
                        <button className='btn-add-book center' onClick={this.handleSave} style={{ backgroundColor: Color.book, height: '49px' }}>
                            <div>Save</div>
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
                        {this.state.isLoading ? (<TableSkeleton rows={5} cols={this.state.row?.length} />) : (<tbody>

                            {bookDetails?.map(i =>
                                <tr key={i.id}>
                                    {this.state.row?.map(j =>
                                        <td key={j.id} data-label={j.header}>{
                                            j.field
                                                ? j.header == 'Availability' ? i[j.field]
                                                    ? <FaCheck size={25} color={Color.green} />
                                                    : <CgUnavailable size={25} color={Color.red} />
                                                    : i[j.field]
                                                        ? i[j.field]
                                                        : i[j.field]
                                                : j.header === 'Action'
                                                && <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                    <AiFillEdit size={25} color={Color.grey} onClick={() => this.updateBook(i)} />
                                                    <AiFillDelete size={25} color={Color.red} onClick={() => this.deleteBook(i)} />
                                                </div>



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
