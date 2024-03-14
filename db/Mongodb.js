import mongoose from "mongoose";
import colors from "colors"


const  Mongodb = async()=> {
 try {
    const connected= await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Mongo Database is connected : ${connected.connection.host}` .bgMagenta.white)
    
       
 } catch (error) {
    console.log(error);
    console.log("Error connecting to database Mongodb ".bgRed.white)
 }
   
}

export default Mongodb

