import React from 'react'

class AddPinForm extends React.Component {
    state = {
        title: "",
        latitude: this.props.latLng.lat,
        longitude: this.props.latLng.lng,
        user_id: this.props.user.id,
        fish_journals: [],
        date: "",
        fish_type: "",
        fish_length: "",
        fish_weight: "",
        moon_phase: "",
        tide: "",
        rod_setup: "",
        note: "",
        image: "",
        pin_id: ""
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.addPin(this.state)
        this.props.closeForm()
        // this.props.addJournalEntry(this.state)
    }

    render(){
        return (
            <form onSubmit={this.submitHandler}>
                <input type="text" name="title" placeholder="pin title" value={this.state.title} onChange={this.changeHandler}/>
                <input type="number" name="date" placeholder="date" value={this.state.date} onChange={this.changeHandler}/>
                <input type="text" name="fish_type" placeholder="fish_type" value={this.state.fish_type} onChange={this.changeHandler}/>
                <input type="number" name="fish_length" placeholder="fish_length" value={this.state.fish_length} onChange={this.changeHandler}/>
                <input type="number" name="fish_weight" placeholder="fish_weight" value={this.state.fish_weight} onChange={this.changeHandler}/>
                <input type="text" name="moon_phase" placeholder="moon_phase" value={this.state.moon_phase} onChange={this.changeHandler}/>
                <input type="text" name="tide" placeholder="tide" value={this.state.tide} onChange={this.changeHandler}/>
                <input type="text" name="rod_setup" placeholder="rod_setup" value={this.state.rod_setup} onChange={this.changeHandler}/>
                <input type="text" name="note" placeholder="note" value={this.state.note} onChange={this.changeHandler}/>
                <input type="text" name="image" placeholder="image" value={this.state.image} onChange={this.changeHandler}/>
                <input type="submit" value="Add Pin"/>
            </form>
        )
    }
}

export default AddPinForm