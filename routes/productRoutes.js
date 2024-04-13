const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.post('/products', authMiddleware, permissionCheck('product.create'), productController.createProduct);
router.get('/products', authMiddleware, permissionCheck('product.list'), productController.getProducts);
router.get('/products/:productId', authMiddleware, permissionCheck('product.view'), productController.getProductById);
router.patch('/products/:productId', authMiddleware, permissionCheck('product.update'), productController.updateProduct);
router.delete('/products/:productId', authMiddleware, permissionCheck('product.delete'), productController.deleteProduct);

module.exports = router;