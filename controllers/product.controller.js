const Product = require('../models/product');
const Category = require('../models/category');

module.exports.list = async function (req, res) {
    const Product_type = req.params.categoryId;
    const page = req.params.page || 1;
    const perPage = 5;

    const data = await Product.find({ Product_type })
        .sort({ _id: 1 })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec();

    const count = await Product.countDocuments().exec();

    res.render('./pages/support/helpAndResource/Product/listProduct', {
        data: data,
        total: count,
        title: "Product || VGF",
        current: page,
        pages: Math.ceil(count / perPage),
        lang: req.cookies.lang
    });
}


module.exports.getAdd = async function (req, res) {

    const listCategory = await Category.find({}).exec();
    
    res.render('./admin/addProduct', {
        title: "Thêm Sản Phẩm || Admin",
        data: {
            listCategory
        }
    });
}

module.exports.postAdd = async function (req, res) {
    const Product_type = req.params.categoryId;
    const page = req.params.page || 1;
    const perPage = 5;

    const data = await Product.find({ Product_type })
        .sort({ _id: 1 })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec();

    const count = await Product.countDocuments().exec();

    res.render('./pages/support/helpAndResource/Product/listProduct', {
        data: data,
        total: count,
        title: "Product || VGF",
        current: page,
        pages: Math.ceil(count / perPage),
        lang: req.cookies.lang
    });
}

module.exports.getEdit = async function (req, res) {
}

module.exports.postEdit = async function (req, res) {
}

module.exports.delete = async function (req, res) {
}