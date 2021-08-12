//here I get, put, post
import express from "express"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import fs from "fs"
import uniqid from "uniqid"

//express.Router() create the endpoints, creates a set ofExpress routes
const authorsRouter = express.Router()

//import.meta.url give us info about the url of the current module
//fileURLToPath converts that url into a path
const currentFilePath = fileURLToPath(import.meta.url)

//dirname extracts the directory name from the specified path
const currentDirPath = dirname(currentFilePath)

//join is the safest way to concatenate two paths together
const authorsJSONPath = join(currentDirPath, "authors.json")
console.log(authorsJSONPath)

authorsRouter.post("/", (req, res) => {
  console.log(req.body)
  console.log(uniqid())

  const newAuthor = { ...req.body, ID: uniqid(), creatAt: new Date() }

  const authors = JSON.parse(fs.readFileSync(authorsJSONPath))

  authors.push(newAuthor)

  fs.writeFileSync(authorsJSONPath, JSON.stringify(authors))

  res.status(201).send({ ID: newAuthor.ID })
})

authorsRouter.get("/", (req, res) => {
  res.send("Hello I am the ")
})
authorsRouter.get("/:ID", (req, res) => {
  res.send("Hello I am the GET SINGLE endpoint")
})
authorsRouter.put("/:ID", (req, res) => {
  res.send("Hello I am the PUT endpoint")
})
authorsRouter.delete("/:ID", (req, res) => {
  res.send("Hello I am the DELETE endpoint")
})

export default authorsRouter
