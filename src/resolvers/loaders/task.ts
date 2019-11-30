import { Task } from "../../models"

async function fetchTasks(ids: [string]) {
  const cache = {}
  ;(await Task.find({ _id: { $in: ids } })).forEach(user => {
    cache[user.id] = user
  })
  return ids.map(id => cache[id])
}

async function getUserTasks(ids: [string]) {
  const cache = {}
  const tasks = await Task.find({ user: { $in: ids } }).populate("user", "id")

  tasks.forEach((task: any) => {
    cache[task.user.id] = cache[task.user.id] || []
    cache[task.user.id].push(task)
  })

  return ids.map(id => cache[id])
}

export default {
  fetchTasks,
  getUserTasks,
}
