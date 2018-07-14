import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { getPage } from '../../api/remote'
import PostsList from '../PostsList'

export class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  componentDidMount () {
    this.getData()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.match.params.page !== this.props.match.params.page) {
      this.getData(Number(nextProps.match.params.page))
    }
  }

  async getData (page = Number(this.props.match.params.page) || 1) {
    const data = await getPage(page)

    this.setState({posts: data})
  }

  render () {
    const page = Number(this.props.match.params.page) || 1
    return (
      <div>
        <h1> World Cup 2018 </h1>
        {this.state.posts.length === 0 ? <p>Loading &hellip;</p>
          : <PostsList posts={this.state.posts} />}
        <div className='pagination'>
          {page > 1 && <Link to={'/view/' + (page - 1)}>&lt;</Link>}
          <Link to={'/view/' + (page + 1)}>&gt;</Link>
        </div>
      </div>
    )
  }
}

export default HomePage
