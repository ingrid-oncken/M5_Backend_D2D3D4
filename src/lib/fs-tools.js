import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname } from "path"

//here are some cool methods from fs-extra library
const { readJSON, writeJSON } = fs

const blogPostsJSONPath = fileURLToPath(import)

export const getBlogPosts = () => blogPostsJSONPath
export const writeBlogPosts = () => {}
export const getAuthors = () => authorsJSONPath
export const writeAuthors = () => {}
