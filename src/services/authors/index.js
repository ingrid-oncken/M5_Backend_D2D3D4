//here I get, put, post
import express, { response } from "express"
import uniqid from "uniqid"
import { request } from "http"
import { validationResult } from "express-validator"
import { authorsValidadtionMiddleware } from "./validation"

//express.Router() create the endpoints, creates a set ofExpress routes
const authorsRouter = express.Router()

//import.meta.url give us info about the url of the current module
//fileURLToPath converts that url into a path
// const currentFilePath = fileURLToPath(import.meta.url)

//dirname extracts the directory name from the specified path
// const currentDirPath = dirname(currentFilePath)

//join is the safest way to concatenate two paths together
// const authorsJSONPath = join(currentDirPath, "authors.json")
// console.log(authorsJSONPath)

authorsRouter.post("/", authorsValidadtionMiddleware, (req, res) => {
  console.log(req.body)
  console.log(uniqid())

  const errorList = validationResult(req)

  if (!errorList.isEmpty()) {
    res.status(400).send(errorList)
  } else {
    //1. read the request body obtaining the new authors data
    const newAuthor = { ...req.body, ID: uniqid(), creatAt: new Date() }

    //2. read the content of authors.json file
    const authors = JSON.parse(fs.readFileSync(authorsJSONPath))

    //3. adding/pushing new author to the array
    authors.push(newAuthor)

    //4. rewrite the array including the new author, into the authors.json file
    fs.writeFileSync(authorsJSONPath, JSON.stringify(authors))

    //5. sending back the response with extra info like id
    res.status(201).send({ ID: newAuthor.ID })
  }
})

authorsRouter.get("/", (req, res) => {
  //1. read authors.json file and get back an array os authors
  const fileContent = fs.readFileSync(studentsJSONPath) //here I receive data as BUFFER

  //2. send back a response as array of authors
  res.send(JSON.parse(fileContent))
})

authorsRouter.get("/:ID", (req, res) => {
  //1. read authors.json file and get the array of authors
  const authors = JSON.parse(fs.readFileSync(studentsJSONPath))

  //2.find the one with the specified id
  const author = authors.find((a) => a.ID === request.params.ID)

  //3. send it back as response
  res.send()
})

// PUT = UPDATE
//read the files -> search the student -> ready the body data -> modify the student ->
//save -> send res    !!!Do not forget to convert the stuff!!!
authorsRouter.put("/:ID", (req, res) => {
  //1.
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath))

  //2.
  const remainingAuthors = authors.filter(
    (author) => authorID != request.params.authorID
  )
  const updateAuthor = { ...request.body, ID: request.params.studentID }
  remainingAuthors.push(updateAuthor)

  //3. save the file with the updated list
  fs.writeFileSync(studentsJSONPath, JSON.stringify(remainingAuthors))

  //send back response
  res.send(updateAuthor)
})

authorsRouter.delete("/:ID", (req, res) => {
  //1. read json file
  const authors = JSON.parse(fs.readFileSync(studentsJSONPath))

  //2. filter out the author with that specific ID
  const remainingAuthors = authors.filter(
    (author) => author.ID != request.params.authorID
  )

  //3. write remaining authors on the json file
  fs.writeFileSync(studentsJSONPath, JSON.stringify(remainingAuthors))

  //4. sending the response
  res.status(204).send()
})

export default authorsRouter
