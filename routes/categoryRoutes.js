const express = require('express');
const categoryController = require('../controllers/categoryController');
const {authMiddleware, permissionCheck} = require('../middleware/authMiddleware');
const router = express.Router();
const multer = require('multer');

const parser = multer({dest: 'store/dev'});

router.post('/categories', authMiddleware, permissionCheck('content.create'), categoryController.createCategory);
router.get('/categories', authMiddleware, permissionCheck('content.list'), categoryController.getCategories);
router.get('/categories/:catId', authMiddleware, permissionCheck('content.view'), categoryController.getCategoryById);
router.patch('/categories/:catId', authMiddleware, permissionCheck('content.update'), categoryController.updateCategory);
router.delete('/categories/:catId', authMiddleware, permissionCheck('content.delete'), categoryController.deleteCategory);
router.post('/categories/:catId/upload', authMiddleware, permissionCheck('content.update'), parser.single('image'), categoryController.updateImage);

module.exports = router;