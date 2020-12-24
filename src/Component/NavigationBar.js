import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'


class NavigationBar extends React.Component {

    localClickHandler = () => {
        console.log('hello')
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand>LiveFishingJournal</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link onClick={this.localClickHandler}>Local Fish</Nav.Link>
                    <Nav.Link href="#link">Local Shops</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>            
        )
    }
}

export default NavigationBar