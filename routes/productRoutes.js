const express = require('express');
const productController = require('../controllers/productController');
const {authMiddleware, permissionCheck} = require('../middleware/authMiddleware');
const multer = require('multer');

const router = express.Router();
const parser = multer({dest: 'store/dev'});

router.post('/products', authMiddleware, permissionCheck('product.create'), productController.createProduct);
router.get('/products', productController.getProducts);
router.get('/products/category/:catId', productController.getProductsByCategory);
router.get('/products/:prodId', productController.getProductDetails);
router.patch('/products/:prodId', authMiddleware, permissionCheck('product.update'), productController.updateProduct);
router.delete('/products/:prodId', authMiddleware, permissionCheck('product.delete'), productController.deleteProduct);
router.post('/products/:prodId/upload', authMiddleware, permissionCheck('product.update'), parser.single('image'), productController.updateImage);

module.exports = router;

