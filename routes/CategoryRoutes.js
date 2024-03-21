import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createCategoryController, deleteCategoryController, getAllCategoryController, getSingleCategoryController, updateCategoryController } from "../controller/CategoryController.js";

const router = express.Router()


// create category 
router.post("/create-category", requireSignIn, isAdmin, createCategoryController)

// update category by id

router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController)


//  get all categories
router.get("/getall-category",  getAllCategoryController)


// get single category by slug
router.get("/getsingle-category/:slug",  getSingleCategoryController)

// delete single category by id
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController)

export default router