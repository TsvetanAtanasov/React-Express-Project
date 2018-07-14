import React, {Component} from 'react'
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { createPost } from '../api/remote'
import { withRouter } from 'react-router-dom'
import toastr from 'toastr'

class CreatePost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      image: '',
      description: '',
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
    let post = ({
      title: this.state.title,
      image: this.state.image,
      description: this.state.description
    })
    const error = {message: '', errors: {}}
    if (post.description.length < 10) {
      error.message = 'Check the form for errors'
      error.errors.description = 'Description must be more than 10 symbols.'
    }
    if (post.title.length < 3) {
      error.message = 'Check the form for errors'
      error.errors.title = 'Title must be more than 3 symbols.'
    }
    if (post.image.length === 0) {
      error.message = 'Check the form for errors'
      error.errors.image = 'There must be an image'
    }
    if (error.message) {
      this.setState({error})
      return
    }
    this.setState({error: false})
    const res = await createPost(post)

    if (!res.success) {
      this.setState({error: res})
      return
    }
    toastr.success('Post created successfully')
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
        <h1>Create Post</h1>
        {errors}
        <Form onSubmit={this.onSubmitHandler}>
          <FormGroup row>
            <Label for='title' sm={2}>Title</Label>
            <Col sm={5}>
              <Input type='text'
                name='title'
                value={this.state.title}
                onChange={this.onChangeHandler}
                id='title' />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='image' sm={2}>Image</Label>
            <Col sm={5}>
              <Input type='text'
                name='image'
                value={this.state.image}
                onChange={this.onChangeHandler}
                id='image' />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='image' sm={2}>Description</Label>
            <Col sm={5}>
              <textarea type='text'
                name='description'
                value={this.state.description}
                onChange={this.onChangeHandler}
                style={{resize: 'none', width: '120%', height: '100px'}} 
                id='description' />
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 0 }}>
              <Button>Create Post</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default withRouter(CreatePost)
