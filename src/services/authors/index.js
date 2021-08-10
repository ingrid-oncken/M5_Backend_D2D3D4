//here I get, put, post
import express, { response } from "express"
import { fileURLToPath } from "url" // core
import { dirname, join } from "path" // core
import fs from "fs" // core
import uniqid from "uniqid"

const authorsRouter = express.Router()

const currentFilePath = fileURLToPath(import.meta.url)
const currentDirPath = dirname(currentFilePath)
const authorsJSONPath = join(currentDirPath, "authors.json")

authorsRouter.post("/", (req, res) => {
  console.log(req.body)
  console.log(uniqid())

  const newAuthor = { ...req.body, ID: uniqid(), creatAt: new Date() }

  const authors = JSON.parse(fs.readFileSync(authorsJSONPath))

  authors.push(newAuthor)

  fs.writeFileSync(authorsJSONPath, JSON.stringify(authors))

  response.status(201).send({ID: newAuthor.ID})
})

export default authorsRouter
