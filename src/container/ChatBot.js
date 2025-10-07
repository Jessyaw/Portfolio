import React, { Component } from 'react'
import { RiSendPlaneFill } from 'react-icons/ri';
import { Color } from '../Colors';
import { ApiUrl } from '../Api';
import { FaCaretDown } from 'react-icons/fa';

export default class ChatBot extends Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: [],
            reply: '',
            prompt: '',
            onSend: false,
            text: '',
            isClick: false,
            showScrollDown: false,
        }
        this.scrollRef = React.createRef();
    }
    componentDidMount() {

        this.setState({
            text: this.props?.prompt,
            prompt: this.props?.prompt,
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.msg.length !== this.state.msg.length) {
            this.checkOverflow();
        }
    }

    handlePrompt = (e) => {
        this.setState({
            text: e.target.value,
            prompt: e.target.value,
            onSend: false,
        })
    }
    handleSend = async () => {

        if (!this.state.prompt.trim()) return;

        let val = this.state.text;
        let message = [];
        message = [...this.state.msg, { text: val, sender: 'user' }];
        message.push({ text: 'loader', sender: 'bot', isLoading: true });
        this.setState({
            msg: message,
            onSend: true,
            prompt: ''
        })
        let data = {
            question: this.state.prompt,
            response: '',
            status: '',
            message: ''
        }
        let messageContent;

        try {
            await fetch(`${ApiUrl.url}/Chat/Ask`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(json => {
                    if (json.status == 'T') {
                        messageContent = json.message;
                        return;
                    }
                    console.log(json, 'reply')
                    let reply = JSON.parse(json.response);
                    try {
                        if (Array.isArray(reply)) {
                            // It's an array of objects → render table
                            messageContent = (
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr>
                                            {Object.keys(reply[0]).map((col, i) => (
                                                <th key={i} style={{ backgroundColor: '#27252569', textAlign: 'center', padding: '7px' }}>{col}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reply.map((row, i) => (
                                            <tr key={i}>
                                                {Object.values(row).map((val, j) => (
                                                    <td key={j} style={{ textAlign: 'center', padding: '7px' }}>{val}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            );
                        } else if (typeof reply === 'object') {
                            // It's a single object → show key: value pairs
                            messageContent = (
                                <div>
                                    {Object.entries(reply).map(([key, val], i) => (
                                        <div key={i}><strong>{key}:</strong> {val}</div>
                                    ))}
                                </div>
                            );
                        } else {
                            console.log(data, 'fdsjfgdsf')
                            // Just plain text
                            messageContent = data.toString();
                        }
                    } catch (e) {
                        messageContent = reply;
                    }
                })

            setTimeout(() => {
                // message = this.state.msg.filter(m => !m.isLoading);
                // message = [...this.state.msg, { text: messageContent, sender: 'bot' }];
                this.setState(prevState => ({
                    msg: [
                        ...prevState.msg.filter(m => !m.isLoading), // remove loader
                        { text: messageContent, sender: 'bot' },     // add response
                    ],
                }));

            }, 1200);
        } catch (e) {
            this.setState(prevState => ({
                msg: [
                    ...prevState.msg.filter(m => !m.isLoading),
                    { text: 'Error: Unable to fetch response.', sender: 'bot' },
                ],
            }));
        }


    }
    checkOverflow = () => {
        const el = this.scrollRef.current;
        if (el) {
            this.setState({ showScrollDown: el.scrollHeight > el.clientHeight && el.scrollTop + el.clientHeight < el.scrollHeight });
            const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 10;

            this.setState({ showScrollDown: !isAtBottom });
        }
    }

    handleDown = () => {
        if (this.scrollRef.current) {
            this.scrollRef.current.scrollTop = this.scrollRef.current.scrollHeight;
            this.setState({ showScrollDown: false }); // hide after scrolling
        }

    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', flex: 1 }}>
                <div className='small-heading'>Chat</div>
                <div
                    style={{ height: '430px', padding: '0px 12px 0px 0px' }}
                    className='scroll'
                    ref={this.scrollRef}
                    onScroll={this.checkOverflow}
                >
                    <div style={{ display: 'flex', justifyContent: 'flex-end', }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', }}>
                            {this.state.msg?.map((m, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start',
                                    }}
                                >
                                    <div
                                        style={{
                                            backgroundColor: m.sender === 'user' ? Color.green : Color.grey,
                                            color: Color.whiteFont,
                                            padding: '6px 10px',
                                            borderRadius: '8px',
                                            display: 'inline-block',
                                            maxWidth: '70%',
                                            wordWrap: 'break-word',
                                        }}
                                    >
                                        {m.isLoading ? (
                                            <div style={{ display: 'flex', gap: '4px' }}>
                                                <span className="dot"></span>
                                                <span className="dot"></span>
                                                <span className="dot"></span>
                                            </div>
                                        ) : (
                                            m.text
                                        )}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                </div>
                {(this.state.showScrollDown && <div className='center' style={{ position: 'absolute', bottom: '70px', left: '50%' }}>
                    <div className='center' style={{ backgroundColor: Color.whiteFont, padding: '7px', borderRadius: '7px', boxShadow: '1px 2px 10px #a4acac64' }}>
                        <FaCaretDown size={25} color={Color.chatBot} onClick={this.handleDown} />
                    </div>
                </div>)}

                <div style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
                    <textarea
                        value={this.state.prompt}
                        onChange={this.handlePrompt}
                        className='input-chat scroll'
                        placeholder='Ask anything...'
                        onMouseEnter={() => { this.setState({ isClick: true }) }}
                        onMouseLeave={() => { this.setState({ isClick: false }) }}
                        style={{
                            width: '100%',
                            resize: 'none',
                            padding: '10px',
                            borderRadius: '8px',
                            fontSize: '14px',
                            border: '1px solid #5e525247',
                            backgroundColor: Color.whiteFont,
                        }}
                    />
                    <div className='center' style={{ backgroundColor: Color.whiteFont, padding: '7px', borderRadius: '7px', boxShadow: '1px 2px 10px #a4acac64' }}>
                        <RiSendPlaneFill size={25} color={this.state.prompt ? Color.chatBot : Color.lightGrey} onClick={this.handleSend} />
                    </div>
                </div>
            </div >
        )
    }
}
