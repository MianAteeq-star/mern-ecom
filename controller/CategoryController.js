import CategoryModel from "../model/CategoryModel.js";

import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "name is required",
      });
    }
    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category already exists",
      });
    }
    const newCategory = await CategoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "Category succesfully created",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "error in category controller",
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    if (!name) {
      return res.status(500).send({
        success: false,
        message: "name is required",
      });
    }
    const updateCategory = await CategoryModel.findByIdAndUpdate(id, {
      name,
      slug: slugify(name),
      
    },{new:true});
    res.status(201).send({
      success: true,
      message: "Category succesfully updated",
      updateCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "error in update category controller",
    });
  }
};

// Get all categories

export const getAllCategoryController = async (req, res) => {
  try {
    
const getAll = await CategoryModel.find({})
res.status(200).send({
  success: true,
  message: "Category succesfully fetched",
  getAll,
})

  } catch (error) {
    console.log('error ', error )
    
    res.status(500).send({
      success: false,
      error,
      message: "error in getAllCategoryController",
    })
  }
}
// Get one category
export const getSingleCategoryController = async(req, res) => {
  try {
   
    const getSingleCategory = await CategoryModel.findOne({slug: req.params.slug})
    console.log('getSingleCategory', getSingleCategory)
    res.status(200).send({
      success: true,
      message: "Single Category  succesfully fetched",
      getSingleCategory,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in getSingleCategoryController",
    })
  }
}
//  Delete a category

export const deleteCategoryController= async(req, res) => {
  try {
    const {id} =req.params
    const deleteCategory = await CategoryModel.findByIdAndDelete(id)
    res.status(200).send({
      success: true,
      message: "Category succesfully deleted",
      deleteCategory,
    })
  } catch (error) {

    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in deleteCategoryController",
    })
  }
}
