const express = require('express');
const productController = require('../controllers/productController');
const {authMiddleware, permissionCheck} = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/products', authMiddleware, permissionCheck('product.create'), productController.createProduct);
router.get('/products/categories/:catId', authMiddleware, permissionCheck('product.list'), productController.getProducts);
router.get('/products/categories/{catid}/products/{prodid}', authMiddleware, permissionCheck('product.view'), productController.getProductById);
router.patch('/products/categories/{catid}/products/{prodid}', authMiddleware, permissionCheck('product.update'), productController.updateProduct);
router.delete('/products/categories/{catid}/products/{prodid}', authMiddleware, permissionCheck('product.delete'), productController.deleteProduct);

module.exports = router;