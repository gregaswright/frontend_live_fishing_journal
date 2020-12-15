import React from 'react'
import FishJournalCard from '../Component/FishJournalCard'
import EditPinForm from '../Component/EditPinForm'
import AddJournalForm from '../Component/AddJournalForm'

class PinCard extends React.Component {

    state = {
        pinClicked: false,
        editClicked: false,
        addJournalClicked: false
    }


    renderJournals = () => {
       let filteredJournals = this.props.journalsAPI.filter(journal => journal.pin_id === this.props.pin.id)
       return filteredJournals.map(journal => <FishJournalCard key={journal.id} journal={journal} deleteJournalEntry={this.props.deleteJournalEntry} editJournalEntry={this.props.editJournalEntry} pinId={this.props.pin.id}/>)
    }

    deletePinClickHandler = () => {
        this.props.deletePinHandler(this.props.pin.id)
    }

    pinClickedHandler = () => {
        this.setState(prevState => ({
            pinClicked: !prevState.pinClicked,
            editClicked: false,
            addJournalClicked: false
        }))
    }

    editPinClickedHandler = () => {
        this.setState(prevState => ({
            editClicked: !prevState.editClicked,
            addJournalClicked: false
        }))
    }

    addJournalClickedHandler = () => {
        this.setState(prevState => ({
            addJournalClicked: !prevState.addJournalClicked,
            editClicked: false
        }))
    }


    render() {
        // console.log(this.props.pin.fish_journals)
        return (
            <div>
                <h2 onClick={this.pinClickedHandler}>{this.props.pin.title}</h2>
                <h3>Latitude: {this.props.pin.latitude}</h3>
                <h3>Longitude: {this.props.pin.longitude}</h3>
                <button onClick={this.addJournalClickedHandler}>Add Fish Journal Entry</button>
                <button onClick={this.editPinClickedHandler}>Edit Pin</button>
                <button onClick={this.deletePinClickHandler}>Delete Pin</button>
                {this.state.addJournalClicked === false ? <></> : <AddJournalForm pin={this.props.pin} addJournalEntry={this.props.addJournalEntry} />}
                {this.state.editClicked === false ? <></> : <EditPinForm pin={this.props.pin} editPin={this.props.editPin} editPinClickedHandler={this.editPinClickedHandler}/>}
                {this.renderJournals === undefined ? <></> : <h5>Number of Entries: {this.renderJournals().length}</h5>}
                {this.state.pinClicked === false ? <></> : this.renderJournals()}
            </div>
        )
    }

}

export default PinCard