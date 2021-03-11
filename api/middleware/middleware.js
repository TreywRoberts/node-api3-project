const User = require('./../users/users-model.js')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`${req.method} request was made to ${req.url} at ${new Date().toString()}`)
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const {id} = req.params
  try{
    const user = await User.getById(id)
    if(!user) {
      res.status(404).json({
        message: "user not found"
      })
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    next(err)
  }
  
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.name || !req.body.name.trim()){
    res.status(400).json({message:  "missing required name field"})
  } else if (req.body === {}) { 
    res.status(400).json({message:  "missing required name field"})
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.text || !req.body.user_id) {
    res.status(400).json({message: "missing required text or user_id fields"})
  } else if(!req.body === {}){
    res.status(400).json({message: "missing post data"})
  } else{
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost

}