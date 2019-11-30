import { verify } from "jsonwebtoken"
import { Request } from "express"

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
  }
}
