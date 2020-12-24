import React from "react"
import FishCard from '../Component/FishCard'

class FishContainer extends React.Component {

    state = {
        sea_creatures: [],
        seeFishButtonClicked: false
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/v1/sea_creatures')
        .then(response => response.json())
        .then(data => this.setState({sea_creatures: data}));
    }

    renderFishCard = () => {
        let filterByRegion = this.state.sea_creatures.filter(creature => creature.fisheries_region.includes("Greater Atlantic")) 
        return filterByRegion.map(creature => <FishCard key={creature.id} creature={creature}/>)
    }

    seeFishButtonClicked = () => {
        this.setState(prevState => ({
            seeFishButtonClicked: !prevState.seeFishButtonClicked
        }))
    }

    render() {
        console.log(this.state.sea_creatures)
        return (
            <>
            <button onClick={this.seeFishButtonClicked}>See All Local Fish</button>
            {this.state.seeFishButtonClicked && this.renderFishCard()}
            </>
        )
    }

}

export default FishContainer