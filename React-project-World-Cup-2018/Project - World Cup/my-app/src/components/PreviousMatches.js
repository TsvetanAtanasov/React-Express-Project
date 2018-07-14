import React from 'react'
import { Match } from './Match'
import {Input} from 'reactstrap';

export class PreviousMatches extends React.Component {
constructor(props){
    super(props);

    this.state = {
        searchTerm: ""
    }
}

changeSearch = (event) => {
    this.setState({
        searchTerm: event.target.value
    })
}

filterBySearchTerm =(match) => {
    const  {searchTerm} = this.state;

    if(searchTerm === ""){
        return true;
    }

    const {home_team: {country: hCountry}, away_team: {country: aCountry}} = match;

  return hCountry.includes(searchTerm) || aCountry.includes(searchTerm);
}

  render () {
const {matches} = this.props;

    if (!matches) {
      return null
        }

    return (
      <div>
            <Input placeholder="Search" style={{width: "50%", margin: "10px"}} onChange={this.changeSearch}/>
        {matches.filter(this.filterBySearchTerm).map(match => {
          return (
            <Match match={match} />
          )
        })}
      </div>
    )
  }
}
