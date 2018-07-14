const posts = {}
module.exports = {
  save: (post) => {
    const id = Object.keys(posts).length + 1
    post.id = id

    let newpost = {
      id,
      title: post.title,
      description: post.description,
      image: post.image,
      reviews: [],
      createdOn: new Date()
    }

    posts[id] = newpost
  },
  all: (page) => {
    const pageSize = 10

    let startIndex = (page - 1) * pageSize
    let endIndex = startIndex + pageSize

    return Object
      .keys(posts)
      .map(key => posts[key])
      .sort((a, b) => b.id - a.id)
      .slice(startIndex, endIndex)
  },
  findById: (id) => {
    return posts[id]
  },
  addReview: (id, rating, comment, user) => {
    const review = {
      rating,
      comment,
      user,
      createdOn: new Date()
    }
    posts[id].reviews.push(review)
  },
  allReviews: (id) => {
    return posts[id]
      .reviews
      .sort((a, b) => b.createdOn - a.createdOn)
      .slice(0)
  }
}
