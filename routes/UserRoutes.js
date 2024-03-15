import express from "express"
import { loginController, registerController } from "../controller/UserController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"


const router = express.Router()


// Register Post request handlers

router.post("/register", registerController)


// Login Post request handlers

router.post('/login', loginController)



//  Protected Routes auth

router.get("/user-auth", requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });

export default router;