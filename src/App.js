import React from 'react'
import './App.css';
import AuthContainer from './Container/AuthContainer'

class App extends React.Component {


  render() {

    return (
      <div>
        <h1>LiveFishingJournal</h1>
          <div>
            <AuthContainer/>
          </div>
      </div>
    )
  }
  
    
}

export default App;
