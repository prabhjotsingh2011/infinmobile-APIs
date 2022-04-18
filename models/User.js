const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    mobile:{
        type: Number,
        required: false
    },
    password: {
        type: String,
        required: false,
    },
    photo: {
        type: String,
        required: false
    },
    authid: {
        type: String,
        required: false
    },
    notification: {
        type: Object,
    },
    followers: {
        type: Array,
    },
    followings: {
        type: Array,
    }


}, {
    timestamps: true,
    // toJSON: { getters: true }
})

module.exports = mongoose.model('User', userSchema, 'users');