import React, { Component } from 'react'
import login from '../image/jpg/login.jpeg'
import WithRouter from '../navigate/WithRouter'
import { auth, provider, signInWithPopup, signOut } from '../firebase/FireBase'
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";



class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            fName: '',
            lName: '',
            eMail: '',
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
        }
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

        this.setState({ eMail: e?.target?.value || e })
        if (this.state.fName === '') {
            this.setState({ fNameError: 'Enter name' })
        }
        else {
            this.setState({ fNameError: '' })
        }
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
        this.handleEmail(this.state.eMail);
    }

    handleCheckbox = (e) => {
        if (e.target.checked) {
            this.setState({ checkError: '', isChecked: true })
        }
        else {
            this.setState({ checkError: 'Accept the policies' })
        }
    }

    handleCreateAccount = () => {
        let { isName, isEmail, isChecked, isPassword } = false;
        if (this.state.fName) {
            this.setState({ fNameError: '' })
            isName = true;
        }
        else {
            this.setState({ fNameError: 'Enter the name', })

        }
        if (this.state.eMail) {
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
        if (this.state.isChecked) {
            this.setState({ checkError: '' })
            isChecked = true;
        }
        else {
            this.setState({ checkError: 'Accept the policies' })
        }
        if (this.state.isSignup ? isName && isEmail && isChecked && isPassword : isEmail && isPassword) {
            this.props.navigate('/dashboard');
        }
        else {


        }
    }
    switchLogin = () => {
        this.setState({ isSignup: this.state.isSignup ? false : true })
    }
    render() {

        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    backgroundColor: "#3e394b",
                }}
            >
                {/* Card Container */}
                <div
                    style={{
                        display: "flex",
                        width: "900px",
                        backgroundColor: "#0d0131",
                        borderRadius: "20px",
                        overflow: "hidden",
                        height: '610px'
                    }}
                >
                    {/* Image Section */}
                    <div
                        style={{
                            width: "50%",
                            height: "100%",
                            position: "relative",

                        }}
                    >
                        <img
                            src={login}
                            alt="Login"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: 'block',

                            }}
                        />
                    </div>

                    {/* Signup Form Section */}
                    <div
                        style={{
                            width: "50%",
                            padding: "40px",
                            color: "white",
                        }}
                    >
                        <h1 style={{ marginBottom: "20px" }}>{this.state.isSignup ? 'Create an account' : 'Login'}</h1>
                        {this.state.isSignup && <p style={{ marginBottom: "10px" }}>
                            Already have an account? <span style={{ color: "#a586ff", textDecoration: 'underline', cursor: 'pointer' }} onClick={this.switchLogin}>Log in</span>
                        </p>}

                        {this.state.isSignup &&
                            <div>
                                <input value={this.state.fName} onChange={this.handleFName} maxLength={12} minLength={12} type="text" placeholder="First Name" style={{ borderRadius: '7px', border: this.state.fNameError ? '0.5px solid red' : 'none', outline: 'none', margin: '7px', height: '40px', width: '40%', padding: '0px 12px', backgroundColor: '#3e394b', color: '#FFF' }} />


                                <input value={this.state.lName} onChange={this.handleLName} maxLength={12} minLength={12} type="text" placeholder="Last Name" style={{ borderRadius: '7px', border: 'none', outline: 'none', margin: '7px', height: '40px', width: '40%', padding: '0px 12px', backgroundColor: '#3e394b', color: '#FFF' }} />
                            </div>}
                        {this.state.isSignup && this.state.fNameError && <span style={{ fontSize: '12px', color: 'red' }}>{this.state.fNameError}</span>}
                        <input value={this.state.eMail} onChange={this.handleEmail} maxLength={75} minLength={12} type="email" placeholder="Email" style={{ borderRadius: '7px', border: this.state.emailError ? '0.5px solid red' : 'none', outline: 'none', margin: '7px', height: '40px', width: '89%', padding: '0px 12px', backgroundColor: '#3e394b', color: '#FFF' }} />
                        {this.state.emailError && <span style={{ fontSize: '12px', color: 'red' }}>{this.state.emailError}</span>}
                        <input value={this.state.password} onChange={this.handlePassword} maxLength={16} minLength={12} type={this.state.isHide ? 'password' : "text"} placeholder="Enter your password" style={{ borderRadius: '7px', border: this.state.passwordError ? '0.5px solid red' : 'none', outline: 'none', margin: '7px', height: '40px', width: '89%', padding: '0px 12px', backgroundColor: '#3e394b', color: '#FFF', }} />
                        {this.state.isHide ? <IoMdEye onClick={() => {
                            this.setState({
                                isHide: this.state.isHide ? false : true
                            })
                        }} style={{ position: 'relative', bottom: 37, left: 362 }} />
                            :
                            <FaEyeSlash onClick={() => {
                                this.setState({
                                    isHide: this.state.isHide ? false : true
                                })
                            }} style={{ position: 'relative', bottom: 37, left: 362 }} />}
                        {this.state.passwordError && <span style={{ fontSize: '12px', color: 'red' }}>{this.state.passwordError}</span>}
                        <div style={{ margin: '0px 7px' }} >


                            <label style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input onClick={this.handleCheckbox} type='checkbox' style={{ width: '16px', height: '16px', backgroundColor: '#3e394b' }} />
                                {this.state.isSignup ? 'Accept terms and condition' : 'Remember me'}
                            </label>
                        </div>
                        {this.state.isSignup && this.state.checkError && <span style={{ fontSize: '12px', color: 'red' }}>{this.state.checkError}</span>}
                        <div style={{ height: '16px' }} />
                        <button onClick={this.handleCreateAccount} style={{ borderRadius: '7px', border: 'none', margin: '12px', height: '40px', width: '94%', padding: '0px 12px', backgroundColor: 'blue' }}>{this.state.isSignup ? 'Create Account' : 'Login'}</button>

                        {!this.state.isSignup &&
                            <div>
                                <p style={{ margin: "20px 15px" }}>
                                    Don't have an account? <span style={{ color: "#a586ff", textDecoration: 'underline', cursor: 'pointer' }} onClick={this.switchLogin}>Create Account</span>
                                </p>
                            </div>
                        }
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', margin: '16px 0px' }}>
                            <div style={{ height: '1px', width: '30%', background: 'yellow' }} />
                            <div>
                                or register with
                            </div>
                            <div style={{ height: '1px', width: '30%', background: 'yellow' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <FcGoogle size={40} onClick={this.handleGoogleLogin} />
                            <FaFacebook color='blue' size={34} />
                            <FaXTwitter size={34} />

                        </div>


                    </div>
                </div>
            </div>



        )
    }
}

export default WithRouter(Login);
