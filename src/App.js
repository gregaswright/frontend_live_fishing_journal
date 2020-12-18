import React from 'react'
import './App.css';
import AuthContainer from './Container/AuthContainer'
import PinContainer from './Container/PinContainer';
import MapContainer from './Container/MapContainer'

class App extends React.Component {

  state = {
    user: []
  }


  pullCurrentUser = (user) => {
    this.setState({ user: user})
  }

  clearUser = () => {
    this.setState({ user: []})
  }

  render() {
    console.log(process.env.REACT_APP_MAPS_KEY)
    return (
      <div>
        <h1>LiveFishingJournal</h1>
          <div>
            <AuthContainer pullCurrentUser={this.pullCurrentUser} clearUser={this.clearUser}/>
            {/* <PinContainer user={this.state.user}/> */}
            <MapContainer user={this.state.user}/>
          </div>
      </div>
    )
  }
  
    
}

export default App;
