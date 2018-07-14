import React from 'react'

export default function Review ({rating, comment, user, date}) {
  return (
    <article>
      <header>{user} - {rating} stars</header>
      <p>{comment}</p>
      <footer style={{fontStyle: 'italic'}}>posted on {date}</footer>
    </article>
  )
}
