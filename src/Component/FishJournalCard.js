import React from 'react'
import EditJournalForm from '../Component/EditJournalForm'
import Button from 'react-bootstrap/Button'
import '../Component/FishJournalCard.css'

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
            <div className="JournalCard">
                <hr/>
                <h3 className="CardHeader">{this.props.journal.fish_type}</h3>
                <h5>{this.props.journal.image}</h5>
                <h5>Date Caught: {this.props.journal.date}</h5>
                <h5>Fish Length: {this.props.journal.fish_length}</h5>
                <h5>Fish Weight: {this.props.journal.fish_weight}</h5>
                <h5>Notes: {this.props.journal.note}</h5>
                <h5>Rod Setup: {this.props.journal.rod_setup}</h5>
                <h5>Moon Phase: {this.props.journal.moon_phase}</h5>
                <h5>Tide: {this.props.journal.tide}</h5>
                <Button onClick={this.editJournalEntryClickHandler} style={{ color: "white", background: "#8ac0c4", borderColor: "#8ac0c4" }}>Edit Journal Entry</Button>
                <div className="Divider"/>
                <Button onClick={this.deleteJournalEntryClickHandler} style={{ color: "white", background: "#8ac0c4", borderColor: "#8ac0c4" }}>Delete Journal Entry</Button>
                {this.state.editJournalClicked === false ? <></> : <EditJournalForm editJournalEntry={this.props.editJournalEntry} journal={this.props.journal} pinId={this.props.pinId}/>}
            </div>
        )
    }
}

export default FishJournalCard