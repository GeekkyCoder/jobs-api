const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("plz provide name,email and password");
  }

  const user = await User.create({ name, email, password });

  const token = user.createJWT()

  res.status(StatusCodes.CREATED).json({ user:{name:user.name}, token });
};

const login = async (req, res) => {
  const {email,password} = req.body 

  if(!email || !password){
   throw new BadRequestError("plz provide email and password")
  }

  const user = await User.findOne({email})

  if(!user){
    throw new UnauthenticatedError("Invalid Credentials")
  }
  
  // compare password 
 
  const isPasswordMatch = await user.comparePassword(password) 

  if(!isPasswordMatch){
    throw new UnauthenticatedError("wrong password! inavlid credentials")
  }

  const token = user.createJWT()

  res.status(StatusCodes.OK).json({user:{name:user.name},token})

};

module.exports = {
  register,
  login,
};
