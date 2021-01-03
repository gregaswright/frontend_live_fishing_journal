import React from 'react'
import FishContainer from '../Container/FishContainer'
import MoonPhase from '../Component/MoonPhase'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import '../Component/NavigationBar.css'


class NavigationBar extends React.Component {

    state = {
        localFishClick: null,
        localAccountClick: null
    }

    localClickHandler = () => {
        this.setState(prevState => ({
            localFishClick: !prevState.localFishClick
        }))
        console.log(this.state.localFishClick)
        
    }

    localAccountClickHandler = () => {
        this.setState(prevState => ({
            localAccountClick: !prevState.localAccountClick
        }))
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
                        <Nav.Link onClick>My Account</Nav.Link>
                        <Nav.Link href="#home">Log Out</Nav.Link>
                </Navbar.Collapse>
                </Navbar>            
            </div>
            <div>
                {/* <FishContainer localFishClick={this.state.localFishClick}
                localClickHandler={this.localClickHandler}/> */}
            </div>
            </>
            )
    }
}

export default NavigationBar