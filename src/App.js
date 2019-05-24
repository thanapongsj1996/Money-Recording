import './App.css'
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LoginPage from './containers/LoginPage'
import NotFound from './containers/NotFound'

class App extends Component {

  renderRouter(){
    return(
      <Switch>
        <Route exact path='/' component={LoginPage} />
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
