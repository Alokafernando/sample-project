import { Request, Response } from "express"
import { Role, Status, User } from "../models/user.model"
import bcrypt from "bcryptjs"
import { signAccessToken } from "../utils/tokes"


export const register = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password, role } = req.body

    if (!firstname || !lastname || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required!" })
    }

    if (role !== Role.USER && role !== Role.AUTHOR) {
      return res.status(400).json({ message: "Invalid role!" })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists!" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const approvalStatus =
      role === Role.AUTHOR ? Status.PENDING : Status.APPROVED

    const newUser = new User({
      firstname,
      lastname,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: [role], 
      approved: approvalStatus,
    })

    await newUser.save()

    return res.status(201).json({
      message: "Registration successful!",
      data: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        approved: newUser.approved,
      },
    })
  } catch (err: any) {
    res.status(500).json({ message: err?.message})
  }
}

//login
export const login = async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body

    const existingUser = await User.findOne({ email})
    if (!existingUser) {
        return res.status(401).json({message: "Invalid credentials"})
    }

    const valid = await bcrypt.compare(password, existingUser.password)
    if (!valid) {
        return res.status(401).json({message: "Invalid credentials"})
    }


    const accessToken = signAccessToken(existingUser)

    res.status(200).json({
        message: "Success",
        data: {
            email: existingUser.email,
            roles: existingUser.password,
            accessToken
        }
    })


  } catch (err: any) {
    res.status(500).json({ message: err?.message })
  }
}

export const getMyDetails = (req: Request, res: Response) => {

    if (!req.user) {
        return res.status(401).json({message: "Unauthorized"})
    }

    res.status(200).json({message: "OK"})
}

export const registerAdmin = (req: Request, res: Response) => {}
