import React, { Component } from 'react'
import WithRouter from '../navigate/WithRouter'
import { Color } from '../Colors'
import { ReactComponent as FlightUI } from '../../src/image/svg/Full screen.svg'
import { ReactComponent as FoodUI } from '../../src/image/svg/FoodUI.svg'
import { ReactComponent as CRM } from '../../src/image/svg/CRM.svg'
import { ReactComponent as TODO } from "../image/svg/TODO.svg"


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
    }
    componentWillUnmount() {
        document.body.style.backgroundColor = '';
    }
    redirectToDashboard = () => {
        this.props.navigate('/')
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
