import React from 'react'

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
            <form onSubmit={this.submitHandler}>
                <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.changeHandler}/>
                <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler}/>
                <input type="submit" value="log in"/>
            </form>
        )
    }
    
}
export default LoginForm