import "dotenv/config"
import * as fs from "fs"
import { ApolloServer, gql } from "apollo-server"
import * as mongoose from "mongoose"

import resolvers from "./resolvers"
import schema from "./schema"

export async function startServer() {
  mongoose.set("debug", true)
  await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

  const server = new ApolloServer({ typeDefs: schema, resolvers })
  return await server.listen(process.env.PORT)
}
