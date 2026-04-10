import React from 'react'
import WithRouter from '../context/WithRouter'
import { Constant } from '../Constant';
import { ApiUrl } from '../Api';
import { ApiCall } from '../ApiCall';
import WithToaster from '../context/WithToaster';

class Verify extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token: '',
            isSuccess: false,
            isVerified: false,
            SuccessMessage: '',
            FailureMessage: '',
        }
    }
    componentDidMount() {
        this.fetchToken();
    }
    fetchToken = async () => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        var data = {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            roleID: '',
            role: '',
            isEmailVerified: '',
            EmailVerificationToken: token
        }

        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/VerifyToken`, 'POST', data);

            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.setState({
                    isVerified: true,
                    isSuccess: true
                })
            }
            else {
                this.props.toast.show('F', json.message);
            }

        } catch (e) {
            this.props.toast.show('F', e.message);
        }

    }
    handleLogin = () => {
        this.props.navigate('/sign-in');
    }
    render() {
        return (
            <div className='center' style={{ height: '40rem' }}>
                <div>
                    {this.state.isVerified ?
                        <div>
                            {this.state.isSuccess ?
                                <div>
                                    <div>
                                        {this.state.SuccessMessage}
                                    </div>
                                    <div>
                                        <button className='btn-login' onClick={this.handleLogin}>Login here</button>

                                    </div>
                                </div>
                                : <div>{this.state.FailureMessage}</div>
                            }
                        </div> :
                        <div className='nor-header'>{Constant.verifying}</div>}
                </div>
            </div>
        )
    }
}

export default WithRouter(WithToaster(Verify));
