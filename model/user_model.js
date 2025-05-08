var mongoose = require("mongoose");

exports.user_schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("user_model", exports.user_schema);
