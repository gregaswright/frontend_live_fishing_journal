import React from "react"

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
            <form onSubmit={this.submitHandler}>
                <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.changeHandler}/>
                <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler}/>
                <input type="text" name="email" placeholder="email" value={this.state.email} onChange={this.changeHandler}/>
                <input type="text" name="profile_image" placeholder="profile_image" value={this.state.profile_image} onChange={this.changeHandler}/>
                <input type="submit" value="sign up"/>
            </form>
        )
    }
    
}
export default SignupForm