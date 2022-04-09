const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    DOB: {
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
    password: {
        type: String,
        required: false,
    },
    photo: {
        type: String,
        required: false
    },
    AuthId: {
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