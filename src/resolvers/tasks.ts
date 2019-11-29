import { User, Task } from "../models"

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
    task(_, { id }) {
      return Task.findById(id)
    },
    tasks() {
      return Task.find({})
    },
  },

  Mutation: {
    createTask,
  },
  Task: {
    async user(parent) {
      const { user } = parent
      return User.findById(user)
    },
  },
}
