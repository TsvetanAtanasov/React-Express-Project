const express = require('express')
const authCheck = require('../middleware/auth-check')
const postsData = require('../data/posts')

const router = new express.Router()

function validatePostForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  // if (!payload || typeof payload.title !== 'string' || payload.title < 3) {
  //   isFormValid = false
  //   errors.title = 'Title must be more than 3 symbols.'
  // }

  // if (!payload || typeof payload.image !== 'string' || payload.image === 0) {
  //   isFormValid = false
  //   errors.image = 'Image URL is required.'
  // }

  // if (!payload || typeof payload.description !== 'string' || payload.description < 10) {
  //   isFormValid = false
  //   errors.description = 'Description must be more than 10 symbols.'
  // }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/create', authCheck, (req, res) => {
  const post = req.body.post

  const validationResult = validatePostForm(post)
  if (!validationResult.success) {
    return res.status(200).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  postsData.save(post)

  res.status(200).json({
    success: true,
    message: 'Post added successfuly.',
    post
  })
})

router.get('/all', (req, res) => {
  const page = parseInt(req.query.page) || 1

  const posts = postsData.all(page)

  res.status(200).json(posts)
})

router.get('/details/:id', authCheck, (req, res) => {
  const id = req.params.id

  let post = postsData.findById(id)

  if (!post) {
    return res.status(200).json({
      success: false,
      message: 'post does not exists!'
    })
  }

  let response = {
    id,
    title: post.title,
    description: post.description,
    image: post.image,
    createdOn: post.createdOn
  }

  res.status(200).json(response)
})

router.post('/details/:id/reviews/create', authCheck, (req, res) => {
  const id = req.params.id
  const user = req.user.name

  let post = postsData.findById(id)

  if (!post) {
    return res.status(200).json({
      success: false,
      message: 'post does not exists!'
    })
  }

  let rating = req.body.rating
  const comment = req.body.comment

  if (rating) {
    rating = parseInt(rating)
  }

  if (!rating || rating < 1 || rating > 5) {
    return res.status(200).json({
      success: false,
      message: 'Rating must be between 1 and 5.'
    })
  }

  postsData.addReview(id, rating, comment, user)

  res.status(200).json({
    success: true,
    message: 'Review added successfuly.',
    review: {
      id,
      rating,
      comment,
      user
    }
  })
})

router.get('/details/:id/reviews', authCheck, (req, res) => {
  const id = req.params.id

  const post = postsData.findById(id)

  if (!post) {
    return res.status(200).json({
      success: false,
      message: 'post does not exists!'
    })
  }

  const response = postsData.allReviews(id)

  res.status(200).json(response)
})

module.exports = router
