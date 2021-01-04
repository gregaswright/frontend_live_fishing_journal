import React from 'react'
import LoginForm from '../Component/LoginForm'
import SignupForm from '../Component/SignupForm'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../Container/Auth.css'

class WelcomePage extends React.Component {

    render() {
        return (
            <div className="Landing">
                <Container >
                <Row>
                    <Col md={6}><LoginForm loginHandler={this.props.loginHandler} user={this.props.user}/></Col>
                    
                    <Col md={6}><SignupForm signupHandler={this.props.signupHandler}/></Col>
                </Row>
                <Row>
                    <Col>About Us BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH </Col>
                    <Col>Features: Cool hats</Col>
                    <Col><img src="/fishlogo.png" alt="Fish Logo" width="300" height="400"/></Col>
                </Row>
                </Container>
            </div>
        )
    }
}

export default WelcomePage