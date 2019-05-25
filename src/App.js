import './App.css'
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LoginPage from './containers/LoginPage'
import NotFound from './containers/NotFound'
import HomePage from './containers/HomePage'

class App extends Component {

  renderRouter(){
    return(
      <Switch>
        <Route exact path='/' component={LoginPage} />
        <Route exact path='/home' component={HomePage} />
        <Route component={NotFound} />
      </Switch>
    )
  }

  render() {
    return (
      <BrowserRouter>{this.renderRouter()}</BrowserRouter>
    );
  }
}

export default App;
