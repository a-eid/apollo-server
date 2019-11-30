import { User, Task } from "../models"
import { auth, combineResolvers } from "./middleware"

async function createTask(_, { input }, { user }) {
  const { name } = input

  const task: any = await Task.create({
    name,
    completed: false,
    user,
  })

  user.tasks.push(task)
  await user.save()
  return task
}

function getTask(_, { id }, { user }) {
  return Task.findOne({ id, user })
}

function getTasks(_, __, { user }) {
  return Task.find({ user })
}

export default {
  Query: {
    task: combineResolvers(auth, getTask),
    tasks: combineResolvers(auth, getTasks),
  },

  Mutation: {
    createTask: combineResolvers(auth, createTask),
  },
  Task: {
    async user(parent) {
      const { user } = parent
      return User.findById(user)
    },
  },
}
