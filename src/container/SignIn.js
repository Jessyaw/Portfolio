import React from 'react'
import WithRouter from '../context/WithRouter'
import { auth, provider, signInWithPopup, signOut } from '../firebase/FireBase'
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

class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            fName: '',
            lName: '',
            email: '',
            password: '',
            emailError: '',
            fNameError: '',
            lNameError: '',
            passwordError: '',
            isHide: true,
            isChecked: false,
            checkError: '',
            isLogin: false,
            isSignup: false,
            socialIcons: [
                { id: 1, icon: <FcGoogle size={20} />, bgcolor: Color.whiteFont, isHover: false, hoverColor: Color.whiteFont },
                { id: 2, icon: <FaFacebook size={20} />, bgcolor: Color.whiteFont, isHover: false, hoverColor: Color.whiteFont },
                { id: 3, icon: <FaXTwitter size={20} />, bgcolor: Color.whiteFont, isHover: false, hoverColor: Color.whiteFont },
                { id: 4, icon: <BsLinkedin size={20} />, bgcolor: Color.whiteFont, isHover: false, hoverColor: Color.whiteFont },
                { id: 5, icon: <BsMicrosoft size={20} />, bgcolor: Color.whiteFont, isHover: false, hoverColor: Color.whiteFont },
                { id: 6, icon: <BsApple size={20} />, bgcolor: Color.whiteFont, isHover: false, hoverColor: Color.whiteFont },
            ],
            successMessage: '',
            failureMessage: '',
            verifying: false,
            error: {},
        }
    }

    componentDidMount() {
        document.body.style.backgroundColor = '#ffffff80';
    }
    componentWillUnmount() {
        document.body.style.backgroundColor = '';
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
    handleFName = (e) => {

        if (/^[A-Za-z]*$/.test(e.target.value)) {
            this.setState({ fName: e.target.value, fNameError: '' })
        }
    }
    handleLName = (e) => {

        if (/^[A-Za-z]*$/.test(e.target.value)) {
            this.setState({ lName: e.target.value })
        }
        else {

        }
    }


    handleSignIn = () => {
        let { isEmail, isPassword } = this.state;
        const fields = { isEmail, isPassword }

        let errors = {};

        Object.keys(fields).forEach(field => {
            const error = ValidateField(field, fields[field]);
            if (error) errors[field] = error;
        });

        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            let mailToVerify = {
                fullName: '',
                email: this.state.email,
                password: this.state.password,
                confirmPassword: '',
                roleID: '',
                role: '',
                isEmailVerified: 0,
                EmailVerificationToken: ''
            }
            this.handleCheckMailVerified(mailToVerify);
            this.setState({
                verifying: true
            })
        }
    }
    handleCheckMailVerified = async (data) => {
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/CheckEmailVerified`, 'POST', data);

            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.handleLogin(data);
            }
            else {
                this.props.toast.show('F', json.message);
                this.handleSendMailToVerify(data);
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
                this.props.navigate('/email-sent')
            }
            else {
                this.props.toast.show('F', json.message);
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
                this.handleStoreUserData(json.data.ID);
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

        }
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
                <div className='signin-card-container'>
                    <div className='signin-card'>
                        <div>MINI CRM</div>
                        <div>
                            <div className='md-header'>Sign in</div>
                        </div>
                        <div className='inpt-container'>
                            <div className='inpt-container' style={{ gap: '7px' }}>
                                <input className='inpt-login' placeholder='Email' onChange={(e) => this.handleChange('email', e.target.value)} value={this.state.email} />
                                {this.state.error.email && <span className='field-error'>{this.state.error.email}</span>}
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
                                {this.state.error.password && <span className='field-error'>{this.state.error.password}</span>}
                            </div>
                            <div className='sm-header' style={{ fontSize: '0.9rem', color: Color.grey, cursor: 'pointer' }}>Forget password?</div>
                            <button className='btn-login' onClick={this.handleSignIn}>{this.state.verifying ? 'Email verifying...' : 'Here we go'}</button>
                        </div>
                        <div>
                            <div className='nor-header'>Sign in with</div>
                            <div className='icon-conatainer'>
                                {this.state.socialIcons.map(i =>
                                    <div className='social-icons' style={{ backgroundColor: i.isHover ? i.hoverColor : i.bgcolor, boxShadow: i.isHover && 'none' }} onMouseOver={() => this.hoverIcon(i)} onMouseLeave={this.handleLeave}>{i.icon}</div>
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
