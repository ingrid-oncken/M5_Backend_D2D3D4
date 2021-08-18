import express from "express"
import uniqid from "uniqid"
import { getBlogPosts, writeBlogPosts } from "../../lib/fs-tools.js"


// console.log({ blogPostsJSONPath })
const blogRouter = express.Router()

//GET
blogRouter.get("/", (req, res) => {
  const blogPosts = getBlogPosts()
  res.send(blogPosts)
})

//POST
blogRouter.post("/", (req, res) => {
  const blogPosts = getBlogPosts()
  const newBlogPost = { ...req.body, id: uniqid(), createdAt: new Date() }

  blogPosts.push(newBlogPost)

  writeBlogPosts(blogPosts)
  res.status(201).send({ id: newBlogPost.id })
})

//Delete
blogRouter.delete("/:id", (req, res) => {
  const blogPosts = getBlogPosts()

  const remainingBlogPosts = blogPosts.filter((bp) => bp.id !== req.params.id)

  writeBlogPosts(remainingBlogPosts)

  res.status(204).send()
})

//GET Single
blogRouter.get("/:id", (req, res) => {
  const blogPosts = getBlogPosts()

  const blogPost = blogPosts.find((bp) => bp.id === req.params.id)
  res.send(blogPost)
})

//PUT
blogRouter.put("/:id", (req, res) => {
  const blogPosts = getBlogPosts()
  const prevData = blogPosts.find((bp) => bp.id === req.params.id)
  const modifiedBlogPost = { ...prevData, ...req.body, id: req.params.id }

  const remainingBlogPosts = blogPosts.filter((bp) => bp.id !== req.params.id)
  remainingBlogPosts.push(modifiedBlogPost)

  writeBlogPosts(remainingBlogPosts)
  res.status(204).send(modifiedBlogPost)
})

export default blogRouter
