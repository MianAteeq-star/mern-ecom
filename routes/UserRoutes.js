import express from "express"
import { forgotPasswordController, loginController, registerController } from "../controller/UserController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"


const router = express.Router()


// Register Post request handlers

router.post("/register", registerController)


// Login Post request handlers

router.post('/login', loginController)


// Forgot password Post request handlers

router.post("/forgot-password", forgotPasswordController)



//  Protected Routes auth

router.get("/user-auth", requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})

// Admin routes auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });



export default router;