import React, { Component } from 'react'
import { Color } from '../Colors'
import { Constant } from '../Constant'
import HTML from "../image/svg/HTML.svg"
import CSS from "../image/svg/CSS.svg"
import JS from "../image/svg/JS.svg"
import SQL from "../image/svg/SQL.svg"
import C from "../image/svg/C.svg"
import { DiTechcrunch } from 'react-icons/di';
import { CgIfDesign } from 'react-icons/cg';
import ToDo from '../../src/image/svg/TODO.svg'
import Ticket from '../../src/image/svg/FlightDesign.svg'
import FoodUI from '../../src/image/svg/FoodUI.svg'
import Crm from '../../src/image/svg/CRM.svg'
import { BiLinkExternal } from 'react-icons/bi';
import { BiRightArrow } from 'react-icons/bi';
import { BsCode } from 'react-icons/bs';
import Java from "../image/svg/Java.svg"
import Figma from "../image/svg/Figma.svg"
import Canva from "../image/svg/Canva.svg"
import ReactJS from "../image/svg/React.svg"
import CSharp from "../image/svg/CSharp.svg"
import WithRouter from '../navigate/WithRouter'
import { GrTechnology } from 'react-icons/gr'
import { BiLoader } from 'react-icons/bi'
import oddbods from '../../src/image/svg/Oddbods.svg'
import { CanvaData } from '../CanvaData'
import { DiYii } from 'react-icons/di'
import { FaTools } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";



class Project extends Component {
    constructor(props) {
        super(props)
        this.state = {

            projects: [
                { id: 1, title: 'Project', icon: <BsCode />, des: Constant.proDes, isSelect: true },
                { id: 2, title: 'Designs', icon: <DiYii />, des: Constant.designDes, isSelect: false },
                { id: 3, title: 'Tech Stack', icon: <FaTools />, des: Constant.toolDes, isSelect: false },
            ],
            projectList: [
                { id: 1, redirectTo: '/taskManager', isSelect: false, status: 'Open Link', src: ToDo, title: 'TO DO', icon: <BiLinkExternal />, des: Constant.todoDes, isHighlight: true },
                { id: 2, redirectTo: '/ticketBooking', isSelect: false, status: 'Open Link', src: Ticket, title: 'Flight Ticket Booking', icon: <BiLinkExternal />, des: Constant.ticketDes, isHighlight: false },
                { id: 3, redirectTo: '', isSelect: false, status: 'On Process', src: Crm, title: 'CRM', icon: <BiLoader />, des: Constant.onProcess, isHighlight: false },
            ],
            figma: [
                { id: 1, isHover: false, src: Ticket, design: 'Flight Ticket Booking UI/UX', redirectTo: 'https://www.figma.com/design/cY5bWg8DOoQy3rWjH25hlR/Splash-Oddbods?node-id=33-2&t=R86MeVo3aLXS5xrB-1' },
                // { id: 2, isHover: false, src: Crm, design: 'CRM UI/UX', redirectTo: '//Somelink' },
                { id: 3, isHover: false, src: ToDo, design: 'TODO UI/UX', redirectTo: 'https://www.figma.com/design/Lc4GAtpwcHlf2nJnTFS17o/Food?node-id=46-2&t=zFff5bSnCGb4YmAR-1' },
                { id: 4, isHover: false, src: FoodUI, design: 'Food App UI/UX', redirectTo: 'https://www.figma.com/design/Lc4GAtpwcHlf2nJnTFS17o/Food?node-id=0-1&t=zFff5bSnCGb4YmAR-1' },
                { id: 5, isHover: false, src: oddbods, design: 'Oddbods UI/UX', redirectTo: 'https://www.figma.com/design/cY5bWg8DOoQy3rWjH25hlR/Splash-Oddbods?node-id=55-5&t=bVubicZHGzSyXD0a-1' },

            ],
            canva: CanvaData,
            skills: [
                { id: 1, src: HTML, tech: 'HTML' },
                { id: 2, src: CSS, tech: 'CSS' },
                { id: 3, src: JS, tech: 'JS' },
                { id: 4, src: SQL, tech: 'MS SQL' },
                { id: 5, src: C, tech: 'C' },
                { id: 6, src: CSharp, tech: 'C# Web API' },
                { id: 7, src: ReactJS, tech: 'React JS' },
                { id: 8, src: ReactJS, tech: 'React native' },
                { id: 9, src: Java, tech: 'Java' },
            ],
            tools: [
                { id: 1, src: Figma, tool: 'Figma' },
                { id: 2, src: Canva, tool: 'Canva' },
            ],
            isProject: true,
            isDesign: false,
            isTech: false,
            isCanva: false,
            isFigma: true,
            isTool: false,
            isSkill: true,
        }
    }
    toggleProfile = (i) => {
        let update = this.state.projects?.map(item => {
            return {
                ...item, isSelect: i.id == item.id
            }
        })
        this.setState({
            projects: update
        })

        if (i.id == 1) {
            this.setState({
                isProject: true,
                isDesign: false,
                isTech: false,
            })
        }
        else if (i.id == 2) {
            this.setState({
                isDesign: true,
                isTech: false,
                isProject: false,
            })
        }
        else {
            this.setState({
                isTech: true,
                isProject: false,
                isDesign: false
            })
        }

    }

    openProject = (i) => {
        let todo = [
            {
                project: 'TO DO',
                des: Constant.todoDes,
                tech: [
                    { id: 1, tech: 'ReactJS', isHighlight: false },
                    { id: 2, tech: 'HTML', isHighlight: false },
                    { id: 3, tech: 'CSS', isHighlight: false },
                    { id: 4, tech: 'Javascript', isHighlight: false },
                    { id: 5, tech: 'DexieJs', isHighlight: false },
                ],
                keywords: [
                    { id: 1, key: "Task management with add, edit, and delete options" },
                    { id: 2, key: "Organized tracking of completed vs pending tasks" },
                    { id: 3, key: "Simple and user-friendly interface" },
                    { id: 4, key: "Boosts productivity by managing activities effectively" }
                ],
                src: ToDo,
                status: 'Completed',

            }
        ],
            ticket = [
                {
                    project: 'Flight Ticket Booking',
                    des: Constant.ticketDes,
                    tech: [
                        { id: 1, tech: 'ReactJS', isHighlight: false },
                        { id: 2, tech: 'HTML', isHighlight: false },
                        { id: 3, tech: 'CSS', isHighlight: false },
                        { id: 4, tech: 'Javascript', isHighlight: false },
                        { id: 5, tech: 'NextJs', isHighlight: false },
                        { id: 6, tech: 'SSMS', isHighlight: false },
                    ],
                    keywords: [
                        { id: 1, key: "Flight search and booking functionality" },
                        { id: 2, key: "Ticket reservation and confirmation system" },
                        { id: 3, key: "Manage travel details with easy interface" },
                        { id: 4, key: "Simplifies the process of planning and booking trips" }
                    ],
                    src: Ticket,
                    status: 'Completed',
                }
            ],
            crm = [
                {
                    project: 'CRM',
                    des: Constant.crmDes,
                    tech: [
                        { id: 1, tech: 'ReactJS', isHighlight: false },
                        { id: 2, tech: 'HTML', isHighlight: false },
                        { id: 3, tech: 'CSS', isHighlight: false },
                        { id: 4, tech: 'Javascript', isHighlight: false },
                        { id: 5, tech: 'C# Web API', isHighlight: false },
                        { id: 6, tech: 'SSMS', isHighlight: false },
                    ],
                    keywords: [
                        { id: 1, key: "Client data management with structured records" },
                        { id: 2, key: "Lead tracking and customer interaction history" },
                        { id: 3, key: "Streamlined workflow for business growth" },
                        { id: 4, key: "Improves customer relationships and efficiency" }
                    ],
                    src: Crm,
                    status: 'On Process',
                }
            ]
        if (i.id == 1) {
            this.props.navigate('/projectDetails', { state: { data: todo } });
        }
        else if (i.id == 2) {
            this.props.navigate('/projectDetails', { state: { data: ticket } });
        }
        else {
            this.props.navigate('/projectDetails', { state: { data: crm } });
        }

    }
    handleRedirectToProject = (link) => {
        this.props.navigate(link)
    }
    openFigma = (link) => {
        window.open(link, '_blank')
    }
    openCanva = (link) => {
        window.open(link, '_blank')
    }
    handleShowMore = () => {
        this.props.navigate('/canvaDesigns');
    }

    render() {
        return (
            <div>
                <div className='col' style={{ gap: '16px' }}>
                    <div className='center medium-heading' style={{ color: Color.primaryPurple }}>PortFolio Showcase</div>
                    <div className='project-list-div' style={{ gap: '12px' }}>
                        <div style={{ flex: 1 }} />
                        <div className='project-cards' style={{ flex: 7, gap: '12px' }}>
                            {this.state.projects?.map(i =>
                                <div
                                    onClick={() => this.toggleProfile(i)}
                                    className='col project-card' style={{ background: i?.isSelect && Color.hoverBG, }}>
                                    <div className='center'>{i?.icon}</div>
                                    <div className='center'>{i?.title}</div>
                                    <div className='center' style={{ fontSize: '.7rem' }}>{i?.des}</div>
                                </div>
                            )}
                        </div>
                        <div style={{ flex: 1 }} />
                    </div>
                    {this.state.isProject && <div className='project-list-div' style={{ gap: '12px' }}>
                        <div style={{ flex: 1 }} />
                        <div className='project-cards' style={{ flex: 7, gap: '12px' }}>
                            {this.state.projectList?.map(i =>
                                <div className='col project-list-card' style={{ gap: '12px', }}>
                                    <div className='center'><img src={i.src} width={'100%'} style={{ borderRadius: '4px' }} /></div>
                                    <div>{i.title}</div>
                                    <div className='center' style={{ fontSize: '12px' }}>{i.des}</div>
                                    <div className='row' style={{ justifyContent: 'space-between' }}>
                                        <div className='row link' onClick={() => this.handleRedirectToProject(i.redirectTo)} style={{ gap: '7px', }}>
                                            <div>{i.status}</div>
                                            <div className='center'>{i.icon}</div>
                                        </div>
                                        <div onClick={() => this.openProject(i)} className='row btn-project' style={{ gap: '7px', }}>
                                            <div style={{ fontSize: '12px ', }}>Details</div>
                                            <div className='center'><BiRightArrow size={12} /></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div style={{ flex: 1 }} />
                    </div>}
                    {/* design */}
                    {this.state.isDesign &&
                        <div className='project-list-div' style={{ gap: '12px' }}>
                            <div style={{ flex: 1 }} />
                            <div className='col' style={{ flex: 7, gap: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <div className='btn-toggle'>
                                        <div onClick={() => {
                                            this.setState({
                                                isCanva: false,
                                                isFigma: true
                                            })
                                        }} className='toggle' style={{ background: this.state.isFigma && Color.darkPurple, boxShadow: this.state.isFigma && '1px 1px 16px #8b5cff80', cursor: 'pointer', padding: '5px 12px', borderRadius: '5px' }}>Figma</div>
                                        <div onClick={() => {
                                            this.setState({
                                                isCanva: true,
                                                isFigma: false
                                            })
                                        }} style={{ background: this.state.isCanva && Color.darkPurple, boxShadow: this.state.isCanva && '1px 1px 16px #8b5cff80', cursor: 'pointer', padding: '5px 12px', borderRadius: '5px' }}>Canva</div>
                                    </div>

                                </div>
                                <div className='design-cards' style={{ gap: '12px' }}>

                                    {this.state.isFigma && this.state.figma?.map(i =>
                                        <div className='col project-list-card' style={{ gap: '12px' }}>
                                            <div className='center'><img src={i.src} width={'100%'} style={{ borderRadius: '7px' }} /></div>
                                            <div className='row' style={{ justifyContent: 'space-between' }}>
                                                <div className='row' style={{ gap: '7px', cursor: 'pointer' }}>
                                                    <div>{i.design}</div>
                                                </div>
                                                <div className='row link' onClick={() => this.openFigma(i.redirectTo)} style={{ gap: '7px', cursor: 'pointer' }}>
                                                    <div className='center'><BiLinkExternal /></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {this.state.isCanva && this.state.canva?.slice(0, 4).map(i =>
                                        <div className='col project-list-card' style={{ justifyContent: 'space-between', gap: '12px' }}>
                                            <div className='center' style={{ backgroundColor: Color.whiteFont, padding: '25px', borderRadius: '7px' }}>
                                                <img src={i.src} width={'100%'} style={{ boxShadow: '1px 1px 5px #a59f9fb7' }} />
                                            </div>
                                            <div className='row' style={{ justifyContent: 'flex-end' }}>
                                                <div className=' link' onClick={() => this.openCanva(i.redirectTo)} style={{ gap: '7px', cursor: 'pointer' }}>
                                                    <div className='center'><BiLinkExternal /></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {this.state.isFigma && this.state.figma?.length > 5 && <div style={{ display: 'flex', justifyContent: 'flex-end', color: Color.whiteFont }} onClick={this.handleShowMore}><FaChevronRight /></div>}
                                {this.state.isCanva && this.state.canva?.length > 5 && <div style={{ display: 'flex', justifyContent: 'flex-end', color: Color.whiteFont }} onClick={this.handleShowMore}><FaChevronRight /></div>}

                            </div>
                            <div style={{ flex: 1 }} />
                        </div>}
                    {/* Tech stack */}
                    {this.state.isTech &&
                        <div className='project-list-div' style={{ gap: '12px' }}>
                            <div style={{ flex: 1 }} />
                            <div className='col' style={{ flex: 7, gap: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <div className='btn-toggle'>
                                        <div onClick={() => {
                                            this.setState({
                                                isTool: false,
                                                isSkill: true
                                            })
                                        }} className='toggle' style={{ background: this.state.isSkill && Color.darkPurple, boxShadow: this.state.isSkill && '1px 1px 16px #8b5cff80', cursor: 'pointer', padding: '5px 12px', borderRadius: '5px' }}>Skill</div>
                                        <div onClick={() => {
                                            this.setState({
                                                isTool: true,
                                                isSkill: false
                                            })
                                        }} style={{ backgroundColor: this.state.isTool && Color.darkPurple, boxShadow: this.state.isTool && '1px 1px 16px #8b5cff80', cursor: 'pointer', padding: '5px 12px', borderRadius: '5px' }}>Tool</div>
                                    </div>

                                </div>
                                <div className='center tool-cards' style={{ gap: '12px' }}>
                                    {this.state.isSkill && this.state.skills?.map(i =>
                                        <div className='col project-list-card' style={{}}>
                                            <div className='center'><img src={i.src} width={'90%'} /></div>
                                            <div className='center'>{i.tech}</div>
                                        </div>
                                    )}
                                    {this.state.isTool && this.state.tools?.map(i =>
                                        <div className='col project-list-card' style={{}}>
                                            <div className='center'><img src={i.src} width={'90%'} /></div>
                                            <div className='center'>{i.tool}</div>
                                        </div>
                                    )}
                                </div>

                            </div>
                            <div style={{ flex: 1 }} />
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default WithRouter(Project)
