import React, { Component } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { UpcommingMatches } from './UpcommingMatches';
import { PreviousMatches } from './PreviousMatches';

class MatchDataContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activeTab: '1',
      completedMatches: null,
      futureMatches: null,
    }
  }



  toggle = (newTab) => {
        this.setState({
            activeTab: newTab
        })
  }

  componentDidMount () {
    fetch('http://worldcup.sfg.io/matches')
      .then(res => {
          return res.json()
      })
      .then(data => {
        const reducedData = this.reduceData(data);

        const completedMatches = reducedData.filter(match => match.status === "completed");
        const futureMatches = reducedData.filter(match => match.status === "future");

        this.setState({
            completedMatches:completedMatches,
            futureMatches: futureMatches
        })
      })
  }

  reduceData = (data) => {
        return data.map(match => {
            const {status, home_team, away_team} = match;
            return {
                status,
                home_team,
                away_team
            }
        })
  }

  render () {
    const {futureMatches, completedMatches, activeTab} = this.state;

    return (
      <div>
          <Nav tabs>
          <NavItem> 
               <NavLink
              className={ activeTab === '1' && "active"}
              onClick={() => { this.toggle('1'); }}
            >
         
              Next Matches
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' && "active"}
              onClick={() => { this.toggle('2'); }}
            >
              PreviousMatches
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
           <UpcommingMatches matches={futureMatches}/>
          </TabPane>
          <TabPane tabId="2">
           <PreviousMatches matches={completedMatches}/>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

export default MatchDataContainer
