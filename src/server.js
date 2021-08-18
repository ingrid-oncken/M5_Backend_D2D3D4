import express from "express"
import listEndpoints from "express-list-endpoints"
import authorsRouter from "./services/authors/index.js"
import blogRouter from "./services/blog/index.js"
import cors from "cors"

//server to listen on the port, it is stores into a variable
const server = express()
const port = 3001

//*********** MIDDLEWARE ***************************

const loggerMiddleware = (req, res, next) => {
  console.log(`Req method ${req.method} -- Req URL ${req.url} -- ${new Date()}`)
  next()
}

server.use(loggerMiddleware)
//cors and express are middlewares
server.use(cors()) //cors connect BE with FE

//this has to be specified BEFORE the routes, otherwise the body will be undefined, and 
server.use(express.json()) 

server.use("/authors", authorsRouter)

server.use("/blogPosts", blogRouter)

console.table(listEndpoints(server))

server.listen(port, () => {
  console.log("Server listening to the port " + port)
})
