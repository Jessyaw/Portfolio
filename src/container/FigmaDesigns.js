import React, { Component } from 'react'
import WithRouter from '../navigate/WithRouter'
import { Color } from '../Colors'
import FoodAppUI from '../../src/image/jpg/FoodAppUI.png'
import { BiLeftArrow } from 'react-icons/bi'
import { ReactComponent as FlightUI } from '../../src/image/svg/Full screen.svg'
import { ReactComponent as FoodUI } from '../../src/image/svg/FoodUI.svg'
import { ReactComponent as CRM } from '../../src/image/svg/CRM.svg'
import { ReactComponent as TODO } from "../image/svg/TODO.svg"

import FigmaEmbed from '../component/FigmaEmbed'

class FigmaDesigns extends Component {
    constructor(props) {
        super(props)
        this.state = {
            designCards: [
                { id: 1, isHover: false, component: FoodUI, design: 'Food App UI/UX', redirectTo: 'https://www.figma.com/design/Lc4GAtpwcHlf2nJnTFS17o/Food?node-id=24-2&m=dev&t=IdLwjOoEXimMRXHk-1' },
                { id: 2, isHover: false, component: FlightUI, design: 'Flight Ticket Booking UI/UX', redirectTo: '//Somelink' },
                { id: 3, isHover: false, component: CRM, design: 'CRM UI/UX', redirectTo: '//Somelink' },
                { id: 4, isHover: false, component: TODO, design: 'TODO UI/UX', redirectTo: '//Somelink' },
            ],
        }
    }

    componentDidMount() {
        // document.body.style.backgroundColor = '#FFF';
    }
    componentWillUnmount() {
        document.body.style.backgroundColor = '';
    }
    redirectToDashboard = () => {
        this.props.navigate('/journal')
    }
    handleMouseOver = (id) => {
        this.setState({
            designCards: this.state.designCards?.map(i => {
                return {
                    ...i,
                    isHover: id === i.id
                }
            })
        })
    }
    handleMouseLeave = (id) => {
        this.setState({
            designCards: this.state.designCards?.map(i => {
                return {
                    ...i,
                    isHover: false
                }
            })
        })
    }
    redirectToFigmaDesign = (id) => {
        this.props.navigate('/figmaEmbed')
    }
    render() {
        return (
            <div>
                <div style={{ display: 'flex', padding: '20px 25px', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className='heading' style={{ color: Color.whiteFont }}>
                        UI/UX Design
                    </div>
                    {/* <div
                        onClick={this.redirectToDashboard}
                        style={{
                            cursor: 'pointer', display: 'flex', justifyContent: 'space-between',
                            alignItems: 'center', backgroundColor: Color.theme, margin: '7px', padding: '7px',
                            borderRadius: '7px', color: Color.whiteFont
                        }}>
                        <div style={{ margin: '0px 12px 0px 0px' }}><BiLeftArrow /></div>
                        <div> Back</div>

                    </div> */}
                </div>
                <div className='figma-card'>
                    {this.state.designCards?.map(({ id, isHover, design, component: Comp }) =>
                        <div
                            onMouseOver={() => this.handleMouseOver(id)}
                            onMouseLeave={() => this.handleMouseLeave(id)}
                            onClick={() => this.redirectToFigmaDesign(id)}
                            style={{
                                width: '70%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                                alignItems: 'center', gap: '12px',
                                backgroundColor: Color.theme, margin: '12px', borderRadius: '12px',
                                cursor: 'pointer',
                                // boxShadow: '1px 2px 10px rgba(148, 143, 143, 0.45)',
                                height: '340px'
                            }}>
                            <Comp height='auto' width='90%' style={{ padding: '12px' }} />
                            <div

                                style={{
                                    padding: '16px 0px', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px',
                                    backgroundColor: isHover ? Color.whiteFont : Color.grey, width: '100%', textAlign: 'center',
                                    color: isHover ? Color.theme : Color.whiteFont, width: '100%', textAlign: 'center'
                                }}>{design}</div>
                        </div>)}

                </div>
            </div>
        )
    }
}

export default WithRouter(FigmaDesigns)
