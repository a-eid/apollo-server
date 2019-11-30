import { User, Task } from "../models"
import { hash, compare } from "bcrypt"
import { sign } from "jsonwebtoken"

import { auth, combineResolvers } from "./middleware"

async function register(_, { input }) {
  const { name, email, password } = input
  const hashedPassword = await hash(password, 12)
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  const token = sign({ id: user.id }, process.env.JWT_SECRET)

  return {
    token,
    user,
  }
}

async function login(_, { input }) {
  const { email, password } = input
  const user: any = await User.findOne({ email })

  if (await compare(password, user.password)) {
    const token = sign({ id: user.id }, process.env.JWT_SECRET)
    return {
      token,
      user,
    }
  }

  throw new Error("Invalid creds")
}

export default {
  Query: {
    me: combineResolvers(auth, (_, __, { user }) => user),
  },

  Mutation: {
    register,
    login,
  },

  User: {
    async tasks(parent) {
      return Task.find({ user: parent })
    },
  },
}
