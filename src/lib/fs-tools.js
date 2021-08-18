import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

//here are some cool methods from fs-extra library
const { readJSON, writeJSON } = fs

const blogPostsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/blogPosts.json"
)
const authorsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/authors.json"
)

export const getBlogPosts = () => blogPostsJSONPath
export const writeBlogPosts = () => {}
export const getAuthors = () => authorsJSONPath
export const writeAuthors = () => {}
