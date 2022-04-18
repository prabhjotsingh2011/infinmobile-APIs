const mongoose = require('mongoose');
const User=require('./User.js')
const shopSchema = mongoose.Schema({
    shopName: {
        type: String,
        required: true
    },
    shopDescription: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: false
    },
    companyUEN: {
        type: String,
    },
    logo: {
        type: String,
        required: true
    },
    notification: {
        type: Object,
        default: {
            pushNotification: false,
            chatNotification: false,
            followerNotification: false,
            checkoutNotification: false,
            orderSettings: false,
            lowStockCount: false
        }

    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
}, {
    timestamps: true,
    // toJSON: { getters: true }
})
module.exports = mongoose.model('Shop', shopSchema, 'shops');