const express = require('express');
const categoryController = require('../controllers/categoryController');
const {authMiddleware, permissionCheck} = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/categories', authMiddleware, permissionCheck('content.create'), categoryController.createCategory);
router.get('/categories', authMiddleware, permissionCheck('content.list'), categoryController.getCategories);
router.get('/categories/:categoryId', authMiddleware, permissionCheck('content.view'), categoryController.getCategoryById);
router.patch('/categories/:categoryId', authMiddleware, permissionCheck('content.update'), categoryController.updateCategory);
router.delete('/categories/:categoryId', authMiddleware, permissionCheck('content.delete'), categoryController.deleteCategory);

module.exports = router;