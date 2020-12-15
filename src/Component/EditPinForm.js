import React from 'react'

class EditPinForm extends React.Component {
    state = {
        title: "",
        latitude: "",
        longitude: "",
        user_id: this.props.pin.user_id
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.editPin(this.state, this.props.pin.id)
        this.props.editPinClickedHandler()
    }

    render(){
        return (
            <form onSubmit={this.submitHandler}>
                <input type="text" name="title" placeholder="title" value={this.state.title} onChange={this.changeHandler}/>
                <input type="latitude" name="latitude" placeholder="latitude" value={this.state.latitude} onChange={this.changeHandler}/>
                <input type="text" name="longitude" placeholder="longitude" value={this.state.longitude} onChange={this.changeHandler}/>
                <input type="submit" value="Edit Journal Pin"/>
            </form>
        )
    }
}

export default EditPinForm