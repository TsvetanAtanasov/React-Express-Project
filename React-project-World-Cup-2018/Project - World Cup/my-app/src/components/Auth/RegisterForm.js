import React, {Component} from 'react'
import { Col, Button, Form, FormGroup, Label, Input} from 'reactstrap'
import { register } from '../../api/remote'
import { withRouter } from 'react-router-dom'
import toastr from 'toastr'

class RegisterForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
      repeat: '',
      error: false
    }

    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  onChangeHandler (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  async onSubmitHandler (e) {
    e.preventDefault()
    if (this.state.password !== this.state.repeat) {
      this.setState({
        error: {
          message: 'Check the form for errors',
          error: {
            repeat: "Passwords don't match"
          }
        }
      })
      return
    }
    const res = await register(this.state.username, this.state.email, this.state.password)
    if (!res.success) {
      this.setState({error: res})
      return
    }
    toastr.success('Registered successfully')
    this.props.history.push('/login')
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
        <h1>Register</h1>
        {errors}
        <Form onSubmit={this.onSubmitHandler}>
          <FormGroup row>
            <Label for='username' sm={2}>Username</Label>
            <Col sm={5}>
              <Input type='text'
                name='username'
                value={this.state.username}
                onChange={this.onChangeHandler} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='email' sm={2}>E-mail</Label>
            <Col sm={5}>
              <Input type='text'
                name='email'
                value={this.state.email}
                onChange={this.onChangeHandler} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='password' sm={2}>Password</Label>
            <Col sm={5}>
              <Input type='password'
                name='password'
                id='examplePassword'
                value={this.state.password}
                onChange={this.onChangeHandler} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='repeatPassword' sm={2}>Repeat Password</Label>
            <Col sm={5}>
              <Input type='password'
                name='repeat'
                id='exampleRepeatPassword'
                value={this.state.repeat}
                onChange={this.onChangeHandler} />
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 0 }}>
              <Button>Register</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default withRouter(RegisterForm)
