import React from 'react'

import { Collapse, Button, CardBody, Card } from 'reactstrap';

export class Match extends React.Component {
constructor(props){
    super(props)

    this.state = {
        collapse: false
    }
}

toggle = () => {
    this.setState({
        collapse: !this.state.collapse
    })
}

  render () {
    console.log(this.props)

    const {status, home_team: homeTeam, away_team: awayTeam} = this.props.match

    const {country: homeCountry, goals: hGoals, penalties: hPenalties} = homeTeam
    const {country: awayCountry, goals: aGoals, penalties: aPenalties} = awayTeam

    if (status === 'future') {
      return (
          <div>
          {`${awayCountry} - ${homeCountry}`}
        </div>
      )
    }
    return (
      <div>
        <div>
          {`${awayCountry} ${aGoals} : ${hGoals} ${homeCountry}`}
        </div>
        <Button onClick={this.toggle} color="primary">Details</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody style={{'color': 'black'}}>
              {`${awayCountry}: Scored Goals: ${aGoals} (${aPenalties} penalties) ----- ${homeCountry}: Scored Goals: ${hGoals} (${hPenalties} penalties)`}
            </CardBody>
          </Card>
        </Collapse>
      </div>
    )
  }
}
