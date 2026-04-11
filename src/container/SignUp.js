import React from 'react'
import WithRouter from '../context/WithRouter'
import { auth, provider, signInWithPopup, signOut } from '../firebase/FireBase'
import { ApiUrl } from '../Api';
import { FaRegEye, FaRegEyeSlash, FaXTwitter } from "react-icons/fa6";
import { Color } from '../Colors';
import { ApiCall } from '../ApiCall';
import { ValidateField } from '../Validation';
import WithToaster from '../context/WithToaster';

class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            fullName: '',
            lName: '',
            email: '',
            password: '',
            confirmPassword: '',
            confirmPW: '',
            isLogin: false,
            isSignup: false,
            roleMenu: [],
            successMessage: '',
            failureMessage: '',
            isPWVisible: false,
            isConfirmPWVisible: false,
            errors: {},
        }
    }

    componentDidMount() {
        document.body.style.backgroundColor = '#FFF';
        this.fetchRoles();
    }
    componentWillUnmount() {
        document.body.style.backgroundColor = '';
    }
    redirectToDashboard = () => {
        this.props.navigate('/dashboard');
    }
    fetchRoles = async () => {
        try {
            await fetch(`${ApiUrl.url}/CRM/FetchRoles`)
                .then(res => res.json())
                .then(json => {
                    if (json.data) {
                        this.setState({
                            roleMenu: json.data,
                        })
                    }
                });
        } catch (e) {
            this.setState({
                failureMessage: e.message
            })
        }
        finally {
            this.setState({
                isLoading: false,
            })
        }
    }
    handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            this.setState({
                user: result.user,
            })
        }
        catch (error) {
        }
    }
    handleChange = (field, value, compareValue) => {
        this.setState((prevState) => ({
            [field]: value,
            errors: {
                ...prevState.errors,
                [field]: ValidateField(field, value, compareValue)
            }
        }));
    }



    handleCreateAccount = () => {
        let { fullName, email, password, confirmPassword } = this.state;
        const fields = { fullName, email, password, confirmPassword }

        let errors = {};

        Object.keys(fields).forEach(field => {
            const error = ValidateField(field, fields[field]);
            if (error) errors[field] = error;
        });

        this.setState({ errors });
        if (Object.keys(errors).length === 0) {

            let data = {
                id: this.state.isUpdate ? this.state.UpdateID : 0,
                fullName: this.state.fullName,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
                roleID: 1,
                role: "",
                team: "",
                teamID: null,
                isActive: true,
                isEmailVerified: false,
                emailVerificationToken: "",
                emailVerificationTokenExpiry: null
            }
            this.handleCreateUser(data);
        }
    }
    handleCreateUser = async (data) => {
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/CreateUser`, 'POST', data);

            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.props.navigate('/email-senttype=signup')
            }
            else {
                this.props.toast.show('F', json.message);
            }

        } catch (e) {
            this.props.toast.show('F', e.message);
        }

    }
    handleClear = () => {
        this.setState({
            fullName: '',
            email: '',
            password: '',
            confirmPW: '',
            role: ''
        })
    }
    switchLogin = () => {
        this.setState({ isSignup: this.state.isSignup ? false : true })
    }
    render() {
        return (
            <div className='signin-bg'>
                <div className='signin-card-container tbl-scroll'>
                    <div className='signin-card' >
                        <div className='md-header'>Sign up</div>
                        <div className='sm-header'>Already have an account?<a onClick={() => this.props.navigate('/sign-in')}> Sign in</a></div>
                        <div className='inpt-container' style={{ gap: '16px' }}>
                            <div className='inpt-container' >
                                <input className='inpt-login' placeholder='Full Name' maxLength={50} onChange={(e) => this.handleChange("fullName", e.target.value)} value={this.state.fullName} />
                                {this.state.errors.fullName && <span className='field-error'>{this.state.errors.fullName}</span>}
                            </div>
                            <div className='inpt-container' >
                                <input className='inpt-login' placeholder='Email' maxLength={75} onChange={(e) => this.handleChange("email", e.target.value)} value={this.state.email} />
                                {this.state.errors.email && <span className='field-error'>{this.state.errors.email}</span>}
                            </div>
                            <div className='inpt-container' >
                                <div style={{ position: 'relative', }}>
                                    {this.state.isPWVisible ?
                                        <FaRegEye
                                            onClick={() => this.setState({ isPWVisible: false })}
                                            color={Color.blackFont}
                                            className='eye-icon'
                                        />
                                        :
                                        <FaRegEyeSlash
                                            onClick={() => this.setState({ isPWVisible: true })}
                                            color={Color.grey}
                                            className='eye-icon'
                                        />}

                                    <input
                                        type={this.state.isPWVisible ? 'text' : 'password'}
                                        onCopy={(e) => e.preventDefault()}
                                        onPaste={(e) => e.preventDefault()}
                                        onCut={(e) => e.preventDefault()}
                                        onContextMenu={(e) => e.preventDefault()}
                                        className='inpt-login'
                                        placeholder='Password'
                                        maxLength={25}
                                        onChange={(e) => this.handleChange("password", e.target.value)}
                                        value={this.state.password}
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </div>
                                {this.state.errors.password && <span className='field-error' style={{ maxWidth: 'none' }}>{this.state.errors.password}</span>}
                            </div>
                            <div className='inpt-container' style={{ position: 'relative' }}>
                                <div style={{ position: 'relative', width: '100%', }}>
                                    {this.state.isConfirmPWVisible ?
                                        <FaRegEye
                                            onClick={() => this.setState({ isConfirmPWVisible: false })}
                                            color={Color.blackFont}
                                            className='eye-icon'
                                        />
                                        :
                                        <FaRegEyeSlash
                                            onClick={() => this.setState({ isConfirmPWVisible: true })}
                                            color={Color.grey}
                                            className='eye-icon'
                                        />}
                                    <input
                                        type={this.state.isConfirmPWVisible ? 'text' : 'password'}
                                        onCopy={(e) => e.preventDefault()}
                                        onPaste={(e) => e.preventDefault()}
                                        onCut={(e) => e.preventDefault()}
                                        onContextMenu={(e) => e.preventDefault()}
                                        className='inpt-login'
                                        placeholder='Confirm Password'
                                        maxLength={25}
                                        onChange={(e) => this.handleChange("confirmPassword", e.target.value, this.state.password)}
                                        value={this.state.confirmPassword}
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </div> {this.state.errors.confirmPassword && <span className='field-error'>{this.state.errors.confirmPassword}</span>}
                            </div>


                            <button className='btn-login' onClick={this.handleCreateAccount}>Create account</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WithRouter(WithToaster(SignUp));
