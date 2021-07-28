const express = require('express');
const router = express.Router();
const multer = require('multer');

const adminController = require('../controllers/admin.controller');
const productController = require('../controllers/product.controller');
const requireAuth = require('../middlewares/auth.controller');

// UPLOAD IMAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (
            file.mimetype == "image/bmp" ||
            file.mimetype == "image/png" ||
            file.mimetype == "image/gif" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true)
        } else {
            return cb(new Error("only image are allowed!"));
        }
    }
});
router.get('/', adminController.admin);

router.get('/login', adminController.login);

router.get('/register', adminController.register);

router.post('/login', adminController.postLogin);

router.post('/register', adminController.postRegister);

router.get('/logout', adminController.logout);

/* 
            PRODUCTS
*/
router.get('/product/add', requireAuth.requireAuth, productController.getAdd);

router.post('/product/add', requireAuth.requireAuth, productController.postAdd);

router.get("/product/edit/:id", requireAuth.requireAuth, productController.getEdit);

router.post("/product/edit/:id", upload.single('image'), productController.postEdit);

router.get('/product/delete/:id', requireAuth.requireAuth, productController.delete);




module.exports = router;