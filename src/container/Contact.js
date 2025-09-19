import React, { Component, createRef } from 'react'
import { BsLinkedin } from 'react-icons/bs';
import { BsInstagram } from 'react-icons/bs';
import { BsYoutube } from 'react-icons/bs';
import { Color } from '../Colors';
import { Constant } from '../Constant';
import { BiLeftArrow, BiSolidSend } from 'react-icons/bi';
import { BiComment } from 'react-icons/bi';
import { FaChevronRight } from "react-icons/fa";
import { emailValidation, handleOnKeyAlpha } from '../Validation';
import { getFirstLetter, getTime } from '../Common';

export default class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            socialMedia: [
                { id: 1, redirectTo: 'https://www.linkedin.com/in/jessyangeljaw/', icon: <BsLinkedin />, title: `Let's Connect`, link: 'LinkedIn', isHover: false, isSelect: false },
                { id: 2, redirectTo: 'https://www.instagram.com/jessyacoustic/', icon: <BsInstagram />, title: 'Instagram', link: '@jessyAcoustic', isHover: false, isSelect: false },
                { id: 3, redirectTo: 'https://www.youtube.com/@designwithjesse', icon: <BsYoutube />, title: 'Youtube', link: '@jessyscripts', isHover: false, isSelect: false },
            ],
            isProject: false,
            isDesign: false,
            isTech: false,
            fileName: '',
            commentSection: [

            ],
            name: '',
            nameError: '',
            mail: '',
            mailError: '',
            msg: '',
            cmtMsgError: '',
            cmtName: '',
            cmtNameError: '',
            cmtMsg: '',
            msgError: '',
            isSent: false,
            isPosted: false,
            baseUrl: null,
            isMore: false,
        }
        this.fileInputRef = createRef();
    }
    componentDidMount() {
        this.fetchComments();

    }
    fetchComments = async () => {
        let first, photo, time;
        let data = await fetch('https://crm-9r2i.onrender.com/comment/GetComment')
            .then(data => data.json())
            .then(json => {
                return json?.data?.map(i => {
                    if (i?.time) {
                        time = getTime(i?.time)
                    }
                    if (i?.name) {
                        first = getFirstLetter(i?.name);
                    }
                    if (i?.photo && i?.photo !== null) {
                        photo = `data:image/jpeg;base64,${i?.photo}`
                    }
                    return { ...i, firstLetter: first, displayPhoto: photo, commentedTime: time }
                })
            })
        this.setState({
            commentSection: data?.reverse() || []
        })
    }
    handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file)
            reader.onload = () => {
                let base64 = reader.result.split(",")[1];
                this.setState({
                    fileName: file.name,
                    baseUrl: base64
                })
            }
        }
    }

    handleUpload = () => {
        this.fileInputRef?.current.click();
    }
    handleName = (e) => {
        this.setState({
            name: e.target.value,
            nameError: '',
            isSent: false,
        })
    }
    handleMail = (e) => {
        this.setState({
            mail: e.target.value,
            mailError: '',
            isSent: false,
        })
    }
    handleMsg = (e) => {
        this.setState({
            msg: e.target.value,
            msgError: '',
            isSent: false,
        })

    }
    handleCmtMeg = (e) => {
        this.setState({
            cmtMsg: e.target.value,
            cmtMsgError: '',
            isPosted: false,
        })

    }
    handleCmtName = (e) => {
        this.setState({
            cmtName: e.target.value,
            cmtNameError: '',
            isPosted: false,
        })
    }
    handleSend = () => {
        let isValid = false;
        if (this.state.name) {
            this.setState({
                nameError: '',
            })
            isValid = true;
        } else {
            this.setState({
                nameError: 'Kindly enter your name',
            })
        }
        if (this.state.mail) {
            if (emailValidation(this.state.mail)) {
                this.setState({
                    mailError: '',
                })
                isValid = true;
            }
            else {
                this.setState({
                    mailError: 'Kindly enter a valid mail',
                })
            }
        }
        else {
            this.setState({
                mailError: 'Kindly enter mail',
            })
        }
        if (this.state.msg) {
            this.setState({
                msgError: '',
            })
            isValid = true;
        } else {
            this.setState({
                msgError: 'Kindly enter some message',
            })
        }
        if (isValid) {
            this.setState({
                isSent: true,
                name: '',
                mail: '',
                msg: ''
            })
        }
    }
    handlePost = async () => {
        let isValid = false;
        if (this.state.cmtName) {
            this.setState({
                cmtNameError: '',
            })
            isValid = true;
        } else {
            this.setState({
                cmtNameError: 'This field is required',
            })
        }
        if (this.state.cmtMsg) {
            this.setState({
                cmtMsgError: '',
            })
            isValid = true;
        } else {
            this.setState({
                cmtMsgError: 'This field is required',
            })
        }
        if (isValid) {


            let data = {
                Name: this.state.cmtName,
                Message: this.state.cmtMsg,
                Time: new Date(),
                Photo: this.state.baseUrl
            }
            await fetch('https://crm-9r2i.onrender.com/comment/AddComment', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(res => {
                if (res) {
                    res.json()
                }
            }).then(json => {
            })
            this.setState({
                isPosted: true,
                cmtName: '',
                cmtMsg: '',
                fileName: '',
                baseUrl: null,
            })
            this.fetchComments();

        }
    }

    openSocialApps = (link) => {
        window.open(link, '_blank')
    }
    handleReadMore = () => {
        this.setState({
            isMore: true
        })
    }
    handleReadLess = () => {
        this.setState({
            isMore: false
        })
    }
    render() {
        return (
            <div className='col' style={{ gap: '20px' }}>
                <div className='medium-heading center' style={{ color: Color.primaryPurple }}>Contact</div>
                <div className='contact-div' style={{ gap: '25px' }}>

                    <div style={{ flex: 1 }} />
                    <div style={{ flex: 2 }}>
                        <div className='col contact-card ' style={{ gap: '7px', }}>
                            <div className='medium-heading' style={{ color: Color.whiteFont }}>Get in touch</div>
                            <div className='' style={{ fontSize: '12px' }} >{Constant.sendMeMsg}</div>
                            <input style={{ border: this.state.nameError ? '0.7px solid red' : '' }} maxLength={20} onChange={(e) => this.handleName(e)} onKeyDown={(e) => handleOnKeyAlpha(e)} value={this.state.name} className='contact-input' placeholder='Your name' />
                            {this.state.nameError && <span className='span-err'>{this.state.nameError}</span>}
                            <input style={{ border: this.state.mailError ? '0.7px solid red' : '' }} maxLength={75} onChange={(e) => this.handleMail(e)} value={this.state.mail} className='contact-input' placeholder='Your email' />
                            {this.state.mailError && <span className='span-err'>{this.state.mailError}</span>}
                            <textarea style={{ border: this.state.msgError ? '0.7px solid red' : '' }} maxLength={300} onChange={(e) => this.handleMsg(e)} value={this.state.msg} className='contact-input textarea' placeholder='Your message' />
                            {this.state.msgError && <span className='span-err'>{this.state.msgError}</span>}
                            <button onClick={this.handleSend} className='btn-contact center' style={{ gap: '12px', }} >
                                <div><BiSolidSend /></div>
                                <div>{this.state.isSent ? 'Sent' : 'Send message'}</div>
                            </button>
                            <div className='col' style={{ gap: '12px', padding: '12px', borderRadius: '7px', }}>
                                <div className='medium-heading'>Connect with me</div>
                                <div className='col' style={{ gap: '12px', }}>
                                    {this.state.socialMedia?.map(i =>
                                        <div onClick={() => this.openSocialApps(i.redirectTo)} className='row social-link-card' style={{ gap: '12px', }}>
                                            <div>
                                                <div className='center'
                                                    style={{
                                                        height: '40px', width: '40px', borderRadius: '20px', backgroundColor: Color.bgDark,
                                                        fontWeight: 'bold', fontSize: '16px', color: Color.primaryPurple,
                                                    }}>{i.icon}
                                                </div>
                                            </div>
                                            <div>
                                                <div className='small-heading' style={{ fontSize: '12px' }}>{i.title}</div>
                                                <div style={{ fontSize: '12px', color: Color.grey }}>{i.link}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ flex: 4 }}>
                        {this.state.isMore ?
                            <div className='contact-card scroll' style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div onClick={this.handleReadLess}><BiLeftArrow /></div>
                                {this.state.commentSection?.map(i =>
                                    <div className='cmt-card' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div className='row ' style={{ gap: '12px', }}>
                                            <div className='center'
                                                style={{
                                                    height: '40px', width: '40px', borderRadius: '20px', backgroundColor: Color.bgDark,
                                                    fontWeight: 'bold', fontSize: '16px', color: Color.primaryPurple,
                                                }}>
                                                {i?.displayPhoto ?
                                                    <div className='center'
                                                        style={{
                                                            height: '40px', width: '40px', borderRadius: '20px', backgroundColor: Color.bgDark,
                                                            fontWeight: 'bold', fontSize: '16px', color: Color.primaryPurple,
                                                        }}>
                                                        <img src={i?.displayPhoto}
                                                            style={{
                                                                height: '100%',
                                                                width: '100%',
                                                                objectFit: 'cover',
                                                                borderRadius: '70%'
                                                            }}
                                                        />
                                                    </div>
                                                    :
                                                    <div>{i?.firstLetter}</div>}

                                            </div>
                                            <div className='col'>
                                                <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{i.name}</div>
                                                <div style={{ fontSize: '12px', color: Color.grey }}>{i.message}</div>
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '12px', color: Color.grey }}>{i?.commentedTime}</div>
                                    </div>

                                )}
                            </div>
                            : <div className='contact-card col' style={{ gap: '12px' }}>
                                <div className='row' style={{ gap: '10px' }}>
                                    <div className='center'><BiComment color={Color.FlightTheme} /></div>
                                    <div className='small-heading '>Comments</div>
                                </div>
                                <div className='col' style={{ gap: '10px' }}>
                                    <div className='col' style={{ gap: '2px' }}>
                                        <label style={{ fontSize: '12px', color: this.state.cmtNameError ? Color.red : Color.whiteFont }}>Name *</label>
                                        <input style={{ border: this.state.cmtNameError ? '0.7px solid red' : '' }} maxLength={25} value={this.state.cmtName} onChange={(e) => { this.handleCmtName(e) }} onKeyPress={(e) => handleOnKeyAlpha(e)} className='contact-input' placeholder='Enter your name' />
                                        {this.state.cmtNameError && <span className='span-err'>{this.state.cmtNameError}</span>}
                                    </div>
                                    <div className='col' style={{ gap: '2px' }}>
                                        <label style={{ fontSize: '12px', color: this.state.cmtMsgError ? Color.red : Color.whiteFont }}>Message *</label>
                                        <textarea style={{ border: this.state.cmtMsgError ? '0.7px solid red' : '' }} maxLength={75} value={this.state.cmtMsg} onChange={(e) => this.handleCmtMeg(e)} className='contact-input textarea' placeholder='Write your message here...' />
                                        {this.state.cmtMsgError && <span className='span-err'>{this.state.cmtMsgError}</span>}
                                    </div>
                                    <label style={{ fontSize: '12px', }}>Profile photo (optional)</label>
                                    <div className='col cmt-card' style={{ gap: '7px', }}>
                                        <input id='file_Input' accept='.png, .jpg, .jpeg'
                                            type='file' ref={this.fileInputRef} onChange={this.handleFileChange} />

                                        <div className='center'>
                                            <div className='customize-file-upload center'
                                                onClick={this.handleUpload}>{this.state.fileName ? this.state.fileName : 'Choose profile photo'}</div>
                                        </div>
                                        <div className='center' style={{ fontSize: '12px', color: Color.grey }}>Max size only upload : 50MB</div>
                                    </div>
                                    <button className='btn-contact center' onClick={this.handlePost} style={{ gap: '12px', }} >
                                        <div><BiSolidSend /></div>
                                        <div>{this.state.isPosted ? 'Comment posted' : 'Post Comment'}</div>
                                    </button>

                                    {this.state.commentSection?.slice(0, 2).map(i =>
                                        <div className='cmt-card' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div className='row ' style={{ gap: '12px', }}>
                                                <div className='center'
                                                    style={{
                                                        height: '40px', width: '40px', borderRadius: '20px', backgroundColor: Color.bgDark,
                                                        fontWeight: 'bold', fontSize: '16px', color: Color.primaryPurple,
                                                    }}>
                                                    {i?.displayPhoto ?
                                                        <div className='center'
                                                            style={{
                                                                height: '40px', width: '40px', borderRadius: '20px', backgroundColor: Color.bgDark,
                                                                fontWeight: 'bold', fontSize: '16px', color: Color.primaryPurple,
                                                            }}>
                                                            <img src={i?.displayPhoto}
                                                                style={{
                                                                    height: '100%',
                                                                    width: '100%',
                                                                    objectFit: 'cover',
                                                                    borderRadius: '70%'
                                                                }}
                                                            />
                                                        </div>
                                                        :
                                                        <div>{i?.firstLetter}</div>}

                                                </div>
                                                <div className='col'>
                                                    <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{i.name}</div>
                                                    <div style={{ fontSize: '12px', color: Color.grey }}>{i.message}</div>
                                                </div>
                                            </div>
                                            <div style={{ fontSize: '12px', color: Color.grey }}>{i?.commentedTime}</div>
                                        </div>

                                    )}
                                    {this.state.commentSection?.length > 3 && < div className='row' style={{ justifyContent: 'flex-end' }}>
                                        <div onClick={this.handleReadMore} style={{ cursor: 'pointer', fontSize: '12px' }}><FaChevronRight /> </div>
                                    </div>}
                                </div>
                            </div>}
                    </div>
                    <div style={{ flex: 1 }} />
                </div>
            </div >
        )
    }
}
