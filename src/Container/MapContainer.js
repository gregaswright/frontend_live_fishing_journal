import React from 'react'
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import FishJournalCard from '../Component/FishJournalCard'
import AddPinForm from '../Component/AddPinForm'
import AddJournalFrom from '../Component/AddJournalForm'
import mapStyles from '../mapStyles'

const mapSize = {
    width: '100%',
    height: '50%',
  };

class MapContainer extends React.Component {

    state = {
        currentMarker: {
            lat: 40.717186044687764,
            lng: -74.01512420657701
        }, 
        selectedPin: null,
        pins: [],
        fishJournalAPI: [],
        pinClicked: false,
        viewJournalsClicked: false,
        addNewPinClicked: false,
        addJournalClicked: false
    }

    // 40.717186044687764
    // -74.01512420657701
    componentDidMount() {
        Promise.all([
            fetch('http://localhost:3000/api/v1/pins/').then(res => res.json()),
            fetch('http://localhost:3000/api/v1/fish_journals/').then(res => res.json())
        ]).then(([pinData, fishJournalData]) => {
            this.setState({
                pins: pinData,
                fishJournalAPI: fishJournalData,
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
            body: JSON.stringify({
                title: newPinObj.title,
                latitude: newPinObj.latitude,
                longitude: newPinObj.longitude,
                user_id: newPinObj.user_id,
                fish_journals: []
            })
        })
        .then(r => r.json())
        .then(newPin => {
            this.setState({ 
                pins: [...this.state.pins, newPin.pin]
                
            })
            console.log(newPin)
            // console.log(this.state.pins)
            this.addJournalEntry(newPinObj, newPin.pin)
            
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
            let copiedApi= [...this.state.pins]
            let index = copiedApi.findIndex(pinObj => pinObj.id === newPin.pin.id)
            copiedApi[index] = newPin.pin
            this.setState({ pins: copiedApi})
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
            let copiedApi= [...this.state.pins]
            let index = copiedApi.findIndex(pinObj => pinObj.id === pinId)
            copiedApi.splice(index, 1)
            this.setState({ 
                pins: copiedApi,
                selectedPin: null
            })
            console.log(this.state.pins)
        })
    }

    addJournalEntry = (newJournalObj, pin) => {
        console.log(newJournalObj)
        console.log(pin)
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
                pin_id: pin.id
            })
        })
        .then(r => r.json())
        .then( newJournal => {
            this.setState({ 
                fishJournalAPI: [...this.state.fishJournalAPI, newJournal.fish_journal],
                
            })
            console.log(this.state.pins)
            console.log(this.state.fishJournalAPI)
            console.log(newJournal)
        }
            
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

  

    localAddPinClickHandler = () => {
        this.setState(prevState => ({
            addPinClicked: !prevState.addPinClicked
        }))
    }

    pinClicked = () => {
        this.setState(prevState => ({
            pinClicked: !prevState.pinClicked
        }))
    }

    
    mapClickHandler = (mapProps, map, event) => {
        let newLat = event.latLng.lat()
        let newLong = event.latLng.lng()
        this.setState({ 
            currentMarker: {
                lat: newLat,
                lng: newLong
            },
            selectedPin: null
        })
        console.log(this.state.currentMarker)
        console.log(this.state.selectedPin)
    }
    
    renderUserMarkers = () => {
        let filterByUser = this.state.pins.filter(pins => pins.user_id === this.props.user.id)
        return filterByUser.map((pin) => {
            return <Marker key={pin.id} id={pin.id} position={{
             lat: pin.latitude,
             lng: pin.longitude
           }}
           onClick={() => {
               this.setState({ selectedPin: pin})
               console.log(this.state.selectedPin)
            }} 
            icon={{
                url: '/logo-map-icon.png',
                scaledSize: new window.google.maps.Size(50, 50)
                
            }}
            />
          })
    }
    
    renderJournals = () => {
        let filteredJournals = this.state.fishJournalAPI.filter(journal => journal.pin_id === this.state.selectedPin.id)
        return filteredJournals.map(journal => <FishJournalCard key={journal.id} journal={journal} deleteJournalEntry={this.deleteJournalEntry} editJournalEntry={this.editJournalEntry} pinId={this.state.selectedPin.id}/>)
    }

    renderJournalsClicked = () => {
        console.log("hello")
        this.setState(prevState => ({
            viewJournalsClicked: !prevState.viewJournalsClicked
        }))
    }

    addNewPinClicked = () => {
        this.setState(prevState => ({
            addNewPinClicked: !prevState.addNewPinClicked
        }))
    }

    deletePinClickHandler = () => {
        this.deletePinHandler(this.state.selectedPin.id)
    }

    addJournalClickedHandler = () => {
        this.setState(prevState => ({
            addJournalClicked: !prevState.addJournalClicked
        }))
    }

    renderDeletePinAddJournal = () => {
        return (
            <div>
                <button onClick={this.addJournalClickedHandler}>Add New Journal Entry</button>
                <button onClick={this.deletePinClickHandler}>Delete Pin</button>
            </div>
        )
    }

    render() {
        console.log(this.state.fishJournalAPI)
        console.log(this.state.viewJournalsClicked)
        
        return(
           
            <div>
                <button onClick={this.addNewPinClicked}>Add New Pin</button> 
                {this.state.addNewPinClicked === false ? <></> : <AddPinForm addPin={this.addPin} user={this.props.user} latLng={this.state.currentMarker} closeForm={this.addNewPinClicked}/>}
                {this.state.selectedPin && <h2>{this.state.selectedPin.title}</h2>}
                {this.state.selectedPin && this.renderDeletePinAddJournal()}
                {this.state.addJournalClicked === false ? <></> : <AddJournalFrom selectedPin={this.state.selectedPin} addJournalEntry={this.addJournalEntry}/>}
                {this.state.selectedPin && this.renderJournals()}
                <Map
                    onClick={this.mapClickHandler}
                    google={this.props.google}
                    zoom={8}
                    style={mapSize}
                    styles={mapStyles}
                    initialCenter={{ lat: 40.7192243, lng: -73.9485957}}
                    >
                    {this.state.currentMarker && <Marker position={this.state.currentMarker} icon={{
                        url: '/PikPng.com_talent-icon-png_4165003.png',
                        scaledSize: new window.google.maps.Size(24, 31)
                
                    }}/>}
                    {this.renderUserMarkers()}
                    {this.state.selectedPin &&  (
                        <InfoWindow 
                            visible={true} 
                            onCloseClick={() => 
                                {this.setState({ selectedPin: null});
                            }}
                            position={{
                                lat: this.state.selectedPin.latitude,
                                lng: this.state.selectedPin.longitude
                            }}
                            >
                            <h3>{this.state.selectedPin.title}</h3>
                        </InfoWindow>
                    )}
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_MAPS_KEY
  })(MapContainer);