import React, { Component } from 'react'
import { Color } from '../Colors'
import dev from '../../src/image/svg/Developer.svg'
import { Constant } from '../Constant';
import { GoDownload } from 'react-icons/go';
import { SiFreelancer } from "react-icons/si";
import { BsCode } from 'react-icons/bs';
import { DiOpenshift } from 'react-icons/di';
import { FaFigma } from "react-icons/fa";
import resume from '../../src/pdf/JessyAngelW_Resume.pdf'



export default class About extends Component {
    constructor(props) {
        super(props)
        this.state = {
            aboutCard: [
                { id: 1, count: 4, title: 'UI/UX Designner', titleIcon: <FaFigma />, des: 'Creative designs for you Creative designs for you', icon: <DiOpenshift />, isHighlight: false },
                { id: 2, count: 3, title: 'Web developer', titleIcon: <BsCode />, des: 'Creative websites for you', icon: <DiOpenshift />, isHighlight: false },
                { id: 3, count: 0, title: 'Freelancer', titleIcon: <SiFreelancer />, des: 'You can hire me', icon: <DiOpenshift />, isHighlight: false },
            ],

        }
    }

    render() {
        return (
            <div>
                <div >
                    <div className='medium-heading center' style={{ color: Color.primaryPurple }}>About Me</div>
                    <div className='about-div'>
                        <div style={{ flex: 1 }} />
                        <div className='col' style={{ flex: 3, gap: '25px' }}>
                            <div>
                                <div className='medium-heading' style={{ color: Color.whiteFont }}>{Constant.hey}</div>
                                <div className='medium-heading' style={{ color: Color.primaryPurple }}>{Constant.jess}</div>
                            </div>
                            <div style={{ color: Color.textSecondary }}>{Constant.profile}</div>
                            <div>
                                <a href={resume} download='JessyAngelW_Resume' style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <button className='row btn-home' style={{ gap: '16px' }}>
                                        <div>{Constant.dCV}</div>
                                        <div className='center'><GoDownload /></div>
                                    </button>
                                </a>
                            </div>
                        </div>
                        <div style={{ flex: 3 }}>
                            <img src={dev} />
                        </div>
                        <div style={{ flex: 1, }} />
                    </div>
                    <div style={{ display: 'flex', }}>
                        <div style={{ flex: 1 }} />
                        <div className='about-card-div' style={{ flex: 6, gap: '12px' }}>
                            {this.state.aboutCard?.map(i =>
                                <div className='about-card col' style={{ gap: '5px ', }}>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div className='center' style={{ color: Color.whiteFont, backgroundColor: Color.bgDark, height: '40px', width: '40px', borderRadius: '20px' }}>
                                            {i.titleIcon}
                                        </div>
                                        <div style={{ color: Color.whiteFont }}>{i.count}</div>
                                    </div>
                                    <div style={{ color: Color.whiteFont }}>{i.title}</div>
                                    <div style={{ fontSize: '.8rem', color: Color.whiteFont }}>{i.des}</div>
                                </div>
                            )}
                        </div>
                        <div style={{ flex: 1 }} />
                    </div>
                </div>
            </div>
        )
    }
}
