const mongoose = require("mongoose");
const validEmail = function (email) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-][a-z]{1,4}$/
    return emailRegex.test(email)
}


const validPassword = function (password) {
    const passwordRegex = /^[a-zA-Z0-9]{6,10}$/
    return passwordRegex.test(password)
}
const validObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}
const validValue = function (data) {
    if (typeof (data) === undefined || typeof (data) === null) { return false }
    if (typeof (data) === "string" && data.trim().length > 0) { return true }
    if (typeof (data) === "number" && data.trim().length > 0) { return true }
}

module.exports = { validEmail, validValue, validPassword, validObjectId}