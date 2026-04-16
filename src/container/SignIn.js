import React from 'react'
import WithRouter from '../context/WithRouter'
import { auth, provider, signInWithPopup } from '../firebase/FireBase'
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { BsApple, BsLinkedin } from 'react-icons/bs';
import { BsMicrosoft } from 'react-icons/bs';
import { Color } from '../Colors';
import { FaRegEye, FaRegEyeSlash, FaXTwitter } from "react-icons/fa6";
import { ApiUrl } from '../Api';
import WithToaster from '../context/WithToaster';
import { ValidateField } from '../Validation';
import { ApiCall } from '../ApiCall';
import logo from '../image/svg/CRM_LOGO.svg'

class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            email: "",
            password: "",
            socialIcons: [
                { id: 1, icon: <FcGoogle size={20} />, isHover: false, },
                { id: 2, icon: <FaFacebook size={20} />, isHover: false, },
                { id: 3, icon: <FaXTwitter size={20} />, isHover: false, },
                { id: 4, icon: <BsLinkedin size={20} />, isHover: false, },
                { id: 5, icon: <BsMicrosoft size={20} />, isHover: false, },
                { id: 6, icon: <BsApple size={20} />, isHover: false, },
            ],
            successMessage: "",
            failureMessage: "",
            verifying: false,
            errors: {},
        }
    }

    componentDidMount() {
        document.body.style.backgroundColor = '#ffffff80';
    }
    componentWillUnmount() {
        document.body.style.backgroundColor = "";
    }
    redirectToDashboard = () => {
        this.props.navigate('/dashboard');
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

    handleChange = (field, value) => {
        this.setState((prevState) => ({
            [field]: value,
            errors: {
                ...prevState.errors,
                [field]: ValidateField(field, value)
            }
        }));
    }



    handleSignIn = () => {
        let { email, password } = this.state;
        const fields = { email, password }

        let errors = {};

        Object.keys(fields).forEach(field => {
            const error = ValidateField(field, fields[field]);
            if (error) errors[field] = error;
        });

        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            let mailToVerify = {
                fullName: "",
                email: this.state.email,
                password: this.state.password,
                confirmPassword: "",
                roleID: null,
                role: "",
                teamID: null,
                team: "",
                isActive: true,
                isEmailVerified: false,
                emailVerificationToken: "",
                emailVerificationTokenExpiry: null
            }
            this.handleCheckMailVerified(mailToVerify);
            this.setState({
                verifying: true
            })
        }
    }
    handleCheckMailVerified = async (data) => {
        console.log('daatta')
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/CheckEmailVerified`, 'POST', data);

            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.handleLogin(data);
            }
            else {
                this.props.toast.show('F', json.message);
                if (json.message === "User is not exist!!") {
                    this.props.navigate('/sign-up');
                } else {
                    this.handleSendMailToVerify(data);
                }
            }

        } catch (e) {
            this.props.toast.show('F', e.message);
        }
    }
    handleSendMailToVerify = async (data) => {
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/sendMailToLoginUser`, 'POST', data);

            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.props.navigate('/email-sent?type=login')
            }
            else {
                this.props.toast.show('F', json.message);
                this.setState({
                    verifying: false
                })
            }

        } catch (e) {
            this.props.toast.show('F', e.message);
        }
    }

    handleLogin = async (data) => {
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/LoginUser`, 'POST', data);

            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.handleStoreUserData(json.data?.id);
            }
            else {
                this.props.toast.show('F', json.message);
            }

        } catch (e) {
            this.props.toast.show('F', e.message);
        }
    }

    handleStoreUserData = async (ID) => {
        let data = {
            id: ID,
            fullName: "",
            email: this.state.email,
            password: this.state.password,
            confirmPassword: "",
            roleID: null,
            role: "",
            teamID: null,
            team: "",
            isActive: true,
            isEmailVerified: false,
            emailVerificationToken: "",
            emailVerificationTokenExpiry: null
        }
        console.log(data)
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/FetchUserData`, 'POST', data);

            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                sessionStorage.setItem("data", JSON.stringify(json.data));
                this.props.navigate('/crm');
            }
            else {
                this.props.toast.show('F', json.message);
            }

        } catch (e) {
            this.props.toast.show('F', e.message);
        }
    }
    redirectToSignUp = () => {
        this.props.navigate('/sign-up');
    }
    hoverIcon = (i) => {
        this.setState(prevState => ({
            socialIcons: prevState.socialIcons.map(item => ({
                ...item,
                isHover: item.id == i.id
            }))
        }))
    }
    handleLeave = () => {
        this.setState(prevState => ({
            socialIcons: prevState.socialIcons.map(item => ({
                ...item,
                isHover: false
            }))
        }))
    }
    render() {
        return (
            <div className='signin-bg'>
                <div className='signin-card-container tbl-scroll'>
                    <div className='signin-card' style={{ gap: '12px' }}>
                        <div className='center' style={{ justifyContent: 'space-between' }}>
                            <div className='md-header'>Sign in</div>
                            <img src={logo} height={'90px'} width='150px' />
                        </div>
                        <div className='inpt-container' style={{ gap: '16px' }}>
                            <div className='inpt-container' style={{ gap: '7px' }}>
                                <input className='inpt-login' placeholder='Email' onChange={(e) => this.handleChange('email', e.target.value)} value={this.state.email} />
                                {this.state.errors.email && <span className='field-error'>{this.state.errors.email}</span>}
                            </div>
                            <div className='inpt-container' style={{ gap: '7px', }}>
                                <div style={{ position: 'relative', width: '100%', }}>
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
                                        onChange={(e) => this.handleChange('password', e.target.value)}
                                        value={this.state.password}
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </div>
                                {this.state.errors.password && <span className='field-error'>{this.state.errors.password}</span>}
                            </div>
                            <div className='sm-header' style={{ fontSize: '0.9rem', color: Color.grey, cursor: 'pointer' }}>Forget password?</div>
                            <button className='btn-login' onClick={this.handleSignIn}>{this.state.verifying ? 'Email verifying...' : 'Here we go'}</button>
                        </div>
                        <div>
                            <div className='nor-header'>Sign in with</div>
                            <div className='icon-conatainer'>
                                {this.state.socialIcons.map(i =>
                                    <div className='social-icons' style={{ backgroundColor: i.isHover ? Color.whiteFont : Color.whiteFont, boxShadow: i.isHover && 'none' }} onMouseOver={() => this.hoverIcon(i)} onMouseLeave={this.handleLeave}>{i.icon}</div>
                                )}
                            </div>
                        </div>

                        <div className='sm-header'>Don't you have an account? <a onClick={this.redirectToSignUp}>Create account</a></div>

                    </div>
                </div>
            </div>
        );
    }
}

export default WithRouter(WithToaster(SignIn));
