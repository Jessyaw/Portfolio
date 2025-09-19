import React, { Component } from 'react'
import WithRouter from '../navigate/WithRouter'
import NavHeader from '../component/NavHeader';
import { Color } from '../Colors';
import { FaRegSave } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Constant } from '../Constant';

class Resume extends Component {
    constructor(props) {
        super(props)
        this.state = {
            passage: "",
            isEdit: false,
            ID: null,
            heading: null,
            isSaved: false,
        }
        this.contentRef = React.createRef();
    }
    render() {
        return (
            <div>
                <NavHeader />
                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0px 16px' ,margin: '100px 5% 12px',}}>
                        <FaRegSave onClick={() => this.onSaveClick(this.state.passage)} color={this.state.isSaved ? Color.theme : Color.disableColor} size={23} style={{ margin: '0px 12px' }} />
                        <MdEdit onClick={this.onEdit} color={this.state.isEdit ? Color.disableColor : Color.theme} size={23} style={{ margin: '0px 12px' }} />
                    </div>
                <div style={{ width: '70%', backgroundColor: Color.whiteFont, margin: '10px 5% 12px', padding: '2% 5%', boxShadow: '2px 12px 16px rgba(192, 170, 192, 0.47)' }}>
                   
                    <div className='heading'>Jessy Angel W</div>
                    <div style={{ fontSize: '25px' }}>Fullstack developer</div>
                    <div style={{ height: '25px' }}></div>

                    <div>9028333453</div>
                    <div>jesyitpro@gmail.com</div>
                    <div style={{ height: '25px' }}></div>
                    <div style={{ height: '1px', width: '90%', backgroundColor: Color.blackFont }}></div>
                    <div style={{ height: '25px' }}></div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '250%' }}>
                            <div style={{ height: '25px' }}></div>
                            <div className='heading'>Education</div>
                            <div style={{ height: '25px' }}></div>
                            <div>B.E CSE</div>
                            <div>Einstein college of engineering</div>
                            <div>2019-2023</div>
                            <div style={{ height: '25px' }}></div>
                            <div>B.E CSE</div>
                            <div>Einstein college of engineering</div>
                            <div>2019-2023</div>
                            <div style={{ height: '25px' }}></div>
                            <div>B.E CSE</div>
                            <div>Einstein college of engineering</div>
                            <div>2019-2023</div>
                            <div style={{ height: '25px' }}></div>
                            <div style={{ height: '25px' }}></div>
                            <div className='heading'>Skills</div>
                            <ul><li>react</li></ul>
                            <ul><li>react</li></ul>
                            <ul><li>react</li></ul>
                            <ul><li>react</li></ul>
                            <ul><li>react</li></ul>
                            <ul><li>react</li></ul>
                            <ul><li>react</li></ul>
                            <div className='heading'>Tools</div>
                            <ul><li>react</li></ul>
                            <ul><li>react</li></ul>
                        </div>

                        <div style={{ margin: '0px 12px' }}>
                            <div style={{ width: '1px', height: '1000px', backgroundColor: Color.blackFont }}></div>
                        </div>

                        <div>

                            <div style={{ height: '25px' }}></div>
                            <div className='heading'>Profile</div>
                            <div style={{textAlign:'justify'}}>
                                {Constant.profile}
                            </div>
                            <div style={{ height: '25px' }}></div>
                            <div style={{ height: '25px' }}></div>
                            <div className='heading'>Profile</div>
                            <div style={{textAlign:'justify'}}>
                                this is amazing grace this is unfailing love that you would take my place that you would lay your life
                                this is amazing grace this is unfailing love that you would take my place that you would lay your life
                                this is amazing grace this is unfailing love that you would take my place that you would lay your life
                                this is amazing grace this is unfailing love that you would take my place that you would lay your life
                                this is amazing grace this is unfailing love that you would take my place that you would lay your life
                                this is amazing grace this is unfailing love that you would take my place that you would lay your life
                                this is amazing grace this is unfailing love that you would take my place that you would lay your life
                                this is amazing grace this is unfailing love that you would take my place that you would lay your life
                                this is amazing grace this is unfailing love that you would take my place that you would lay your life
                                this is amazing grace this is unfailing love that you would take my place that you would lay your life
                            </div>
                            <div style={{ height: '25px' }}></div>
                            <div style={{ height: '25px' }}></div>
                            <div className='heading'>Profile</div>
                            <div style={{textAlign:'justify'}}>
                                this is amazing grace this is unfailing love that you would take my place that you would lay your life
                                this is amazing grace this is unfailing love that you would take my place that you would lay your life
                                this is amazing grace this is unfailing love that you would take my place that you would lay your life
                                this is amazing grace this is unfailing love that you would take my place that you would lay your life
                                this is amazing grace this is unfailing love that you would take my place that you would lay your life
                                this is amazing grace this is unfailing love that you would take my place that you would lay your life
                                this is amazing grace this is unfailing love that you would take my place that you would lay your life
                                this is amazing grace this is unfailing love that you would take my place that you would lay your life
                                this is amazing grace this is unfailing love that you would take my place that you would lay your life
                                this is amazing grace this is unfailing love that you would take my place that you would lay your life
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WithRouter(Resume);
