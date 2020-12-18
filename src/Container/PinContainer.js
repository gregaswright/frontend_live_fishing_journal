import React from 'react'
import PinCard from '../Component/PinCard'
import AddPinForm from '../Component/AddPinForm'

class PinContainer extends React.Component {

    state = {
        pinAPI: [],
        fishJournalAPI: [],
        myPinsClicked: false,
        addPinClicked: false
    }

    componentDidMount() {
        Promise.all([
            fetch('http://localhost:3000/api/v1/pins/').then(res => res.json()),
            fetch('http://localhost:3000/api/v1/fish_journals/').then(res => res.json())
        ]).then(([pinData, fishJournalData]) => {
            this.setState({
                pinAPI: pinData,
                fishJournalAPI: fishJournalData
            });
        })
    }

    addPin = (newPinObj) => {
        console.log(newPinObj)
        fetch("http://localhost:3000/api/v1/pins/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(newPinObj)
        })
        .then(r => r.json())
        .then(newPin => {
            this.setState({ pinAPI: [...this.state.pinAPI, newPin.pin]})
            console.log(newPin.pin)
    })
        .catch(console.log)
    }

    editPin = (pinData, pinId) => {
        fetch(`http://localhost:3000/api/v1/pins/${pinId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({ pin: pinData }),
        })
        .then(response => response.json())
        .then(newPin => {
            let copiedApi= [...this.state.pinAPI]
            let index = copiedApi.findIndex(pinObj => pinObj.id === newPin.pin.id)
            copiedApi[index] = newPin.pin
            this.setState({ pinAPI: copiedApi})
        })
        .catch(console.log)
    }

    deletePinHandler = (pinId) => {
        console.log(pinId)
        fetch(`http://localhost:3000/api/v1/pins/${pinId}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
            },
        })
        .then(response => response.json())
        .then(() => {
            let copiedApi= [...this.state.pinAPI]
            let index = copiedApi.findIndex(pinObj => pinObj.id === pinId)
            copiedApi.splice(index, 1)
            this.setState({ pinAPI: copiedApi})
        })
    }

    addJournalEntry = (newJournalObj) => {
        console.log(newJournalObj)
        fetch("http://localhost:3000/api/v1/fish_journals/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify({
                date: parseInt(newJournalObj.date),
                fish_type: newJournalObj.fish_type,
                fish_length: parseInt(newJournalObj.fish_length),
                fish_weight: parseInt(newJournalObj.fish_weight),
                moon_phase: newJournalObj.moon_phase,
                tide: newJournalObj.tide,
                rod_setup: newJournalObj.rod_setup,
                note: newJournalObj.note,
                image: newJournalObj.image,
                pin_id: newJournalObj.pin_id
            })
        })
        .then(r => r.json())
        .then(
            newJournal => this.setState({ fishJournalAPI: [...this.state.fishJournalAPI, newJournal.fish_journal]})
            )
        .catch(console.log)
    }

    editJournalEntry = (editJournalObj, journalId) => {
        console.log(editJournalObj)
        fetch(`http://localhost:3000/api/v1/fish_journals/${journalId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify({
                date: parseInt(editJournalObj.date),
                fish_type: editJournalObj.fish_type,
                fish_length: parseInt(editJournalObj.fish_length),
                fish_weight: parseInt(editJournalObj.fish_weight),
                moon_phase: editJournalObj.moon_phase,
                tide: editJournalObj.tide,
                rod_setup: editJournalObj.rod_setup,
                note: editJournalObj.note,
                image: editJournalObj.image,
                pin_id: editJournalObj.pin_id
            })
        })
        .then(r => r.json())
        .then( 
            newJournal => {
            let copiedApi= [...this.state.fishJournalAPI]
            console.log(copiedApi)
            let index = copiedApi.findIndex(journalObj => journalObj.id === newJournal.fish_journal.id)
            copiedApi[index] = newJournal.fish_journal
            this.setState({ fishJournalAPI: copiedApi})
            }
        )
        .catch(console.log)
    }

    deleteJournalEntry = (journalId) => {
        fetch(`http://localhost:3000/api/v1/fish_journals/${journalId}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
            },
        })
        .then(response => response.json())
        .then(() => {
            let copiedApi= [...this.state.fishJournalAPI]
            let index = copiedApi.findIndex(journalObj => journalObj.id === journalId)
            copiedApi.splice(index, 1)
            this.setState({ fishJournalAPI: copiedApi})
        })
    }

    localViewPinsClickHandler = () => {
        this.setState(prevState => ({
            myPinsClicked: !prevState.myPinsClicked
        }))
    }

    localAddPinClickHandler = () => {
        this.setState(prevState => ({
            addPinClicked: !prevState.addPinClicked
        }))
    }

    renderPins = () => {
        let filterByUser = this.state.pinAPI.filter(pins => pins.user_id === this.props.user.id)
        return filterByUser.map(pin => <PinCard key={pin.id} pin={pin} deletePinHandler={this.deletePinHandler} editPin={this.editPin} addJournalEntry={this.addJournalEntry} editJournalEntry={this.editJournalEntry} deleteJournalEntry={this.deleteJournalEntry} journalsAPI={this.state.fishJournalAPI}/> )
    }

    renderMyPinAddPin = () => {
        return (
            <>
            <h4 onClick={this.localViewPinsClickHandler}>My Fishing Journal Pins</h4>
            <h4 onClick={this.localAddPinClickHandler}>Add Pin</h4>
            </>
        )
    }

    render() {
        console.log(this.state.pinAPI)
        console.log(this.state.fishJournalAPI)
        console.log(this.props.user)
        return (
            <>
            { this.props.user.length === 0 ? <></> : 
            this.renderMyPinAddPin()}
            {this.state.addPinClicked=== false ? <></> : <AddPinForm addPin={this.addPin} user={this.props.user}/>}
            {this.state.myPinsClicked === false ? <></> : this.renderPins()}
            </>
        )
    }
}

export default PinContainer