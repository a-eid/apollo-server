import "dotenv/config"
import { ApolloServer } from "apollo-server"
import * as mongoose from "mongoose"

import resolvers from "./resolvers"
import schema from "./schema"
import context from "./context"

export async function startServer() {
  mongoose.set("debug", true)
  await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context,
  })
  return await server.listen(process.env.PORT)
}
