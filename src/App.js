import './App.css'
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LoginPage from './containers/LoginPage'
import NotFound from './containers/NotFound'
import HomePage from './containers/HomePage'
import AddIncomePage from './containers/AddIncomePage'
import AddExpensePage from './containers/AddExpensePage'
import EditPage from './containers/EditPage'

class App extends Component {

  renderRouter(){
    return(
      <Switch>
        <Route exact path='/' component={LoginPage} />
        <Route exact path='/home' component={HomePage} />
        <Route exact path='/add/income' component={AddIncomePage} />
        <Route exact path='/add/expense' component={AddExpensePage} />
        <Route path='/edit/:userid/:id' component={EditPage} />
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
