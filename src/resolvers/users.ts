import { User, Task } from "../models"
import { hash, compare } from "bcrypt"
import { sign } from "jsonwebtoken"

import { auth, combineResolvers } from "./middleware"
import { pubSub, channels, usersub } from "./subscriptions"

async function register(_, { input }) {
  const { name, email, password } = input
  const hashedPassword = await hash(password, 12)
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  const token = sign({ id: user.id }, process.env.JWT_SECRET)

  pubSub.publish(channels.userAdded(), { userAdded: user })

  return {
    token,
    user,
  }
}

async function login(_, { input }) {
  const { email, password } = input
  const user: any = await User.findOne({ email })

  if (user && (await compare(password, user.password))) {
    const token = sign({ id: user.id }, process.env.JWT_SECRET)
    return {
      token,
      user,
    }
  }

  throw new Error("invalid Creds")
}

export default {
  Query: {
    me: combineResolvers(auth, (_, __, { user }) => user),
  },

  Mutation: {
    register,
    login,
  },
  Subscription: usersub,
  User: {
    async tasks(parent, _, { loaders: { getUserTasks, user } }) {
      return getUserTasks.load(parent.id)
    },
  },
}
