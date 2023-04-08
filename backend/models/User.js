const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
       
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        date:{
            type: Date,
            default:Date.now
        }
    },
    { timestamps: true });


module.exports = mongoose.model('User', UserSchema)