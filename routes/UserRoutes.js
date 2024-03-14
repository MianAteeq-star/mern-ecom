import express from "express"
import { loginController, registerController } from "../controller/UserController.js"


const router = express.Router()


// Register Post request handlers

router.post("/register", registerController)


// Login Post request handlers

router.post('/login', loginController)


export default router;