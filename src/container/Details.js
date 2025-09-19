import React, { Component } from 'react'
import { Color } from '../Colors'
import NavHeader from '../component/NavHeader'
import { db } from '../dexie/DB'
import WithRouter from '../navigate/WithRouter'
import { decryption, encryption } from '../dexie/EncodeDecode'

class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            project: null,
            description: null,
            yearsOfExp: null,
            start: null,
            end: null,
        }
    }
    handleName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    handleProject = (e) => {
        this.setState({
            project: e.target.value
        })
    }
    handleDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }
    handleYears = (e) => {
        this.setState({
            yearsOfExp: e.target.value
        })
    }
    handleStart = (e) => {
        this.setState({
            start: e.target.value
        })
    }
    handleEnd = (e) => {
        this.setState({
            end: e.target.value
        })
    }
    onCancel = () => {

    }
    fetchData = async () => {
        let data = await db.projectList.toArray();
        let decode = decryption(data);
    }
    onSubmit = async () => {
        const { name, start, end, yearsOfExp, project, description } = this.state;
        try {
            if (name && start && end && yearsOfExp && project && description) {
                let data = encryption({ name: name, project: project, explanation: description, experience: yearsOfExp, start: start, end: end })
                await db.projectList.add(data)
                this.fetchData();
                this.props.navigate('/dashboard')
            }
            else {
                alert("Fill the details")
            }
        }
        catch (e) {
        }

    }
    render() {
        return (
            <div>
                <NavHeader />
                <div className='center heading' style={{ margin: '100px 12px 0px', color: Color.whiteFont }}>
                    Project details
                </div>
                <div style={{ margin: '20px', flexWrap: 'wrap' }} className='center'>

                    <input onChange={(e) => this.handleName(e)} value={this.state.name} maxLength={7} className='input' placeholder='Name' />
                    <input onChange={(e) => this.handleProject(e)} value={this.state.project} maxLength={7} className='input' placeholder='Project' />
                    <input onChange={(e) => this.handleDescription(e)} value={this.state.description} maxLength={75} className='input' placeholder='Description' />
                    <input onChange={(e) => this.handleYears(e)} value={this.state.yearsOfExp} maxLength={7} className='input' type='number' placeholder='Year of experience' />
                    <input onChange={(e) => this.handleStart(e)} value={this.state.start} maxLength={7} className='input' placeholder='Starting date' />
                    <input onChange={(e) => this.handleEnd(e)} value={this.state.end} maxLength={7} className='input' placeholder='Ending date' />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', margin: '0% 7%' }}>
                    <button onClick={this.onCancel} style={{ border: 'none', borderRadius: '7px', background: 'red', height: '43px', width: '160px', color: Color.whiteFont, margin: '12px' }}>Cancel</button>
                    <button onClick={this.onSubmit} style={{ border: 'none', borderRadius: '7px', background: Color.theme, height: '43px', width: '160px', color: Color.whiteFont, margin: '12px' }}>Submit</button>
                </div>
            </div>
        )
    }
}


export default WithRouter(Details)