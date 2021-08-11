import express from "express"
import listEndpoints from "express-list-endpoints"
import authorsRouter from "./services/authors/index.js"
import blogRouter from "./services/blog/index.js"
import cors from "cors"

const server = express()
const port = 3001

//*********** MIDDLEWARES ***************************

const loggerMiddleware = (req, res, next) => {
  console.log(`Req method ${req.method} -- Req URL ${req.url} -- ${new Date()}`)
  next()
}

server.use(loggerMiddleware)
//cors and express are middlewares
server.use(cors())
server.use(express.json()) //I don't really know I wrote this line

server.use("/authors", authorsRouter)
server.use("/blogPosts", blogRouter)

console.table(listEndpoints(server))

server.listen(port, () => {
  console.log("Server listening to the port " + port)
})
