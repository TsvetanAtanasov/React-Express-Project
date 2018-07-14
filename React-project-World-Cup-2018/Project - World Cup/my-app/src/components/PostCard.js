import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Col, Button, FormGroup } from 'reactstrap'

export class PostCard extends Component {
  render () {
    const {title, image, id} = this.props
    return (
      <article className='postCard'>
        <p>{title}</p>
        <img alt={image} src={image} />
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 0 }}>
            <Button onClick={() => this.props.history.push('/details/' + id)}>Read More</Button>
          </Col>
        </FormGroup>
        {/* <Link to={'/details/' + id}>View Details</Link> */}
      </article>
    )
  }
}

export default withRouter(PostCard)
