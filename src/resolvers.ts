import User from "./models/User"
import Task from "./models/Task"

async function createUser(_, { input }) {
  const { name, email } = input
  const user = await User.create({ name, email })
  return user
}

async function createTask(_, { input }) {
  const { name, userId } = input
  const user: any = await User.findById(userId)

  const task: any = await Task.create({
    name,
    completed: false,
    user,
  })
  user.tasks.push(task)
  await user.save()
  return task
}

export default {
  Query: {
    user(_, { id }) {
      return User.findById(id)
    },
    task(_, { id }) {
      return Task.findById(id)
    },
    tasks() {
      return Task.find({})
    },
    users() {
      return User.find({})
    },
  },

  Mutation: {
    createUser,
    createTask,
  },
  Task: {
    async user(parent) {
      const { user } = parent
      return User.findById(user)
    },
  },
  User: {
    async tasks(parent) {
      return Task.find({ user: parent })
    },
  },
}
