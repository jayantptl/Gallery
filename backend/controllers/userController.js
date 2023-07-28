const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })   // payload is inside
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)        // using that static method defined in db

    // create a token
    const token = createToken(user._id)                   // user is the document (json) stored in db

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password} = req.body
 

  try {
    const user = await User.signup(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// verify authorization
const requireAuth = async (req, res) => {

  const { authorization } = req.headers;
  if (!authorization) {
      return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];   // auth header is -> Bearer token

  try {
      const { _id } = jwt.verify(token, process.env.SECRET); // this gives _id stored in db to that user
      req.user = await User.findOne({_id}).select('_id');     // we can attach this user _id in req body and use in other routes
      console.log('Authorization done ' ,req.user);
      res.status(200).json({token})
  }
  catch (error) {
      console.log(error);
      res.status(401).json({ error: 'Request is not autthorized' });
  }

}




module.exports = { signupUser, loginUser, requireAuth }
