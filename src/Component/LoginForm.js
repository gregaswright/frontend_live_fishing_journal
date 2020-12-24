import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
    }

    render(){
        return (

        <div>
            <Form onSubmit={this.submitHandler}>
            <Form.Group controlId="formBasicEmail">
                
                <Form.Control type="text" name="username" placeholder="Enter User Name" value={this.state.username} onChange={this.changeHandler}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
               
                <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Log-in
            </Button>
            </Form>           
        </div>
            // <form onSubmit={this.submitHandler}>
            //     <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.changeHandler}/>
            //     <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler}/>
            //     <input type="submit" value="log in"/>
            // </form>
        )
    }
    
}
export default LoginForm