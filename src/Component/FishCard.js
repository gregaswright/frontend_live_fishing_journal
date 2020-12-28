import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../Component/FishCard.css'

class FishCard extends React.Component {

    render() {
        return(
            <Container>
                <Row>
                    <Col xs={20} md={12}>
                        <h3>{this.props.creature.species_name}</h3>
                        <h6>{this.props.creature.fisheries_region}</h6>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={4}>
                        <h5>{this.props.creature.phyiscal_description.replace(/(<([^>]+)>)/gi, "")}</h5>
                    </Col>
                    <Col xs={12} md={8}>
                        <img className="LocalFishImages" src={this.props.creature.image} alt={this.props.creature.species_name}/>
                    </Col>
                </Row>
    
                <Row>
                    <Col xs={6} md={4}>
                        {this.props.creature.habitat &&  <h6 className="Desc">Habitat:</h6>}
                        <h6>{this.props.creature.habitat.replace(/(<([^>]+)>)/gi, "")}</h6>
                    </Col>
                    <Col xs={6} md={4}>
                        <h6 className="Desc">Biology:</h6><h6>{this.props.creature.biology.replace(/(<([^>]+)>)/gi, "")}</h6>
                    </Col>
                    <Col xs={6} md={4}>
                        <h6 className="Desc">Availability:</h6><h6>{this.props.creature.availability.replace(/(<([^>]+)>)/gi, "")}</h6>
                        <h6 className="Desc">Population:</h6><h6>{this.props.creature.population_status.replace(/(<([^>]+)>)/gi, "")}</h6>
                        <h6 className="Desc">Taste:</h6><h6>{this.props.creature.taste.replace(/(<([^>]+)>)/gi, "")}</h6>
                        {this.props.creature.texture &&  <h6 className="Desc">Texture:</h6>}
                        <h6>{this.props.creature.texture.replace(/(<([^>]+)>)/gi, "")}</h6>
                    </Col>
                </Row>
            </Container>
            
        )
    }
}

export default FishCard