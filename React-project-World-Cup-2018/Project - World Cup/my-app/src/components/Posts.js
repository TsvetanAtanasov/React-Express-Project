import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'

export default class Posts extends React.Component {
  render () {
    return (
      <ListGroup>
        <ListGroupItem tag='a' href='/posts/:id' action>Brazil vs Belgium</ListGroupItem>
        <ListGroupItem tag='a' href='/posts/:id' action>Bulgaria vs Sweden</ListGroupItem>
        <ListGroupItem tag='a' href='/posts/:id ' action>Portugal vs Spain</ListGroupItem>
      </ListGroup>
    )
  }
}
