const express = require('express');
const {validateUserId, validateUser, validatePost} = require('./../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const Users = require('./users-model.js')
const Posts = require('./../posts/posts-model.js')
const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.body)
    .then(users=>{
      res.status(200).json(users);
    })
    .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  console.log(req.user)
    res.json(req.user) 
  })
  

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  const newUser = req.body
    Users.insert(newUser)
    .then(user=>{
      console.log(user)
      res.status(201).json(user)
    })
    .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const {id} = req.params;
  const UpdatedUser = req.body

  Users.update(id, UpdatedUser)
    .then(user=>{
      res.status(200).json(req.body)

    })
    .catch(next)
});

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
    .then(()=>{
      res.status(200).json({message: 'User deleted'})
    })
    .catch(next)
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
    .then(post=>{
      console.log(post)
      res.status(200).json(post)
    })
    .catch(next)
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
const postInfo = {...req.body, user_id: req.params.id}
  Posts.insert(postInfo)
    .then(newpost=>{
      console.log(newpost)
      res.status(210).json(newpost)
    })
    .catch(next)
});

// do not forget to export the router

module.exports = router
