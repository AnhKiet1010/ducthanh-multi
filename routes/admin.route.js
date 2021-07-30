const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');
const productController = require('../controllers/product.controller');
const requireAuth = require('../middlewares/auth.controller');
const upload = require('../middlewares/upload');


router.get('/', adminController.admin);

router.get('/login', adminController.login);

router.get('/register', adminController.register);

router.post('/login', adminController.postLogin);

router.post('/register', adminController.postRegister);

router.get('/logout', adminController.logout);

/* 
            PRODUCTS
*/
router.get('/product/add', productController.getAdd);

router.post('/product/add', upload.array('files', 12), productController.postAdd);

router.get('/product/detail/:id', productController.detail);

router.get("/product/edit/:id", productController.getEdit);

router.post("/product/edit/:id", productController.postEdit);

router.get('/product/delete/:id', productController.delete);




module.exports = router;