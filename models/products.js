const mongoose=require('mongoose')


const productsSchema=mongoose.Schema({
   image:String,
   name:String,
   price:String,
   
})
module.exports=mongoose.model("products",productsSchema)