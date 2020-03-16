import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'

import Navbar from '../../organisms/NavBar'
import { Book, Member, Borrowed } from '../../pages'

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Navbar />
          </div>
          <Switch>
            <Route path='/' component={Book} exact />
            <Route path='/Member' component={Member} exact />
            <Route path='/Borrowed' component={Borrowed} exact />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
