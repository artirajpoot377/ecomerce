const mongoose = require("mongoose")
const objectId = mongoose.Schema.Types.ObjectId
// const {Schema} = mongoose
const NotesSchema = new mongoose.Schema(
    {

        userId: {
        type: objectId,
        ref: "User",
        required: true
    },
        title: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
       
        description: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        tag: {
            type: String,
            required: true,
            trim: true
        },
        date:{
            type: Date,
            default:Date.now
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date,
            default: null
        },
    },
    { timestamps: true });


module.exports = mongoose.model('Notes', NotesSchema)