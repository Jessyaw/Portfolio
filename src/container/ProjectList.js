import React, { Component } from 'react'
import WithRouter from '../navigate/WithRouter'
import { Color } from '../Colors'

class ProjectList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [
                { id: 1, path: '/taskManager', project: 'To Do List', isHover: false, isSelected: false },
                { id: 2, path: '/crm', project: 'CRM', isHover: false, isSelected: false },
                { id: 3, path: '/ticketbooking', project: 'Ticket', isHover: false, isSelected: false },
                { id: 4, path: '/taskManager', project: 'Taxi Booking', isHover: false, isSelected: false },
            ],
        }
    }
    handleHover = (item) => {
        this.setState({
            projects: this.state.projects.map(i => { return { ...i, isHover: item.id == i.id } }
            )
        })
    }
    handleSelect = (item) => {
        this.props.navigate(item.path)
    }
    render() {
        return (
            <div>
                <div className='projectlist-card'>
                    {this.state.projects.length > 0 && this.state.projects.map(i =>

                        <div
                            onClick={() => this.handleSelect(i)}
                            onMouseOver={() => this.handleHover(i)}
                            style={{ cursor: 'pointer', backgroundColor: i.isHover ? Color.yellow : '#FFF', color: i.isHover ? Color.whiteFont : Color.blackFont, padding: '12px', margin: '12px', borderRadius: '7px' }}>{i.project}</div>
                    )}
                </div>
            </div>
        )
    }
}

export default WithRouter(ProjectList)
