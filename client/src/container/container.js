import React, { Component } from 'react'
import Modal from '../components/modal/modal'
import classes from './container.module.css'
import Navbar from '../components/AppNavbar/navbar'
import { connect } from 'react-redux'
import SettingsCard from '../components/settingsCard/settingsCard'
import { getUser, logout } from '../actions/userActions'

class Container extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            dropdown: false,
            loginStart: false,
        }
        this.toggleClosed = this.toggleClosed.bind(this);
    }
    componentDidMount() {
        this.props.ongetUser()
    }
    dropdownHandler = () => {
        this.setState({
            dropdown: !this.state.dropdown
        })
    }

    toggleClosed() {
        document.addEventListener('onclick', this.setState({ dropdown: false }))
    }
    modalHandler = () => {
        this.setState({
            show: !this.state.show
        })
    }
    render() {
        return (
            <div>
                <Navbar modalshow={this.modalHandler}
                    pic={this.props.picture}
                    dropdown={this.dropdownHandler}
                    isAuthenticated={this.props.isAuthenticated} />
                {this.state.dropdown ? <SettingsCard pic={this.props.picture} username={this.props.username}
                    logout={this.props.onLogout} /> : null}
                <Modal show={this.state.show}
                    modalType='loginModal'
                    modalClosed={this.modalHandler}>
                    <a className={classes.gBtn} href='/g'>
                        sign In with google
                        </a><br />
                    <a className={classes.gBtn} href='/f'>
                        sign In with facebook
                        </a>
                </Modal>
            </div>
        )
    }
}

const mapStateToPtops = state => ({
    user: state.auth.user,
    picture: state.auth.picture,
    username: state.auth.username,
    isAuthenticated: state.auth.isAuthenticated
})
const mapDispatchToProps = dispatch => {
    return {
        ongetUser: () => dispatch(getUser()),
        onLogout: () => dispatch(logout())
    }
}
export default connect(mapStateToPtops, mapDispatchToProps)(Container)