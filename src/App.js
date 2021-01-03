import React from 'react'
import './App.css';
import AuthContainer from './Container/AuthContainer'
import MapContainer from './Container/MapContainer'
import NavigationBar from './Component/NavigationBar'
import {Redirect, Route} from 'react-router-dom'

class App extends React.Component {

  state = {
    user: null
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
    this.setState({ user: null})
  }

  render() {

    console.log(this.state.user)
    return (
          <div>
            <NavigationBar 
              user={this.state.user}
            />
              <Route 
                exact path="/" 
                render={() => {
                  return (
                    this.state.user ? 
                    <Redirect to="/welcome" /> :
                    <Redirect to="/map" />
                  )
                }}
              />
                <Route 
                  path="/map" 
                  render={() => 
                    <MapContainer 
                    user={this.state.user}
                    />
                  }
                />
              <Route 
                path="/welcome" 
                render={() => 
                  <AuthContainer 
                    pullCurrentUser={this.pullCurrentUser} 
                    clearUser={this.clearUser}
                  />
                } 
              />
          </div>
    )
  }
  
}

export default App;
