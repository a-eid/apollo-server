import { startServer } from "./src/server"

startServer().then(({ url }) => {
  console.log(`server started at ${url}`)
})
