import React from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignupForm extends React.Component {
    state = {
        username: "",
        password: "",
        email: "",
        profile_image: ""
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.signupHandler(this.state)
    }

    render(){
        return (

            <Form onSubmit={this.submitHandler}> 
            <Form.Group controlId="formBasicEmail">
                
                <Form.Control type="text" name="username" placeholder="username" value={this.state.username} onChange={this.changeHandler}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                
                <Form.Control type="password" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                
                <Form.Control type="text" name="email" placeholder="email" value={this.state.email} onChange={this.changeHandler} />
            </Form.Group>
            <Form.Group controlId="formBasicImg">
                
                <Form.Control type="text" name="profile_image" placeholder="profile_image" value={this.state.profile_image} onChange={this.changeHandler} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Sign-up
            </Button>
            </Form>   
            // <form onSubmit={this.submitHandler}>
            //     <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.changeHandler}/>
            //     <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler}/>
            //     <input type="text" name="email" placeholder="email" value={this.state.email} onChange={this.changeHandler}/>
            //     <input type="text" name="profile_image" placeholder="profile_image" value={this.state.profile_image} onChange={this.changeHandler}/>
            //     <input type="submit" value="sign up"/>
            // </form>
        )
    }
    
}
export default SignupForm