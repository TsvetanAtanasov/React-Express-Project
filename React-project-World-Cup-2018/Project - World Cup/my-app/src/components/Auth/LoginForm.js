import React, {Component} from 'react'
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { login } from '../../api/remote'
import toastr from 'toastr'

class LoginForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }

    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  onChangeHandler (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  async onSubmitHandler (e) {
    e.preventDefault()
    const res = await login(this.state.email, this.state.password)
    localStorage.setItem('authToken', res.token)

    if (!res.success) {
      this.setState({error: res})
      return
    }
    toastr.success('Logged in successfully')
    localStorage.setItem('name', res.user.name)
    this.props.history.push('/')
  }

  render () {
    let errors = null
    if (this.state.error) {
      errors = (
        <div>
          {
            Object.keys(this.state.error.errors).map(k => {
              return <p key={k}>{this.state.error.errors[k]}</p>
            })
          }
        </div>
      )
    }

    return (
      <div>
        <h1>Login</h1>
        {errors}
        <Form onSubmit={this.onSubmitHandler}>
          <FormGroup row>
            <Label for='email' sm={2}>E-mail</Label>
            <Col sm={5}>
              <Input type='text'
                name='email'
                value={this.state.email}
                onChange={this.onChangeHandler}
                id='exampleEmail' />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='password' sm={2}>Password</Label>
            <Col sm={5}>
              <Input type='password'
                name='password'
                value={this.state.password}
                onChange={this.onChangeHandler}
                id='examplePassword' />
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 0 }}>
              <Button>Login</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default LoginForm
