import React from 'react'
import {Match} from './Match'

export const UpcommingMatches = ({matches}) => {
  console.log(matches)

  if (!matches) {
    return null
  }

  return (

    <div>
      {matches.map(match => {
        return (
          <Match match={match} />
        )
      })}
    </div>
  )
}
