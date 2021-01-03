import React from 'react'
import { Route, withRouter, Redirect } from 'react-router'
import LoginForm from '../Component/LoginForm'
import SignupForm from '../Component/SignupForm'
import ProfileCard from '../Component/ProfileCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../Container/Auth.css'

class AuthContainer extends React.Component {

    state = {
        user: null,
        editProfileClicked: false,
        viewProfileClicked: false
    }

    sendUser = () => {
        return (
            this.props.pullCurrentUser(this.state.user)
        )
    }

    componentDidMount(){
        const token = localStorage.getItem("token")
        if (token) {
            fetch("http://localhost:3000/api/v1/profile", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        })
            .then(resp => resp.json())
            .then(data => { 
                this.setState({ user: data.user })
                this.props.pullCurrentUser(this.state.user)
            })
        } 
    }
    

    loginHandler = (userInfo) => {
        fetch('http://localhost:3000/api/v1/login', {
            method: 'POST',
            headers: {
            'Accepts': 'application/json',
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({ user: userInfo}),
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("token", data.jwt)
            this.setState({ user: data.user }, () => this.props.history.push("/map"))
            this.props.pullCurrentUser(this.state.user)
        })
    }

    signupHandler = (userObj) => {
        fetch('http://localhost:3000/api/v1/users', {
            method: 'POST',
            headers: {
            'Accepts': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: userObj}),
        })
        .then(response => response.json())
        .then(userData => {
            localStorage.setItem("token", userData.jwt)
            this.setState({ user: userData.user }, () => this.props.history.push("/map"))
        })
    }

    deleteAccountHandler = (userId) => {
        fetch(`http://localhost:3000/api/v1/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
          },
        })
        .then(response => response.json())
        .then(localStorage.removeItem("token"),
            this.setState ({user: []}))
    }

    editAccountHandler = (userId, updateData) => {
        console.log(userId)
        console.log(updateData)
        fetch(`http://localhost:3000/api/v1/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    email: updateData.email,
                    profile_image: updateData.profile_image
                }
            }),
        })
        .then(response => response.json())
        .then(data => {
            this.setState({ user: {
                email: data.user.email,
                profile_image: data.user.profile_image
            }})})
        .catch(console.log)
    }

    logOutHandler = () => {
        localStorage.removeItem("token")
        this.setState ({
            user: [],
            editProfileClicked: false
        })
        this.props.clearUser()
    }

    editClickHandler = () => {
        this.setState(prevState => ({
            editProfileClicked: !prevState.editProfileClicked
        }))
    }


    viewProfileClickHandler = () => {
        this.setState(prevState => ({
            editProfileClicked: false,
            viewProfileClicked: !prevState.viewProfileClicked
        }))
    }
   

    renderLoginSignup = () => {
        return (
            <>
                <LoginForm loginHandler={this.loginHandler}/>
                <SignupForm signupHandler={this.signupHandler}/>
            </>
        )
    }

    renderLogoutViewProfile = () => {
        return (
        <>
            <button onClick={this.viewProfileClickHandler}>View Profile</button> 
            <button onClick={this.logOutHandler}>Log Out</button> 
        </>
        )
    }

    checkForUser = () => {
        return (this.state.user && <Redirect to="/map" />)
    }

    render() {
        console.log(this.state.user)
        
        return (
            <div className="Landing">
                {/* {this.checkForUser()} */}

                <Container >
                <Row>
                    <Col md={6}><LoginForm loginHandler={this.loginHandler} user={this.state.user}/></Col>
                    
                    <Col md={6}><SignupForm signupHandler={this.signupHandler}/></Col>
                </Row>
                <Row>
                    <Col>About Us BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH </Col>
                    <Col>Features: Cool hats</Col>
                    <Col><img src="/fishlogo.png" alt="Fish Logo" width="300" height="400"/></Col>
                </Row>
                </Container>
                {/* { this.state.user.length === 0 ? this.renderLoginSignup() :
                this.renderLogoutViewProfile() }
                { this.state.viewProfileClicked === true ? <ProfileCard editAccountHandler={this.editAccountHandler} deleteAccountHandler={this.deleteAccountHandler} user={this.state.user} editClickHandler={this.editClickHandler} editProfileClickedState={this.state.editProfileClicked} /> :
                <></>} */}
            </div>
        )
    }
}

export default withRouter(AuthContainer)