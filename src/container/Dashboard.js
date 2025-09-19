import React, { Component } from 'react'
import WithRouter from '../navigate/WithRouter'
import REactJS from "../image/png/react.png"
import Native from "../image/png/react.png"
import Dev from "../image/jpg/Dev.jpeg"
import CanvaDesigns from './CanvaDesigns'
import { Color } from '../Colors'
import NavHeader from '../component/NavHeader'
import { db, removeDB } from '../dexie/DB'
import { Constant } from '../Constant'
import Todo from "../image/png/ToDo.png"
import { ReactComponent as Train } from "../image/svg/FlightDesign.svg"
import { ReactComponent as Developer } from "../image/svg/Developer.svg"
import { ReactComponent as CRM } from "../image/svg/CRM.svg"
import { ReactComponent as TODO } from "../image/svg/TODO.svg"
import { ReactComponent as HTML } from "../image/svg/HTML.svg"
import { ReactComponent as CSS } from "../image/svg/CSS.svg"
import { ReactComponent as JS } from "../image/svg/JS.svg"
import { ReactComponent as SQL } from "../image/svg/SQL.svg"
import { ReactComponent as C } from "../image/svg/C.svg"
import { ReactComponent as Java } from "../image/svg/Java.svg"
import { ReactComponent as Figma } from "../image/svg/Figma.svg"
import { ReactComponent as Canva } from "../image/svg/Canva.svg"
import { ReactComponent as ReactJS } from "../image/svg/React.svg"
import { ReactComponent as CSharp } from "../image/svg/CSharp.svg"
import FigmaDesigns from './FigmaDesigns'
import { generateRandomKey } from '../../src/dexie/EncodeDecode';




class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [
                { id: 1, component: TODO, path: '/taskManager', src: Todo, name: 'To Do', isHover: false },
                { id: 2, component: Train, path: '/ticketbooking', src: '', name: 'Ticket Booking', isHover: false },
                { id: 3, component: CRM, path: '/crm', src: Todo, name: 'CRM', isHover: false },
            ],

            dot: [
                { id: 1, isHighlight: false },
                { id: 2, isHighlight: false },
                { id: 3, isHighlight: false }
            ],
            experience: [
                { id: 1, year: 'May 2023 - Oct 2023', place: 'Tirunelveli', role: 'Full-stack trainee', isHighlight: false },
                { id: 2, year: 'Sep 2023 - Jan 2024', place: 'Tirunelveli', role: 'Mobile app developer', isHighlight: false },
                { id: 3, year: 'Feb 2023 - Jun 2024', place: 'Tirunelveli', role: 'web developer', isHighlight: false },
            ],
            education: [
                { id: 1, year: '2019 - 2023', place: 'Tirunelveli', role: `Bachelor's in Engineering`, isHighlight: false },
                { id: 2, year: '2018 - 2019', place: 'Tirunelveli', role: 'HSE', isHighlight: false },
                { id: 3, year: '2016 - 2017', place: 'Tirunelveli', role: 'SSLC', isHighlight: false },
            ],
            isMenuOpen: true,
            menuList: [
                { id: 1, list: 'list 1', isHighlight: false },
                { id: 2, list: 'list 2', isHighlight: false },
                { id: 3, list: 'list 3', isHighlight: false },
                { id: 4, list: 'list 4 ', isHighlight: false },
                { id: 5, list: 'list 5 ', isHighlight: false },
                { id: 6, list: 'list 6 ', isHighlight: false },
                { id: 7, list: 'list 7 ', isHighlight: false },

            ],
            skills: [
                { id: 1, component: HTML, icon: '', tech: 'HTML' },
                { id: 2, component: CSS, icon: '', tech: 'CSS' },
                { id: 3, component: JS, icon: '', tech: 'JS' },
                { id: 4, component: SQL, icon: '', tech: 'MS SQL' },
                { id: 5, component: C, icon: C, tech: 'C' },
                { id: 6, component: CSharp, icon: C, tech: 'C# Web API' },
                { id: 7, component: ReactJS, icon: REactJS, tech: 'React JS' },
                { id: 7, component: ReactJS, icon: Native, tech: 'React native' },
                { id: 7, component: Java, icon: Native, tech: 'Java' },
            ],
            tools: [
                { id: 1, component: Figma, tool: 'Figma' },
                { id: 2, component: Canva, tool: 'Canva' },
            ],
            roles: [
                { id: 1, role: 'UI/UX designer', description: 'Creative designs for you' },
                { id: 2, role: 'Web developer', description: 'Creative website for you' },
                { id: 3, role: 'Freelancer', description: 'You can hire me now' },
            ]

        }
    }

    componentDidMount() {
        generateRandomKey();
        // removeDB();
    }
    onHoverCard = (ID) => {

        this.setState({
            card: this.state.projects.map((i) => {
                return { ...i, isHover: ID == i?.id }
            })
        })
        this.setState({
            dot: this.state.dot.map((i) => {
                return { ...i, isHighlight: ID == i?.id }
            })
        })

    }

    onLeaveCard = () => {

        this.setState({
            card: this.state.projects.map((i) => {
                return { ...i, isHover: false }
            })
        })
        this.setState({
            dot: this.state.dot.map((i) => {
                return { ...i, isHighlight: false }
            })
        })
    }

    openMenu = () => {
        this.setState({
            isMenuOpen: true
        })
    }
    closeMenu = () => {
        this.setState({
            isMenuOpen: false
        })
    }

    menuHover = (item) => {

        this.setState({
            menuList: this.state.menuList.map(i => {

                return { ...i, isHighlight: i.id == item.id }

            })
        })
    }
    menuLeave = (item) => {
        this.setState({
            menuList: this.state.menuList.map(i => {

                return { ...i, isHighlight: false }

            })
        })
    }

    redirectToJournal = () => {
        this.props.navigate('/');
    }
    redirectToProject = (i) => {
        if (i.id == 1) {
            this.props.navigate('/figmaDesigns')
        }
        else {
            this.props.navigate('/canvaDesigns');

        }

    }

    handleSelect = (path) => {
        this.props.navigate(path)
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '34px' }}>


                <div className='dashboard-profile'>
                    <div style={{ flex: 3, width: '100%', margin: '0px 120px' }}>
                        <div style={{ fontWeight: 'bold', color: Color.whiteFont, fontSize: '20px' }}>I am Jessy</div>
                        <div style={{ fontWeight: 'bold', color: Color.whiteFont, fontSize: '34px' }}>Web developer +</div>
                        <div style={{ fontWeight: 'bold', color: Color.whiteFont, fontSize: '34px' }}>UI/UX designer</div>
                        <p style={{ color: 'grey', fontWeight: '400', fontSize: '16px', }}>{Constant.profile}</p>
                    </div>
                    <div style={{ flex: 2, margin: '20px', width: '100%' }}>
                        <Developer style={{ marginTop: '-97px' }} height={'100%'} width={'90%'} background='red' />
                    </div>
                </div>

                <div className='role-card'>
                    {this.state.roles.map(i =>
                        <div
                            onClick={() => this.redirectToProject(i)}
                            style={{
                                width: '250px',
                                backgroundColor: Color.theme,
                                color: Color.whiteFont,
                                cursor: 'pointer',
                                padding: '16px 0px'
                            }}>

                            <div className='center'>
                                {i.role}

                            </div>
                            <div className='center' style={{ fontSize: '12px', color: Color.grey }}>
                                {i.description}
                            </div>
                        </div>
                    )}
                </div>


                <div style={{ height: '12px' }}></div>

                <div className='project-card' style={{ backgroundColor: Color.theme, padding: '34px 12px', cursor: 'pointer' }} >
                    {this.state.projects?.map(({ id, component: Comp, path, isHover, name }) =>
                        <div
                            onMouseOver={() => this.onHoverCard(id)}
                            onMouseLeave={() => this.onLeaveCard(id)}
                            onClick={() => this.handleSelect(path)}
                            style={{ textOverflow: 'ellipsis', backgroundColor: Color.whiteFont, minheight: isHover ? '277px' : '250px', width: isHover ? '340px' : '300px', borderRadius: '16px', padding: '12px ' }}>
                            <div style={{ height: '60%', width: '90%', margin: '5%', borderRadius: '7px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Comp height='auto' width='100%' />
                            </div>
                            <div style={{ color: Color.grey, textAlign: 'center', fontWeight: 'bold', backgroundColor: Color.theme, padding: '12px', borderRadius: '12px' }}>{name}</div>


                        </div>
                    )

                    }
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {this.state.dot.map(i =>
                        <div style={{ backgroundColor: i.isHighlight ? Color.theme : 'grey', height: '12px', width: '12px', borderRadius: '25px', margin: '12px 5px', }} />
                    )}
                </div>

                <FigmaDesigns />
                <CanvaDesigns />

                <div className='experience-card' style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div style={{ flex: 1, }} />
                    <div style={{ flex: 1, }}>
                        <h2 style={{ color: Color.whiteFont }}>My experience</h2>
                        <div>
                            {this.state.experience.map(i =>
                                <div style={{ height: '', width: '', backgroundColor: Color.theme, margin: '34px 0px', padding: '7%', borderRadius: '7px' }}>
                                    <div style={{ color: Color.whiteFont }}>{i.year}</div>
                                    <div style={{ color: Color.whiteFont }} className='heading'>{i.role}</div>
                                    <div style={{ color: Color.grey }}>{i.place}</div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div style={{ flex: 1, }} />
                    <div style={{ flex: 1, }}>
                        <h2 style={{ color: Color.whiteFont }}>My education</h2>
                        <div>
                            {this.state.education.map(i =>
                                <div style={{ height: '', width: '', backgroundColor: Color.theme, margin: '34px 0px', padding: '7%', borderRadius: '7px' }}>
                                    <div style={{ color: Color.whiteFont }}>{i.year}</div>
                                    <div style={{ color: Color.whiteFont }} className='heading'>{i.role}</div>
                                    <div style={{ color: Color.grey }}>{i.place}</div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div style={{ flex: 1, }} />
                </div>







                <div className='center ' >
                    <div className='skills-card' style={{ width: '90%', backgroundColor: Color.theme, padding: '1%', borderRadius: '12px' }}>
                        <div className='center heading' style={{ color: Color.whiteFont }}>
                            My skills
                        </div>
                        <div className='tool-card'>
                            {this.state.skills.map(({ id, tech, component: Comp }) =>
                                <div style={{ width: '70%', backgroundColor: '', borderRadius: '12px', margin: '12px' }}>
                                    <div style={{ padding: '20px 0px' }} className='center'>
                                        <Comp height={'auto'} width='100%' />
                                    </div>
                                    <div className='center' style={{ padding: '12px 0px', color: Color.grey }}>
                                        {tech}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>



                <div className='details-card'>
                    <div style={{ backgroundColor: Color.theme, margin: '2%', borderRadius: '12px', padding: '25px' }} className='center'>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div className='center heading' style={{ color: Color.whiteFont }}>
                                Tools
                            </div>
                            <div className='tool-card'>
                                {this.state.tools.map(({ tool, component: Comp }) =>
                                    <div>
                                        <div style={{ padding: '20px 0px' }} className='center'>
                                            <Comp height={'auto'} width='100px' />
                                        </div>
                                        <div className='center' style={{ padding: '12px 0px', color: Color.grey }}>
                                            {tool}
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: Color.theme, padding: '25px', margin: '2%', borderRadius: '12px', }}>
                        <input className='profile-input' placeholder='name' />
                        <input className='profile-input' placeholder='Email' />
                        <textarea className='textarea profile-input' placeholder='msg' />
                        <button className='profile-input' style={{ backgroundColor: Color.whiteFont }}>Send</button>
                    </div>
                </div>
            </div>
        )
    }


}

export default WithRouter(Dashboard)
