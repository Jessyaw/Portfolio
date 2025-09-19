import React, { Component } from 'react'
import WithRouter from '../navigate/WithRouter'

class TaskManagerClone extends Component {
    render() {
        return (
            <div class="layout">
                <div class="sidebar">Sidebar</div>
                <div class="content">Main Content</div>
                <div class="right-panel">Right Card</div>
            </div>
        )
    }
}


export default WithRouter(TaskManagerClone)
