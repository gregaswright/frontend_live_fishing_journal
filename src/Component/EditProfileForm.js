import React from "react"

class editProfileForm extends React.Component {
    state = {
        email: this.props.user.email,
        profile_image: this.props.user.profile_image
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.editAccountHandler(this.props.user.id, this.state)
    }

    render(){
        return (
            <form onSubmit={this.submitHandler}>
                <input type="text" name="email" placeholder="email" value={this.state.email} onChange={this.changeHandler}/>
                <input type="text" name="profile_image" placeholder="profile_image" value={this.state.profile_image} onChange={this.changeHandler}/>
                <input type="submit" value="Edit One or Both Fields"/>
            </form>
        )
    }
    
}
export default editProfileForm