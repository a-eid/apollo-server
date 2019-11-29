import { User, Task } from "../models"

async function createUser(_, { input }) {
  const { name, email } = input
  const user = await User.create({ name, email })
  return user
}

export default {
  Query: {
    user(_, { id }) {
      return User.findById(id)
    },
    users() {
      return User.find({})
    },
  },

  Mutation: {
    createUser,
  },

  User: {
    async tasks(parent) {
      return Task.find({ user: parent })
    },
  },
}
