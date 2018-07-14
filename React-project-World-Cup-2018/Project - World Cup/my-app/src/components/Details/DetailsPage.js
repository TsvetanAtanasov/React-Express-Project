import React, { Component } from 'react'
import { getDetails } from '../../api/remote'
import ReviewSection from './ReviewSection'

export default class DetailsPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      post: false
    }
  }

  componentDidMount () {
    this.getData()
  }

  async getData () {
    const post = await getDetails(Number(this.props.match.params.id))
    this.setState({post})
  }

  render () {
    let main = <p>Loading &hellip;</p>
    if (this.state.post) {
      const post = this.state.post
      main = (
        <div className='postDetails'>
          <h2>{post.title}</h2>
          <div>
            <img alt={post.image} src={post.image} />
          </div>
          <p>{post.description}</p>
        </div>
      )
    }

    return (
      <div>
        <h1>Details Page</h1>
        <p>{this.props.match.params.title}</p>
        {main}
        <ReviewSection postId={Number(this.props.match.params.id)} />
      </div>
    )
  }
}
