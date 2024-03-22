import mongoose from "mongoose";
import CategoryModel from "./CategoryModel";


const productSchema = new mongoose.Schema({
name:{
    type:String,
    required:true,
    trim:true
},
slug:{
    type:String,
    required:true,
},
description:{
    type:String,
    required:true,
},
category:{
    type:mongoose.ObjectId,
    ref:Category,
    required:true,
},
quantity:{
    type:Number,
    required:true,
},
photo:{
    type:Buffer,
    contentType:String
},
shipping:{
    type:Boolean
}
},{timestamps:true})

export default mongoose.model('Products', productSchema)