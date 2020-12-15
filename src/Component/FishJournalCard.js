import React from 'react'
import EditJournalForm from '../Component/EditJournalForm'

class FishJournalCard extends React.Component {

    state = {
        editJournalClicked: false
    }

    deleteJournalEntryClickHandler = () => {
        this.props.deleteJournalEntry(this.props.journal.id)
    }


    editJournalEntryClickHandler = () => {
        this.setState(prevState => ({
            editJournalClicked: !prevState.editJournalClicked
        }))
    }

    render() {
        return(
            <>
                <h3>{this.props.journal.fish_type}</h3>
                <h4>{this.props.journal.image}</h4>
                <h4>Date Caught: {this.props.journal.date}</h4>
                <h4>Fish Length: {this.props.journal.fish_length}</h4>
                <h4>Fish Weight: {this.props.journal.fish_weight}</h4>
                <h4>Notes: {this.props.journal.note}</h4>
                <h4>Rod Setup: {this.props.journal.rod_setup}</h4>
                <h4>Moon Phase: {this.props.journal.moon_phase}</h4>
                <h4>Tide: {this.props.journal.tide}</h4>
                <button onClick={this.editJournalEntryClickHandler}>Edit Journal Entry</button>
                <button onClick={this.deleteJournalEntryClickHandler}>Delete Journal Entry</button>
                {this.state.editJournalClicked === false ? <></> : <EditJournalForm editJournalEntry={this.props.editJournalEntry} journal={this.props.journal} pinId={this.props.pinId}/>}
            </>
        )
    }
}

export default FishJournalCard