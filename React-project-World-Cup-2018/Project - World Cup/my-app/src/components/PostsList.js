import React, { Component } from 'react'
import PostCard from './PostCard'

export default class PostsList extends Component {
  render () {
    return (
      <div>
        {this.props.posts.map(p => (
          <PostCard
            key={p.id}
            id={p.id}
            title={p.title}
            image={p.image} />
        ))}
      </div>
    )
  }
}