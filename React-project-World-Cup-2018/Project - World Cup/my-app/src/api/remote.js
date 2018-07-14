const host = 'http://localhost:5000/'

async function register (name, email, password) {
  const res = await fetch(host + 'auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      password
    })
  })
  return await res.json()
}

async function login (email, password) {
  const res = await fetch(host + 'auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
  return await res.json()
}

async function createPost (post) {
  const res = await fetch(host + 'posts/create', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      post
    })
  })
  return await res.json()
}

async function getPage (page) {
  const res = await fetch(host + 'posts/all?page=' + page)
  return await res.json()
}

async function getDetails (id) {
  const res = await fetch(host + 'posts/details/' + id, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    }
  })
  return await res.json()
}

async function postReview (postId, comment, rating) {
  const res = await fetch(host + `posts/details/${postId}/reviews/create`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      comment,
      rating
    })
  })
  return await res.json()
}

async function getReviews (id) {
  const res = await fetch(host + `posts/details/${id}/reviews`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    }
  })
  return await res.json()
}

export { register, login, createPost, getPage, getDetails, postReview, getReviews }
