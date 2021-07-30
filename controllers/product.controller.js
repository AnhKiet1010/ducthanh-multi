const Product = require('../models/product');
const Category = require('../models/category');
const { cloudUploadImage } = require('../middlewares/cloudinary');

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
    const {
        categoryId,
        title,
        desc,
        customer
    } = req.body;

    const images = [];
    for (let file of req.files) {
        let uploadedFilePath = await cloudUploadImage(file.path);
        let obj = {
            type: 'image',
            url: uploadedFilePath
        }
        images.push(obj);
    }

    console.log(images);


    const product = new Product({
        categoryId,
        title,
        desc,
        customer,
        links: images,
        createdAt: new Date().toLocaleString("vi", { timeZone: "Asia/Ho_Chi_Minh" })
    });

    product.save(function (err) {
        if (err) {
            return res.send('Server Error');
        } else {
            res.redirect('/admin');
        }
    });
}

module.exports.detail = async function (req,res) {
    const { id } = req.params;
    const product = await Product.findOne({_id: id}).exec();

    res.render('./admin/detailProduct', {
        title: product.title,
        data: {
            product
        }
    });
}

module.exports.getEdit = async function (req, res) {
}

module.exports.postEdit = async function (req, res) {
}

module.exports.delete = async function (req, res) {
}