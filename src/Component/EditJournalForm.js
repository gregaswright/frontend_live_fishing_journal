import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FishTypeOption from './FishTypeOption'

class EditJournalForm extends React.Component {

    state = {
        date: this.props.journal.date,
        fish_type: this.props.journal.fish_type,
        fish_length: this.props.journal.fish_length,
        fish_weight: this.props.journal.fish_weight,
        moon_phase: this.props.journal.moon_phase,
        tide: this.props.journal.tide,
        rod_setup: this.props.journal.rod_setup,
        note: this.props.journal.note,
        image: this.props.journal.image,
        pin_id: this.props.pinId,
        sea_creatures: [],
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/v1/sea_creatures')
        .then(response => response.json())
        .then(data => this.setState({sea_creatures: data}));
    }

    checkImage = () => {
        
    }

    renderCreaturesData = () => {
        let filterByRegion = this.state.sea_creatures.filter(creature => creature.fisheries_region.includes("Greater Atlantic")) 
        return filterByRegion.map(creature => <FishTypeOption key={creature.id} creature={creature}/>)
    }

    changeHandler = (event) => {
        
        this.setState({ [event.target.name]: event.target.value })
        
    }

    submitHandler = (event) => {
        event.preventDefault()
        setTimeout(() => {
            this.props.editJournalEntry(this.state, this.props.journal.id)
        }, 3000);
        console.log(this.state)
        this.props.editJournalEntryClickHandler()
        
    }

    render(){
        console.log(this.state)
       
        return (
            <Modal
            show={this.props.editJournalEntryClickHandler}
            onHide={this.props.editJournalEntryClickHandler}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit Fish Journal Entry 
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={this.submitHandler}>
                    <Form.Row>
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
                            <option>High</option>
                            <option>Low</option>
                            <option>Incoming</option>
                            <option>Outgoing</option>
                        </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Moon Phase</Form.Label>
                        <Form.Control as="select" name="moon_phase" placeholder="moon_phase" value={this.state.moon_phase} onChange={this.changeHandler}>
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

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
           
            </Modal.Footer>
          </Modal>
        )
    }

}

export default EditJournalForm