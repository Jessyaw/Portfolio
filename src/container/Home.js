import React, { Component } from 'react'
import { Color } from '../Colors'
import { Constant } from '../Constant'
import dev from '../../src/image/svg/Developer.svg'
import { ImFolderOpen } from 'react-icons/im';
import { AiFillContacts } from 'react-icons/ai';
import { FiInstagram } from 'react-icons/fi';
import { FiLinkedin } from 'react-icons/fi';
import { FiYoutube } from 'react-icons/fi';
import animation from '../../src/image/web/Coding.webm'
import Lottie from 'lottie-react';
import animationData from '../../src/image/json/Coding.json'
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuList: [
                { id: 1, list: 'Home', isHighlight: false },
                { id: 2, list: 'Profile', isHighlight: false },
                { id: 3, list: 'Projects', isHighlight: false },
                { id: 4, list: 'Contact', isHighlight: false },
            ],
            tech: [
                { id: 1, tech: 'ReactJS', isHighlight: false },
                { id: 2, tech: 'HTML', isHighlight: false },
                { id: 3, tech: 'NextJS', isHighlight: false },
                { id: 4, tech: 'Javascript', isHighlight: false },
            ],
            apps: [
                { id: 1, link: 'https://www.instagram.com/jessyacoustic/', icons: <FiInstagram />, isHighlight: false },
                { id: 2, link: 'https://www.linkedin.com/in/jessyangeljaw/', icons: <FiLinkedin />, isHighlight: false },
                { id: 3, link: 'https://www.youtube.com/@designwithjesse', icons: <FiYoutube />, isHighlight: false },
            ],
        }
    }

    openSocialApps = (link) => {

        window.open(link, '_blank')

    }

    render() {
        return (
            <div style={{ margin: '70px 0px 0px 0px' }}> {/* Home */}
                <div className='home-div'>
                    <div style={{ flex: 1 }} />
                    <div className='col' style={{ gap: '25px ', flex: 3 }}>
                        <div>
                            <div className='heading' style={{ color: Color.whiteFont }}>{Constant.fullstack}</div>
                            <div className='heading' style={{ color: Color.primaryPurple }}>{Constant.developer}</div>
                        </div>
                        <div style={{ color: Color.textSecondary }}>{Constant.des}</div>
                        <div style={{ display: 'flex', gap: '12px', }}>
                            {this.state.tech?.map(i =>
                                <div className='tag-tech' style={{}}>{i.tech}</div>
                            )}
                        </div>
                        <div className='row' style={{ gap: '16px' }}>
                            <button className='row btn-home' style={{ gap: '16px' }} onClick={this.props.onSelectProject}>
                                <div>projects</div>
                                <div><ImFolderOpen /></div>
                            </button>
                            <button className='row btn-home' style={{ gap: '16px' }} onClick={this.props.onSelectContact}>
                                <div>Contacts</div>
                                <div><AiFillContacts /></div>
                            </button>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', }}>
                            {this.state.apps?.map(i =>
                                <div onClick={() => this.openSocialApps(i.link)} className='social-tag'>{i.icons}</div>
                            )}
                        </div>
                    </div>
                    <div style={{ flex: 3 }}>
                        {/* Animation */}
                        <Lottie animationData={animationData} />
                    </div>
                    <div style={{ flex: 1 }} />
                </div>
            </div>
        )
    }
}
