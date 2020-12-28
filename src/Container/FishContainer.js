import React from "react"
import FishCard from '../Component/FishCard'
import FishSearchForm from '../Component/FishSearchForm'
import Modal from 'react-bootstrap/Modal'
import '../Container/FishContainer.css'

class FishContainer extends React.Component {

    state = {
        sea_creatures: [],
        searchValue: ""
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/v1/sea_creatures')
        .then(response => response.json())
        .then(data => this.setState({sea_creatures: data}));
    }

    searchHandler = (event) => {
        this.setState({ searchValue: event.target.value})
    }

    filteredCreatures = () => {
        return this.state.sea_creatures.filter(creature => creature.species_name.toLowerCase().includes(this.state.searchValue.toLowerCase()))
    }

    renderFishCard = () => {
        let filterByRegion = this.filteredCreatures().filter(creature => creature.fisheries_region.includes("Greater Atlantic")) 
        return filterByRegion.map(creature => <FishCard key={creature.id} creature={creature}/>)
    }

    seeFishButtonClicked = () => {
        this.setState(prevState => ({
            seeFishButtonClicked: !prevState.seeFishButtonClicked
        }))
    }

    render() {
        console.log(this.props.localFishClick)
        console.log(this.state.sea_creatures)
        return (
            <>
                <Modal
                    show={this.props.localFishClick}
                    onHide={this.props.localClickHandler}
                    dialogClassName="Modal"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                    <Modal.Title className="ModalHeader" id="example-custom-modal-styling-title">
                        Local Ocean Fish
                    <FishSearchForm searchHandler={this.searchHandler} searchValue={this.state.searchValue}/>
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="ModalBody">
                        {this.renderFishCard()}
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </Modal>  
            </>
        )
    }

}

export default FishContainer