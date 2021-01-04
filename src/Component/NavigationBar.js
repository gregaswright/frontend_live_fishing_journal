import React from 'react'
import ProfileCard from '../Component/ProfileCard'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import '../Component/NavigationBar.css'


class NavigationBar extends React.Component {

    state = {
        localFishClick: null,
        localAccountClick: null
    }

    localFishClickHandler = () => {
        this.setState(prevState => ({
            localFishClick: !prevState.localFishClick
        }))
        console.log(this.state.localFishClick)    
    }

    localAccountClickHandler = () => {
        this.setState(prevState => ({
            localAccountClick: !prevState.localAccountClick
        }))
        console.log(this.state.localAccountClick)
    }

    render() {
        return (
            <>
            <div className="NavDiv">
                <Navbar className="Nav"  expand="lg">
                {/* <Navbar.Brand>LiveFishingJournal</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    
                        {this.props.user && <h6>Hello, {this.props.user.username}!</h6>}
                        <Nav.Link onClick={this.localAccountClickHandler}>My Account</Nav.Link>
                        <Nav.Link onClick={this.props.logOutHandler}>Log Out</Nav.Link>
                </Navbar.Collapse>
                </Navbar>            
            </div>
            <div>
                <ProfileCard 
                    user={this.props.user} 
                    localAccountClick={this.state.localAccountClick} localAccountClickHandler={this.localAccountClickHandler}
                    editAccountHandler={this.props.editAccountHandler}
                />
            </div>
            </>
            )
    }
}

export default NavigationBar