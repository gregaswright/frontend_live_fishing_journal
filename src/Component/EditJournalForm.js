import React from 'react'

class EditJournalForm extends React.Component {

    state = {
        date: "",
        fish_type: "",
        fish_length: "",
        fish_weight: "",
        moon_phase: "",
        tide: "",
        rod_setup: "",
        note: "",
        image: "",
        pin_id: this.props.pinId
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.editJournalEntry(this.state, this.props.journal.id)
    }

    render(){
        return (
            <form onSubmit={this.submitHandler}>
                <input type="number" name="date" placeholder="date" value={this.state.date} onChange={this.changeHandler}/>
                <input type="text" name="fish_type" placeholder="fish_type" value={this.state.fish_type} onChange={this.changeHandler}/>
                <input type="number" name="fish_length" placeholder="fish_length" value={this.state.fish_length} onChange={this.changeHandler}/>
                <input type="number" name="fish_weight" placeholder="fish_weight" value={this.state.fish_weight} onChange={this.changeHandler}/>
                <input type="text" name="moon_phase" placeholder="moon_phase" value={this.state.moon_phase} onChange={this.changeHandler}/>
                <input type="text" name="tide" placeholder="tide" value={this.state.tide} onChange={this.changeHandler}/>
                <input type="text" name="rod_setup" placeholder="rod_setup" value={this.state.rod_setup} onChange={this.changeHandler}/>
                <input type="text" name="note" placeholder="note" value={this.state.note} onChange={this.changeHandler}/>
                <input type="text" name="image" placeholder="image" value={this.state.image} onChange={this.changeHandler}/>
                <input type="submit" value="Edit Entry"/>
            </form>
        )
    }

}

export default EditJournalForm