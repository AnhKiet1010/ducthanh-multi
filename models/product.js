const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema({
    categoryId: String,
    title: String,
    desc: String,
    featured: String,
    links: Array,
    customer: String,
    createdAt: String
});

module.exports = mongoose.model("product", product);