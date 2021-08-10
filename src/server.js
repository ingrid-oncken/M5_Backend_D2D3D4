import express from "express"
import listEndpoints from "express-list-endpoints"
import authorsRouter from "./services/authors/index.js"

const server = express()
const port = 3001

server.use("/authors", authorsRouter)

server.listen(port, () => {
  console.log("Server listening to the port " + port)
})
console.table(listEndpoints(server))
