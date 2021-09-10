import jwt from 'jsonwebtoken'
import User from '../models/userModel'
import { hashPassword, comparePassword } from '../utils/auth'

export const register = async (req, res, next) => {
  try {
    // console.log(req.body)
    const { name, email, password } = req.body
    // validation
    if (!name) return res.status(400).send('Name is required')
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send('Password is required and should have at least 6 characters')
    }
    let userExist = await User.findOne({ email }).exec()
    if (userExist) return res.status(400).send('Email is Taken')

    // hashPassword
    const hashedPassword = await hashPassword(password)

    // register
    const user = new User({
      name,
      email,
      password: hashedPassword,
    })
    await user.save()

    return res.status(201).json({ ok: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send('Error. Try again')
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email }).exec()

    if (!user) {
      return res.status(400).send('Incorrect email, Register instead')
    }

    const checkPassword = await comparePassword(password, user.password)
    if (!checkPassword) {
      return res.status(400).send('Incorrect Password')
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    user.password = undefined
    res.cookie('token', token, {
      httpOnly: true,
      // secure: true
    })

    res.json(user)
  } catch (err) {
    return res.status(400).send('Try again')
  }
}
