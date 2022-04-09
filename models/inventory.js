const mongoose=require('mongoose');

const inventorySchema=mongoose.Schema({
    shopId:{
        type:String,
    },
    productName:{
        type:String,
    },
    productDescription:{
        type:String,
        required:false
    },
    category:{
        type:String,
    },
    productPrice :{
        type:String,
    },
    productImage:{
        type:String,
        required:false 
    },
    sizes:{
        type:[  
            {
                size:{
                    type:String,
        
                },
                quantity:{
                    type:String,
        
                },
                color:{
                    type:String,
        
                },
            }
        ]
    }
}, {
    timestamps: true,
    // toJSON: { getters: true }
})
module.exports = mongoose.model('Inventory', inventorySchema, 'inventorys');