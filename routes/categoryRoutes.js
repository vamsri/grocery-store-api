const express = require('express');
const categoryController = require('../controllers/categoryController');
const {authMiddleware, permissionCheck} = require('../middleware/authMiddleware');
const router = express.Router();
const multer = require('multer');

const parser = multer({dest: 'store/dev'});

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Returns a list of users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.post('/categories', authMiddleware, permissionCheck('content.create'), categoryController.createCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Returns a list of users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get('/categories', categoryController.getCategories);
router.get('/categories/:catId', categoryController.getCategoryById);
router.patch('/categories/:catId', authMiddleware, permissionCheck('content.update'), categoryController.updateCategory);
router.delete('/categories/:catId', authMiddleware, permissionCheck('content.delete'), categoryController.deleteCategory);
router.post('/categories/:catId/upload', authMiddleware, permissionCheck('content.update'), parser.single('image'), categoryController.updateImage);

module.exports = router;