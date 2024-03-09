import express from "express"
import { registerUser, login } from "../controller/userController"

const router = express.Router()

router.post("/login",login)
router.post("/register",registerUser)


export default router