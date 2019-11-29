import "dotenv/config"
import * as fs from "fs"
import { ApolloServer, gql } from "apollo-server"
import * as mongoose from "mongoose"
import resolvers from "./resolvers"

export async function startServer() {
  mongoose.set("debug", true)
  await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

  const typeDefs = fs.readFileSync("src/schema.graphql", "utf-8")
  const server = new ApolloServer({ typeDefs, resolvers })
  return await server.listen(process.env.PORT)
}
