const mongoose=require('mongoose')


const productSchema=mongoose.Schema({
   image:String,
   name:String,
   price:String,
    category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"   // <-- yahan Category schema register hona chahiye
  }
   
})
module.exports=mongoose.model("Product",productSchema)