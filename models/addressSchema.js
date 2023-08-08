const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    academyname: {
        type: String
    },
    country: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: Number,
        required: true
    },
    phone: {
        type: String
    }
});

const Address = new mongoose.model("address", addressSchema);
module.exports = Address;