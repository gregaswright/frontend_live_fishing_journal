import React from 'react'
import { Route, withRouter, Redirect } from 'react-router'
import WelcomePage from '../Component/WelcomePage'
import NavigationBar from '../Component/NavigationBar'
import MapContainer from '../Container/MapContainer'
import '../Container/Auth.css'

class AuthContainer extends React.Component {

    state = {
        user: null
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
            user: null,
            editProfileClicked: false
        }, () => this.props.history.push("/welcome"))
    }

    renderLogoutViewProfile = () => {
        return (
        <>
            <button onClick={this.viewProfileClickHandler}>View Profile</button> 
            <button onClick={this.logOutHandler}>Log Out</button> 
        </>
        )
    }

    render() {
        console.log(this.state.user)
        
        return (
            <div>
                {this.state.user && 
                <NavigationBar
                    logOutHandler={this.logOutHandler}
                    user={this.state.user}
                    editAccountHandler={this.editAccountHandler}
                />}
                <Route 
                    exact path="/" 
                    render={() => {
                        return (
                            this.state.user ? 
                            <Redirect to="/map" /> :
                            <Redirect to="/welcome" />
                        )
                    }}
                />
                <Route 
                    path="/map" 
                    render={() => {
                        return (
                            this.state.user ?
                            <MapContainer user={this.state.user}/>:
                            <Redirect to="/welcome"/>
                        )
                    }}
                />
                <Route 
                    path="/welcome" 
                    render={() => {
                        return (
                            !this.state.user ?
                            <WelcomePage loginHandler={this.loginHandler} signupHandler={this.signupHandler} user={this.state.user}/> :
                            <Redirect to="/map"/>
                        )
                    }} 
                />
            </div>
        )
    }
}

export default withRouter(AuthContainer)