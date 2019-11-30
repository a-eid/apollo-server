import * as DataLoader from "dataloader"
import { verify } from "jsonwebtoken"
import { Request } from "express"

import { taskLoaders, userLoaders } from "./resolvers/loaders"

import { User } from "./models"

async function getUser(token) {
  try {
    const { id } = verify(token, process.env.JWT_SECRET) as { id: String }
    return await User.findById(id)
  } catch {
    return null
  }
}

export default async function context({ req }: { req: Request }) {
  const authHeader = req.headers.authorization
  const token = authHeader ? authHeader.split(" ")[1] : ""

  return {
    user: await getUser(token),
    loaders: {
      fetchUsers: new DataLoader((ids: [string]) => userLoaders.fetchUsers(ids)),
      fetchTasks: new DataLoader((ids: [string]) => taskLoaders.fetchTasks(ids)),
      getUserTasks: new DataLoader((ids: [string]) => taskLoaders.getUserTasks(ids)),
    },
  }
}
