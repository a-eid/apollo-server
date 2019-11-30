import "dotenv/config"
import * as http from "http"
import * as express from "express"
import { ApolloServer } from "apollo-server-express"
import * as mongoose from "mongoose"

import resolvers from "./resolvers"
import schema from "./schema"
import context from "./context"
import { pubSub, channels } from "./resolvers/subscriptions"

export async function startServer() {
  mongoose.set("debug", true)
  await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context,
    subscriptions: {
      onConnect: req => {
        return req
      },
    },
  })

  const app = express()
  const httpServer = http.createServer(app)
  server.installSubscriptionHandlers(httpServer)
  server.applyMiddleware({ app })

  return new Promise(resolve => {
    httpServer.listen(process.env.PORT, () => {
      resolve(server)
    })
  })
}
