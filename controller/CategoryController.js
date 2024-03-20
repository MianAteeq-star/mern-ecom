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
    const update = await CategoryModel.findByIdAndUpdate(id, {
      name,
      slug: slugify(name),
    });
    res.status(201).send({
      success: true,
      message: "Category succesfully updated",
      update,
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
