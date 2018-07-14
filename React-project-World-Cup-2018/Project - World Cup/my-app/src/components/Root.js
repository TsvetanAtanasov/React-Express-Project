import React from 'react'
import Header from './common/Header'
import HomePage from './common/HomePage'
import {Switch, Route} from 'react-router'
import RegisterForm from './Auth/RegisterForm'
import MatchDataContainer from './MatchDataContainer'
import Posts from './Posts'
import LoginForm from './Auth/LoginForm'
import CreatePost from './CreatePost'
import { withRouter } from 'react-router-dom'
import DetailsPage from './Details/DetailsPage'
import PrivateRoute from './common/PrivateRoute';

class Root extends React.Component {
  constructor (props) {
    super(props)
    this.onLogout = this.onLogout.bind(this)
  }

  onLogout () {
    localStorage.clear()
    this.props.history.push('/')
  }
  render () {
    return (
      <div>
        <Header loggedIn={localStorage.getItem('authToken') !== null} onLogout={this.onLogout} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/view/:page' component={HomePage} />
          <PrivateRoute path='/details/:id' component={DetailsPage} />
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={RegisterForm} />
          <PrivateRoute path='/matches' component={MatchDataContainer} />
          <Route path='/posts' component={Posts} />
          <Route path='/create' component={CreatePost} />
          <Route component={() => (<div>No such page! Sorry!</div>)} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(Root)
