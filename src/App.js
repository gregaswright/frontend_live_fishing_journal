import React from 'react'
import './App.css';
import AuthContainer from './Container/AuthContainer'
import FishContainer from './Container/FishContainer'
import MapContainer from './Container/MapContainer'
import NavigationBar from './Component/NavigationBar'
import WelcomePage from "./Component/WelcomePage";
import {Route} from 'react-router-dom'

class App extends React.Component {

  state = {
    user: []
  }

  componentDidMount(){
    const token = localStorage.getItem("token")
    if (token) {
        fetch("http://localhost:3000/api/v1/profile", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`},
    })
        .then(resp => resp.json())
        .then(data => { 
            this.setState({ user: data.user })
            
        })
    } 
}

  pullCurrentUser = (user) => {
    this.setState({ user: user})
  }

  clearUser = () => {
    this.setState({ user: []})
  }

  render() {
    console.log(this.state.user)
    return (
      <div>
      
          <div>
            <NavigationBar />
            <Route path="/welcome" render={() => <AuthContainer pullCurrentUser={this.pullCurrentUser} clearUser={this.clearUser}/>} />
            {/* <AuthContainer pullCurrentUser={this.pullCurrentUser} clearUser={this.clearUser}/> */}
            {/* <FishContainer /> */}
            <Route path="/map" render={() => <MapContainer user={this.state.user}/>}/>
            {/* <MapContainer user={this.state.user}/> */}
          </div>
      </div>
    )
  }
  
}

export default App;
