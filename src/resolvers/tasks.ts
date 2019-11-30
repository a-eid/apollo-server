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

async function getTasks(_, { pagination: { cursor = null, limit = 5 } = {} }, { user }) {
  let tasks = await Task.find({ user, ...(cursor ? { _id: { $lt: cursor } } : {}) })
    .sort({ _id: -1 })
    .limit(limit + 1)

  const hasMore = tasks.length > limit

  if (hasMore) {
    tasks = tasks.slice(0, limit)
  }

  return {
    data: tasks,
    pagination: {
      cursor: hasMore ? tasks[tasks.length - 1].id : null,
      hasMore,
    },
  }
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
