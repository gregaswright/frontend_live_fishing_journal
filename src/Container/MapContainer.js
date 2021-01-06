import React from 'react'
import DoubleCheckDeletePin from '../Component/DoubleCheckDeletePin'
import MoonPhase from '../Component/MoonPhase'
import { Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import Modal from 'react-modal'
import FishJournalCard from '../Component/FishJournalCard'
import AddPinForm from '../Component/AddPinForm'
import AddJournalFrom from '../Component/AddJournalForm'
import FishContainer from '../Container/FishContainer'
import MyFishContainer from '../Container/MyFishContainer'
import mapStyles from '../mapStyles'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import '../Modal.css'
import { Redirect } from 'react-router-dom';

const mapSize = {
    width: '100%',
    height: '100%',
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
        mySpecies: [],
        pinClicked: false,
        viewJournalsClicked: false,
        addNewPinClicked: false,
        addJournalClicked: false,
        deletePinClick: null,
        localFishClick: null,
        localMyFishClick: null
    }


// CRUD functions 
    componentDidMount() {
        Promise.all([
            fetch('http://localhost:3000/api/v1/pins/').then(res => res.json()),
            fetch('http://localhost:3000/api/v1/fish_journals/').then(res => res.json()),
            fetch("http://localhost:3000/api/v1/fish_saves/").then(res => res.json())
        ]).then(([pinData, fishJournalData, fishSaveData]) => {
            this.setState({
                pins: pinData,
                fishJournalAPI: fishJournalData,
                mySpecies: fishSaveData
            });
        })
    }

    addToMySpecies = (newFavFishObj) => {
        console.log(newFavFishObj)
        fetch("http://localhost:3000/api/v1/fish_saves/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify({
                fish_save:{
                species_name: newFavFishObj.species_name,
                taste: newFavFishObj.taste,
                texture: newFavFishObj.texture,
                biology: newFavFishObj.biology,
                habitat: newFavFishObj.habitat,
                population_status: newFavFishObj.population_status,
                phyiscal_description: newFavFishObj.phyiscal_description,
                fisheries_region: newFavFishObj.fisheries_region,
                location: newFavFishObj.location,
                availability: newFavFishObj.availability,
                image: newFavFishObj.image,
                personal_note: "Hello",
                user_id: this.props.user.id}
            })
        })
        .then(r => r.json())
        .then(newFav => {
            this.setState({ 
                mySpecies: [...this.state.mySpecies, newFav.fish_save]
                
            })
            console.log(newFav)
    })
        .catch(console.log)
    }

    removeFromMySpecies = (mySpeciesId) => {
        fetch(`http://localhost:3000/api/v1/fish_saves/${mySpeciesId}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
            },
        })
        .then(response => response.json())
        .then(() => {
            let copiedApi= [...this.state.mySpecies]
            let index = copiedApi.findIndex(mySpeciesObj => mySpeciesObj.id === mySpeciesId)
            copiedApi.splice(index, 1)
            this.setState({ mySpecies: copiedApi})
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


//Conditional Render Functions
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
    
    addJournalClickedHandler = () => {
        this.setState(prevState => ({
            addJournalClicked: !prevState.addJournalClicked
        }))
        console.log(this.state.addJournalClicked)
    }

    localFishClickHandler = () => {
        this.setState(prevState => ({
            localFishClick: !prevState.localFishClick
        }))
         
    }

    localMyFishClickHandler = () => {
        this.setState(prevState => ({
            localMyFishClick: !prevState.localMyFishClick
        }))
        
    }

// Map Click Location for Setting Pin    
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


// Render User Data
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

// Delete Pin Button Handler
    deletePinClickHandler = () => {
        this.setState(prevState => ({
            deletePinClick: !prevState.deletePinClick
        }))
        // this.deletePinHandler(this.state.selectedPin.id)
    }

// Button Rendering 
    renderDeletePinAddJournal = () => {
        return (
            <div>
                <Button onClick={this.addJournalClickedHandler} style={{ color: "white", background: "#8ac0c4", borderColor: "#8ac0c4" }}>Add New Journal Entry</Button>
                <div className="Divider"/>
                <Button onClick={this.deletePinClickHandler} style={{ color: "white", background: "#8ac0c4", borderColor: "#8ac0c4" }}>Delete Pin</Button>
            </div>
        )
    }

    month = () => {
        let d = new Date();
        return d.getMonth() + 1;
    }

    day = () => {
        let d = new Date();
        return d.getDate();
    }

    year = () => {
        let d = new Date();
        return d.getFullYear();
    }

// Render Function
    render() {
        console.log(this.state.mySpecies)
        console.log(this.props.user)
        return(
            <div>
                <MyFishContainer 
                    localMyFishClick={this.state.localMyFishClick}
                    localMyFishClickHandler={this.localMyFishClickHandler}
                    mySpecies={this.state.mySpecies}
                    removeFromMySpecies={this.removeFromMySpecies}
                />
                <FishContainer 
                    localFishClick={this.state.localFishClick}
                    localFishClickHandler={this.localFishClickHandler}
                    addToMySpecies={this.addToMySpecies}
                />
                {this.state.deletePinClick && 
                    <DoubleCheckDeletePin 
                        deletePinHandler={this.deletePinHandler}
                        selectedPinId={this.state.selectedPin.id}
                        deletePinClickHandler={this.deletePinClickHandler}
                    />
                }
                <Button 
                    className="AddPinButton" 
                    variant="default" 
                    style={{ color: "white", background: "#0065a2"}} 
                    onClick={this.addNewPinClicked}
                >
                    Add New Fish Pin
                </Button> 
                {this.state.addNewPinClicked === false ? <></> : 
                    <AddPinForm 
                        addPin={this.addPin} 
                        user={this.props.user} 
                        latLng={this.state.currentMarker} 
                        closeForm={this.addNewPinClicked}/>}
               {this.state.addJournalClicked && 
                    <AddJournalFrom 
                        selectedPin={this.state.selectedPin} 
                        addJournalEntry={this.addJournalEntry} 
                        addJournalClicked={this.addJournalClickedHandler}/>}
                {this.state.selectedPin && 
                <Modal 
                    isOpen={true}
                    className="JournalsModel"
                    overlayClassName="Overlay"
                >
                    <div className="PinTitle">
                        <h2>{this.state.selectedPin.title}</h2>
                        {this.state.selectedPin && this.renderDeletePinAddJournal()}
                    </div>
                        {this.renderJournals()}
                </Modal>}
                <Modal 
                    isOpen={true}
                    className="LogoModel"
                    overlayClassName="Overlay"    
                >
                    <Container>
                    <Row>
                        <Col xs={18} md={12}>
                            <h4 className="Top" >NorthAtlanticFishingJournal</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={9} md={6}>
                            <Nav.Link className="BottomLeft" onClick={this.localFishClickHandler}>Atlantic Species</Nav.Link>
                        </Col>
                        <Col xs={9} md={6}>
                            <Nav.Link className="BottomRight" onClick={this.localMyFishClickHandler}>My Species</Nav.Link>
                        </Col>
                    </Row>
                </Container>
                </Modal>
                <Modal 
                    isOpen={true}
                    className="MoonPhaseModel"
                    overlayClassName="Overlay"    
                >
                   <MoonPhase day={this.day} month={this.month} year={this.year}/> 
                </Modal>
                <Map
                    onClick={this.mapClickHandler}
                    google={this.props.google}
                    zoom={8}
                    style={mapSize}
                    styles={mapStyles}
                    initialCenter={{ lat: 40.7192243, lng: -73.9485957}}
                    // center={this.state.selectedPin ? { lat: this.state.selectedPin.latitude, lng: this.state.selectedPin.longitude} : { lat: null, lng: null}}
                >
                    {this.state.currentMarker && 
                        <Marker position={this.state.currentMarker} 
                                icon={{ url: '/PikPng.com_talent-icon-png_4165003.png',
                                        scaledSize: new window.google.maps.Size(24, 31)
                                }}
                        />
                    }
                    {this.props.user && this.renderUserMarkers()}
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_MAPS_KEY
  })(MapContainer);