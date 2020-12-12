import React from 'react'
import PinCard from '../Component/PinCard'

class PinContainer extends React.Component {

    state = {
        pinAPI: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/v1/pins/')
        .then(r => r.json())
        .then(pinData => this.setState({ pinAPI: pinData}))
    }

    localClickHandler = () => {
        console.log("click")
    }

    renderPins = () => {
        let filterByUser = this.state.pinAPI.filter(pins => pins.user_id === this.props.user.id)
        return filterByUser.map(pin => <PinCard key={pin.id} pin={pin}/> )
    }

    render() {
        console.log(this.state.pinAPI)
        return (
            <>
            { this.props.user.length === 0 ? <></> : 
            <h4 onClick={this.localClickHandler}>My Fishing Journal Pins</h4>}
            </>
        )
    }
}

export default PinContainer