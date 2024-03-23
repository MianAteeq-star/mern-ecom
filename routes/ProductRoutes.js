import express from "express"
import { createProductController, getAllProductsController, getPhotoController, getSingleProductController, updateProductController } from "../controller/ProductController.js"
import formidable from "express-formidable";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"

const router = express.Router()

// create product
router.post("/create-products",requireSignIn, isAdmin, formidable() ,createProductController)

// Update products
router.put("/update-products/:pid", requireSignIn,isAdmin, formidable(), updateProductController)
// get all products
router.get("/getAll-products",getAllProductsController)


// get single products
router.get("/getAll-products/:slug",getSingleProductController)


// Get Photo 
router.get("/get-photo/:pid",getPhotoController)






export default router