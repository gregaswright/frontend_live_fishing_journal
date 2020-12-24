import React from 'react'

class FishCard extends React.Component {

    render() {
        return(
            <div>
                <h3>{this.props.creature.species_name}</h3>
                <img src={this.props.creature.image} alt={this.props.creature.species_name}/>
                <h4>{this.props.creature.phyiscal_description.replace(/(<([^>]+)>)/gi, "")}</h4>
                <h4>{this.props.creature.fisheries_region}</h4>
                <h4>{this.props.creature.habitat.replace(/(<([^>]+)>)/gi, "")}</h4>
                <h4>{this.props.creature.location.replace(/(<([^>]+)>)/gi, "")}</h4>
                <h4>{this.props.creature.availability.replace(/(<([^>]+)>)/gi, "")}</h4>
                <h4>{this.props.creature.biology.replace(/(<([^>]+)>)/gi, "")}</h4>
                <h4>{this.props.creature.population_status.replace(/(<([^>]+)>)/gi, "")}</h4>
                <h4>{this.props.creature.taste.replace(/(<([^>]+)>)/gi, "")}</h4>
                <h4>{this.props.creature.texture.replace(/(<([^>]+)>)/gi, "")}</h4>
            </div>
            
        )
    }
}

export default FishCard