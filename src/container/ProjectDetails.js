import React, { Component } from 'react'
import { Color } from '../Colors'
import { Constant } from '../Constant'
import { BiCode, BiLeftArrow, BiLinkExternal, BiStar } from 'react-icons/bi';
import Todo from '../../src/image/svg/TODO.svg'
import WithRouter from '../navigate/WithRouter';
import { BiLoader } from 'react-icons/bi';

class ProjectDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            des: null,
            keywords: [],
            project: null,
            tech: [],
            src: null,
            status: null,
        }
    }
    componentDidMount() {
        document.body.style.backgroundColor = Color.bgDark;
        this.setState({
            des: this.props.location?.state?.data[0]?.des,
            keywords: this.props.location?.state?.data[0]?.keywords,
            project: this.props.location?.state?.data[0]?.project,
            tech: this.props.location?.state?.data[0]?.tech,
            src: this.props.location?.state?.data[0]?.src,
            status: this.props.location?.state?.data[0]?.status,
        })
    }

    componentWillUnmount() {
        document.body.style.backgroundColor = '';
    }

    handleBack = () => {
        this.props.navigate('/journal')
    }
    handleRedirectToProject = () => {
        if (this.state.project == 'TO DO') {

            this.props.navigate('/taskManager')

        } else if (this.state.project == 'Flight Ticket Booking') {

            this.props.navigate('/ticketBooking')

        } else {
            // this.props.navigate('/crm')
        }
    }
    render() {
        return (
            <div>
                <div className='project-details-div' >
                    <div style={{ flex: 1 }} />
                    <div className='col' style={{ flex: 3, gap: '25px' }}>
                        <div className='row' onClick={this.handleBack} style={{ cursor: 'pointer', gap: '12px', color: Color.whiteFont }}>
                            <BiLeftArrow />
                            <div>Back</div>
                        </div>
                        <div className='heading' style={{ color: Color.whiteFont, }}>{this.state.project}</div>
                        <div className='linear-gradient' style={{ height: '4px', width: '25%', backgroundColor: Color.red, borderRadius: '12px' }}></div>
                        <div style={{ color: Color.whiteFont, }}>{this.state.des}</div>
                        <div className='row center linear-gradient btn-home'
                            onClick={this.handleRedirectToProject}
                            style={{ gap: '12px', padding: '12px 2px', borderRadius: '5px' }}>
                            <div className='center' style={{ color: Color.whiteFont }}>{this.state.status == 'Completed' ? <BiLinkExternal /> : <BiLoader />}</div>
                            <div style={{ color: Color.whiteFont }}>{this.state.status == 'Completed' ? 'Live demo' : 'On Process'}</div>
                        </div>
                        <div className='small-heading' style={{ color: Color.whiteFont, }}>{'Technologies used'}</div>
                        <div className='mini-card'>
                            {this.state.tech?.map(i =>
                                <div className='row tag-tech' style={{ gap: '12px', borderRadius: '4px', padding: '12px' }}>
                                    <div className='center' style={{ color: Color.whiteFont }}><BiCode /></div>
                                    <div style={{ color: Color.whiteFont }}>{i.tech}</div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='col' style={{ gap: '25px', flex: 3 }}>
                        <div><img src={this.state.src} width={'100%'} style={{ borderRadius: '12px' }} /></div>
                        <div style={{ border: '0.5px solid #111827', borderRadius: '12px', padding: '12px' }}>
                            <div className='row' style={{ gap: '12px', alignItems: 'center' }}>
                                <div><BiStar color={Color.yellow} /></div>
                                <div className='small-heading' style={{ color: Color.whiteFont, }}>Key features</div>
                            </div>
                            <div>
                                <ul className='col' style={{ gap: '12px' }}>
                                    {this.state.keywords?.map(i =>
                                        <li style={{ color: Color.whiteFont, fontSize: '14px', fontWeight: '400' }}>{i.key}</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div style={{ flex: 1 }} />
                </div>
            </div>
        )
    }
}


export default WithRouter(ProjectDetails);
