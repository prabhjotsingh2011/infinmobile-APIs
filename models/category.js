const mongoose=require('mongoose');

const categorySchema=mongoose.Schema({
    parentcategory:{
        type:String,
        required:true 
    },
    categoryname:{
        type:String,
        required: true,
    },
    categorycolor:{
        type:String,
        required:true
    },
    categoryicon:{
        type:String,
    }
                                                
}, { 
    timestamps: true,
    // toJSON: { getters: true }
})
module.exports = mongoose.model('Inventory', categorySchema, 'inventorys');