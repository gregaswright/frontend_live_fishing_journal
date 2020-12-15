import React from 'react'

class EditPinForm extends React.Component {
    state = {
        title: "",
        latitude: "",
        longitude: "",
        user_id: this.props.user.id
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.addPin(this.state)
    }

    render(){
        return (
            <form onSubmit={this.submitHandler}>
                <input type="text" name="title" placeholder="title" value={this.state.title} onChange={this.changeHandler}/>
                <input type="latitude" name="latitude" placeholder="latitude" value={this.state.latitude} onChange={this.changeHandler}/>
                <input type="text" name="longitude" placeholder="longitude" value={this.state.longitude} onChange={this.changeHandler}/>
                <input type="submit" value="Add Journal Pin"/>
            </form>
        )
    }
}

export default EditPinForm