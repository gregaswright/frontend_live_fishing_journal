import React from 'react'
import LoginForm from '../Component/LoginForm'
import SignupForm from '../Component/SignupForm'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../Container/Auth.css'
import Modal from 'react-modal'

class WelcomePage extends React.Component {

    render() {
        return (
        <div className="MainContainer">
            <Modal 
                isOpen={true}
                className="Left"
                overlayClassName="Overlay"
                >
            </Modal>
            <Modal 
                isOpen={true}
                className="Right"
                overlayClassName="Overlay"
                >
            </Modal>
            <div>
                <h1 className="Title">NorthAtlanticFishingJournal.com </h1>
            </div>
            <div className="Landing">
                <Container >
                <Row>
                    <Col md={6}><LoginForm loginHandler={this.props.loginHandler} user={this.props.user}/></Col>
                    
                    <Col md={6}><SignupForm signupHandler={this.props.signupHandler}/></Col>
                </Row>
                <Row>
                    <Col md={6}>About Us: North Atlantic Fishing Journal is an app created by and for fishermen who fish the North Atlantic Ocean. We have always loved fishing here at North Atlantic Fishing Journal and we know that a big part of becoming a better fisherman is keeping a journal. Traditionally a fisherman might keep a notebook where a fisherman would log where they caught a fish and the details on that catch. Here at North Atlantic Fishing Journal we have set out to streamline that process by giving fishermen a digital fishing journal where all of their journal entries are seen as pins on a map, with each pin holding all the details that a fisherman might want.  </Col>
                    <Col md={6}><img src="/fishlogo.png" alt="Fish Logo" width="300" height="400"/></Col>
                </Row>
                </Container>
            </div>
        </div>
        
        )
    }
}

export default WelcomePage