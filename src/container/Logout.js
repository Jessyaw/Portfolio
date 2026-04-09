import React from 'react'
import login from '../image/jpg/login.jpeg'
import WithRouter from '../context/WithRouter'
import { auth, provider, signInWithPopup, signOut } from '../firebase/FireBase'
import DeletePopup from '../component/DeletePopup'
import SignIn from './SignIn';
import SignUp from './SignUp';
import Overlay from './Overlay';



class Logout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        sessionStorage.getItem("Name");
        document.body.style.backgroundColor = '#FFF';
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

    closeMenu = () => {
        this.setState({
            isDelete: false
        })
    }

    deleteUser = (v, id) => {
        sessionStorage.removeItem();
    }
    switchLogin = () => {
        this.setState({ isSignup: this.state.isSignup ? false : true })
    }
    render() {
        return (
            <div >
                {this.state.isDelete && <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', zIndex: 100 }}>
                    <DeletePopup
                        onClose={this.closeMenu}
                        item={this.state.itemToBedelete}
                        onDelete={(v, id) => { this.deleteUser(v, id) }}
                        ID={this.state.deleteID}
                        message={'Are you sure you want to Logout?'}
                    />
                </div>}
            </div>
        )
    }
}

export default WithRouter(Logout);
