import fs from "fs";
import ProductModel from "../model/ProductModel.js";
import slugify from "slugify";

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });

        case !description:
          return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });

      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });

      case !category:
        return res.status(500).send({ error: "Category is required" });

      case photo && photo.size > 100000:
        return res
          .status(500)
          .send({ error: "Photo is required and size less than 1 mb" });
    }

    const product = new ProductModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creating product",
      error,
    });
  }
};


//  updateProductController
export const updateProductController =async(req,res) => {
    try {
      const {name,description,category,slug, quantity,price}   = req.fields;
      const {photo} = req.files;
      switch(true){
        case !name:
            return res.status(500).send({ error: "Name is required" });
    
          //   case !description:
          //     return res.status(500).send({ error: "Description is Required" });
          case !price:
            return res.status(500).send({ error: "Price is Required" });
    
          case !quantity:
            return res.status(500).send({ error: "Quantity is required" });
    
          case !category:
            return res.status(500).send({ error: "Category is required" });
    
          case photo && photo.size > 100000:
            return res
              .status(500)
              .send({ error: "Photo is required and size less than 1 mb" });
        }
     const updateProducts=    await ProductModel.findByIdAndUpdate(req.params.pid,
        {...req.fields,slug: slugify(name)},{new: true})
if (photo) {
    updateProducts.photo.data = fs.readFileSync(photo.path);
    updateProducts.photo.contentType = photo.type;
}
res.status(201).send({
    success: true,
    message: "Product updated successfully",
    updateProducts
 
})
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error updating product",
            error,
        })
        
    }
}
//  Get all products
export const getAllProductsController = async (req, res) => {
  try {
    const getAllProducts = await ProductModel.find({}).populate("category")
      .select("-photo")
      .sort({ createdAt: -1 }).limit(15)
    res.status(200).send({
      success: true,
      message: "Products fetched successfully",
      totalCount: getAllProducts.length,
      getAllProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error getting products",
      error,
    });
  }
};


//  Get Single Product

export const getSingleProductController = async (req, res) => {
  try {
 const getSingleProduct = await ProductModel.findOne({slug: req.params.slug}).populate("category").select("-photo")
 console.log(getSingleProduct);
 res.status(201).send({
    success: true,
    message: "single Product fetched successfully",
    getSingleProduct
 })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error getting single product",
      error,
    });
  }
};


//  Get Photo 

export const getPhotoController = async (req, res) => {
try {
    
    const getPhoto = await ProductModel.findById(req.params.pid).select("photo")
    if(getPhoto.photo.data){
        res.set("Content-Type", getPhoto.photo.contentType)
        return res.status(201).send(getPhoto.photo.data)
    }
} catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error getting photo",
      error,
    });
  }
    
}
