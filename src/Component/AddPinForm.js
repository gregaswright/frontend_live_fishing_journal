import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FishTypeOption from './FishTypeOption'

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
        pin_id: "",
        sea_creatures: [],
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/v1/sea_creatures')
        .then(response => response.json())
        .then(data => this.setState({sea_creatures: data}));
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.checkImage()
        setTimeout(() => {
            this.props.addPin(this.state)    
        }, 2000);
    }


    checkImage = () => {
        let creatureImg = this.state.sea_creatures.filter(creature => creature.species_name === this.state.fish_type)
        {this.state.image === "" && this.setState({ image: creatureImg[0].image })}
    }

    renderCreaturesData = () => {
        let filterByRegion = this.state.sea_creatures.filter(creature => creature.fisheries_region.includes("Greater Atlantic")) 
        return filterByRegion.map(creature => <FishTypeOption key={creature.id} creature={creature}/>)
    }

    render(){
        return (
            <Modal
            show={this.props.closeForm}
            onHide={this.props.closeForm}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add New Fish Pin 
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={this.submitHandler}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Pin Title</Form.Label>
                        <Form.Control type="text" name="title" placeholder="Pin Title" value={this.state.title} onChange={this.changeHandler} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Fish Type</Form.Label>
                        <Form.Control as="select" htmlSize={5} name="fish_type" placeholder="fish_type" value={this.state.fish_type} onChange={this.changeHandler}>
                            {this.renderCreaturesData()}
                        </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Image url</Form.Label>
                        <Form.Control type="text" name="image" placeholder="Image url" value={this.state.image} onChange={this.changeHandler} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Date Caught</Form.Label>
                        <Form.Control type="number" name="date" placeholder="Date Caught" value={this.state.date} onChange={this.changeHandler} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Length Feet&Inches</Form.Label>
                        <Form.Control type="number" name="fish_length" placeholder="Fish Length" value={this.state.fish_length} onChange={this.changeHandler}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Weight Pounds&Ounces</Form.Label>
                        <Form.Control type="number" name="fish_weight" placeholder="Fish Weight" value={this.state.fish_weight} onChange={this.changeHandler}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Tide</Form.Label>
                        <Form.Control as="select" name="tide" placeholder="tide" value={this.state.tide} onChange={this.changeHandler} >
                            <option>Select Tide</option>
                            <option>High</option>
                            <option>Low</option>
                            <option>Incoming</option>
                            <option>Outgoing</option>
                        </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Moon Phase</Form.Label>
                        <Form.Control as="select" name="moon_phase" placeholder="moon_phase" value={this.state.moon_phase} onChange={this.changeHandler}>
                            <option>Select Moon Phase</option>
                            <option>Third Quarter</option>
                            <option>Waning Gibbous</option>
                            <option>Full Moon</option>
                            <option>Waxing Gibbous</option>
                            <option>First Quarter</option>
                            <option>Waxing Crescent</option>
                            <option>New Moon</option>
                            <option>Waning Crescent</option>
                        </Form.Control>
                        </Form.Group>
                    </Form.Row>
                        
                        <Form.Group as={Col} controlId="formGridAddress1">
                            <Form.Label>Rod Setup</Form.Label>
                            <Form.Control as="textarea" placeholder="Rod Setup" name="rod_setup"  value={this.state.rod_setup} onChange={this.changeHandler} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridAddress2">
                            <Form.Label>Notes on Catch</Form.Label>
                            <Form.Control as="textarea" placeholder="Notes..." name="note" value={this.state.note} onChange={this.changeHandler}/>
                        </Form.Group>

                    <Button type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
           
            </Modal.Footer>
          </Modal>
            // <form onSubmit={this.submitHandler}>
            //     <input type="text" name="title" placeholder="pin title" value={this.state.title} onChange={this.changeHandler}/>
            //     <input type="number" name="date" placeholder="date" value={this.state.date} onChange={this.changeHandler}/>
            //     <input type="text" name="fish_type" placeholder="fish_type" value={this.state.fish_type} onChange={this.changeHandler}/>
            //     <input type="number" name="fish_length" placeholder="fish_length" value={this.state.fish_length} onChange={this.changeHandler}/>
            //     <input type="number" name="fish_weight" placeholder="fish_weight" value={this.state.fish_weight} onChange={this.changeHandler}/>
            //     <input type="text" name="moon_phase" placeholder="moon_phase" value={this.state.moon_phase} onChange={this.changeHandler}/>
            //     <input type="text" name="tide" placeholder="tide" value={this.state.tide} onChange={this.changeHandler}/>
            //     <input type="text" name="rod_setup" placeholder="rod_setup" value={this.state.rod_setup} onChange={this.changeHandler}/>
            //     <input type="text" name="note" placeholder="note" value={this.state.note} onChange={this.changeHandler}/>
            //     <input type="text" name="image" placeholder="image" value={this.state.image} onChange={this.changeHandler}/>
            //     <input type="submit" value="Add Pin"/>
            // </form>
        )
    }
}

export default AddPinForm