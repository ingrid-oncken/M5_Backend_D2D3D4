import { body } from "express-validator"

export const authorsValidadtionMiddleware = [
  body("name").exists().withMessage("Name is a mandatory field!"),
  body("surname").exists().withMessage("Surname is a mandatory field"),
  body("email")
    .exists("email is a mandatory field!")
    .isEmail()
    .withMessage("Please send a valid email")

]

//name, surname, ID, email, date of birth, avatar
