import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createCategoryController, updateCategoryController } from "../controller/CategoryController.js";

const router = express.Router()

router.post("/create-category", requireSignIn, isAdmin, createCategoryController)

router.put("/update-category", requireSignIn, isAdmin, updateCategoryController)

export default router