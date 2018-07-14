import React from 'react'
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }
  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render () {
    const { loggedIn, onLogout } = this.props
    return (
      <div>
        <Navbar color='light' light expand='md'>
          <NavbarBrand tag={Link} to='/'>World Cup 2018</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink tag={Link} to='/'>Home</NavLink>
              </NavItem>
              <NavItem>
                {loggedIn && <NavLink tag={Link} to='/create'>Create Post</NavLink>}
              </NavItem>
              <NavItem>
                {loggedIn && <NavLink tag={Link} to='/matches'>Matches and Stats</NavLink>}
              </NavItem>
              <NavItem>
                {loggedIn && <NavLink href='javascript:void(0)' onClick={onLogout}>Logout</NavLink>}
              </NavItem>
              <NavItem>
                {!loggedIn && <NavLink tag={Link} to='/login'>Login</NavLink>}
              </NavItem>
              {loggedIn && <Button color='light'>Welcome {localStorage.getItem('name')}!</Button>}
              <NavItem>
                {!loggedIn && <NavLink tag={Link} to='/register'>Register</NavLink>}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
// export default class Header extends React.Component {
//   render () {
//     const { loggedIn, onLogout } = this.props
//     return (
//       <header>
//         <NavLink to='/' activeClassName='active'>Home</NavLink>
//         {loggedIn && <NavLink to='/create' activeClassName='active'>Create Post</NavLink>}
//         {loggedIn && <a href='javascript:void(0)' onClick={onLogout}>Logout</a>}
//         {!loggedIn && <NavLink to='/login' activeClassName='active'>Login</NavLink>}
//         {!loggedIn && <NavLink to='/register' activeClassName='active'>Register</NavLink>}
//       </header>
//     )
//   }
// }
