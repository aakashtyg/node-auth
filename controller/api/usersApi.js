const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { response } = require('express');

function index (req, res) {
  return res.status(200).json({
    success: false
  });
}

async function signup (req, res) {
  const { password, confirm_password: confirmPassword, email, name } = req.body;

  console.log(req.body);
  if (password !== confirmPassword) {
    return res.status(500).json({
      error: "Password should match"
    })
  }

  if (!name || !email) {
     return res.status(500).json({
      error: "Name and email compulsory"
    })
  }

  const user = await User.findOne({ email: email });

  try {
    if (!user) {
      const createdUser = await User.create({
        name,
        email,
        password
      });


      if (createdUser) {
        return res.status(201).json({
          message: "User created succssefully!",
          name: createdUser.name,
          email: createdUser.email,
          id: createdUser.id,
        })
      }

      return res.status(500).json({
        error: "Something went wrong"
      });
    } else {
      return res.status(500).json({
        error: "User already exists!"
      });
    }
  } catch (error) {
    console.log("signup -> error", error)
    return res.status(500).json({
        error
      });
  }
}

async function login (req, res) {
  const { password, email } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user || user.password !== password) {
      return res.status(500).json({
        error: "Invalid email or password"
      });
    }

    const payloadForJwt = {
      id: user.id,
      name: user.name,
      email: user.email
    }

    const JWT_SECRET = 'secret';
    const jsonData = {
      token: jwt.sign(payloadForJwt, JWT_SECRET, { expiresIn: '2 days'}),
      message: 'Signed in successfully!',
      success: true
    }

    return res.status(200).json(jsonData);
  } catch (error) {
    console.log("login -> error", error)
    return res.status(500).json({
      error: error
    });
  }
}

module.exports = {
  index,
  signup,
  login
}