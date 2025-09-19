import React, { Component } from 'react'
import { ReactComponent as Canva } from '../../src/image/svg/FlightDesign.svg'
import WithRouter from '../navigate/WithRouter'
import { Color } from '../Colors'
import { CanvaData } from '../CanvaData'
import { BiLinkExternal } from 'react-icons/bi'
import { BiLeftArrow } from 'react-icons/bi'

class CanvaDesigns extends Component {
    constructor(props) {
        super(props)
        this.state = {
            canva: CanvaData,
        }
    }
    handleBack = () => {
        this.props.navigate('/')
    }
    render() {
        return (
            <div style={{}}>
                <div className='row' onClick={this.handleBack} style={{ margin: '0px 25px', cursor: 'pointer', gap: '12px', color: Color.whiteFont }}>
                    <BiLeftArrow />
                    <div className='medium-heading' style={{ padding: '20px 25px', color: Color.primaryPurple }}>Canva Design</div>
                </div>

                <div className='canva-card-div' >
                    {this.state.canva?.map(i =>
                        <div className='col canva-card' style={{ justifyContent: 'space-between', gap: '12px', backgroundColor: Color.whiteFont, }}>
                            <div className='center' style={{}}>
                                <img src={i.src} width={'100%'} style={{ boxShadow: '1px 1px 5px #a59f9fb7' }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <div className=' link' onClick={() => this.openCanva(i.redirectTo)}>
                                    <div className='center'><BiLinkExternal /></div>
                                </div>
                            </div>

                        </div>
                    )}
                </div>

            </div >
        )
    }
}

export default WithRouter(CanvaDesigns);
