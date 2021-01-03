import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Redirect from 'react-router-dom'

class LoginForm extends React.Component {

    state = {
        username: "",
        password: ""
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.loginHandler(this.state)
        // {this.props.user ? <Redirect to="/map" /> : }
    }

    render(){
        return (

        <div>
            <Form onSubmit={this.submitHandler}>
            <Form.Group >
                
                <Form.Control type="text" name="username" placeholder="Enter User Name" value={this.state.username} onChange={this.changeHandler}/>
            </Form.Group>
            <Form.Group >
               
                <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Log-in
            </Button>
            </Form>           
        </div>
         
        )
    }
    
}
export default LoginForm