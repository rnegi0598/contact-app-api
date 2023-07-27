const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

/*
@desc Register a user
@route POST /api/users/register
@access public 
*/
const registerUser = asyncHandler(async (req, res, next) => {
  const { name: username, email, password } = req.body;
  if(!username || !email ||!password){
    res.sendStatus(400);
    throw new Error('all fields mandatory');
  }
  //if user already exists ?
  const userAvailable=await User.findOne({email});
  if(!userAvailable){
    res.sendStatus(400);
    throw new Error('user already exist');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  res.json(user);
});

/*
@desc Login a user
@route POST /api/users/register
@access public
*/
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if(!email ||!password){
    res.sendStatus(400);
    throw new Error('all fields mandatory');
  }

  //see if user exist
  const user = await User.findOne({ email });

  if (!user) {
    res.sendStatus(401);
    throw new Error("user not found");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.sendStatus(401);
    throw new Error("password does not match ");
  }

  const accessToken = jwt.sign(
    {
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  res.json({accessToken})

});


/*
@desc Get  user
@route GET /api/users/current
@access private
*/
const currentUser = asyncHandler(async (req, res, next) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
