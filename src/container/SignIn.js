import React from 'react'
import login from '../image/jpg/login.jpeg'
import WithRouter from '../context/WithRouter'
import { auth, provider, signInWithPopup, signOut } from '../firebase/FireBase'
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { BsApple, BsLinkedin } from 'react-icons/bs';
import { BsMicrosoft } from 'react-icons/bs';
import { GrAppleMusic } from 'react-icons/gr';
import { IoMdEye } from "react-icons/io";
import { Color } from '../Colors';
import { FaRegEye, FaRegEyeSlash, FaXTwitter } from "react-icons/fa6";
import { ApiUrl } from '../Api';
import Toaster from '../component/Toaster';
import WithToaster from '../context/WithToaster';


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

    handleEmail = (e) => {

        this.setState({ email: e?.target?.value })

        if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e?.target?.value || e)) {
            this.setState({ emailError: '' })
        }
        else {
            this.setState({ emailError: 'Enter valid email' })
        }
    }
    handlePassword = (e) => {
        this.setState({ password: e.target.value })
        if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(e.target.value))) {
            this.setState({ passwordError: 'Password must be at least 8 characters long, contain uppercase, lowercase, a number, and a special character."' })
        }
        else {
            this.setState({ passwordError: '' })
        }
        this.handleEmail(this.state.email);
    }

    handleCheckbox = (e) => {
        if (e.target.checked) {
            this.setState({ checkError: '', isChecked: true })
        }
        else {
            this.setState({ checkError: 'Accept the policies' })
        }
    }

    handleSignIn = () => {
        let { isName, isEmail, isPassword } = false;
        if (this.state.fName) {
            this.setState({ fNameError: '' })
            isName = true;
        }
        else {
            this.setState({ fNameError: 'Enter the name', })

        }
        if (this.state.email) {
            this.setState({ emailError: '' })
            isEmail = true;
        }
        else {

            this.setState({ emailError: 'Enter a email', })
        }
        if (this.state.password) {
            this.setState({ passwordError: '' })
            isPassword = true;
        }
        else {

            this.setState({ passwordError: 'Enter password' })
        }

        if (isEmail && isPassword) {
            let mailToVerify = {
                fullName: '',
                email: this.state.email,
                password: '',
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
        else {


        }
    }
    handleCheckMailVerified = async (mailToVerify) => {
        let data = {
            fullName: '',
            email: this.state.email,
            password: this.state.password,
            confirmPassword: '',
            roleID: '',
            role: '',
            isEmailVerified: 0,
            EmailVerificationToken: ''
        }
        await fetch(`${ApiUrl.url}/CRM/CheckEmailVerified`, {
            headers: {
                'Content-Type': 'Application/Json'
            },
            method: 'POST',
            body: JSON.stringify(mailToVerify)
        }).then(res => res.json()).then(json => {
            if (json.status == 'S') {
                this.setState({
                    successMessage: json.message,
                })
                this.handleLogin(data);
            }
            else {
                this.setState({
                    failureMessage: json.message,
                })
                this.handleSendMailToVerify(mailToVerify);

                this.props.navigate('/email-sent');
            }
        });
    }
    handleSendMailToVerify = async (mailToVerify) => {

        await fetch(`${ApiUrl.url}/CRM/sendMailToLoginUser`, {
            headers: {
                'Content-Type': 'Application/Json'
            },
            method: 'POST',
            body: JSON.stringify(mailToVerify)
        }).then().then();
    }

    handleLogin = async (data) => {
        await fetch(`${ApiUrl.url}/CRM/LoginUser`, {
            headers: {
                'Content-Type': 'Application/Json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => res.json()).then(json => {
            if (json.status == 'S') {
                this.setState({
                    successMessage: json.message,
                })
                sessionStorage.setItem("UserID", json.data.ID);
                sessionStorage.setItem("Name", json.data.Name);
                sessionStorage.setItem("Email", json.data.Email);
                sessionStorage.setItem("RoleID", json.data.RoleID);
                this.props.navigate('/crm');
            }
            else {
                this.setState({
                    failureMessage: json.message,
                })
            }
        });
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
                                <input className='inpt-login' placeholder='Work Email' onChange={this.handleEmail} value={this.state.email} />
                                {this.state.emailError && <span className='field-error'>{this.state.emailError}</span>}
                            </div>
                            <div className='inpt-container' style={{ gap: '7px', }}>
                                <div style={{ position: 'relative', width: '100%', }}>
                                    {this.state.isPWVisible ?
                                        <FaRegEye
                                            onClick={() => this.setState({ isPWVisible: false })}
                                            color={Color.blackFont}
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                right: '16px',
                                                transform: 'translateY(-50%)',
                                                //  pointerEvents: 'none',
                                            }} />
                                        :
                                        <FaRegEyeSlash
                                            onClick={() => this.setState({ isPWVisible: true })}
                                            color={Color.grey}
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                right: '16px',
                                                transform: 'translateY(-50%)',
                                                // pointerEvents: 'none',
                                            }} />}

                                    <input
                                        type={this.state.isPWVisible ? 'text' : 'password'}
                                        onCopy={(e) => e.preventDefault()}
                                        onPaste={(e) => e.preventDefault()}
                                        onCut={(e) => e.preventDefault()}
                                        onContextMenu={(e) => e.preventDefault()}
                                        className='inpt-login'
                                        placeholder='Password'
                                        maxLength={25}
                                        onChange={this.handlePassword}
                                        value={this.state.password}
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </div>
                                {this.state.passwordError && <span className='field-error'>{this.state.passwordError}</span>}
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
