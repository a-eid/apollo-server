import * as DataLoader from "dataloader"
import { verify } from "jsonwebtoken"
import { Request } from "express"

import { taskLoaders, userLoaders } from "./resolvers/loaders"

import { User } from "./models"

async function getUser(authHeader = "") {
  try {
    const token = authHeader.split(" ")[1]
    const { id } = verify(token, process.env.JWT_SECRET) as { id: String }
    return await User.findById(id)
  } catch {
    return null
  }
}

export default async function context({
  req: { headers = {} } = {},
  connection: { context = {} } = {},
}: {
  req: any
  connection: any
}) {
  return {
    user: await getUser(context.authorization || headers.authorization),
    loaders: {
      fetchUsers: new DataLoader((ids: [string]) => userLoaders.fetchUsers(ids)),
      fetchTasks: new DataLoader((ids: [string]) => taskLoaders.fetchTasks(ids)),
      getUserTasks: new DataLoader((ids: [string]) => taskLoaders.getUserTasks(ids)),
    },
  }
}
