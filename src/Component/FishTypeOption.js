import React from 'react'

class FishTypeOption extends React.Component {

    render() {
        return (
            <option>{this.props.creature.species_name}</option>
        )
    }
}

export default FishTypeOption