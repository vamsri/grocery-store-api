const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

router.post('/orders', authMiddleware, permissionCheck('order.create'), orderController.createOrder);
router.get('/orders', authMiddleware, permissionCheck('order.list'), orderController.getAllOrders);
router.get('/orders/:orderId', authMiddleware, permissionCheck('order.view'), orderController.getOrderById);
router.patch('/orders/:orderId', authMiddleware, permissionCheck('order.update'), orderController.updateOrder);
router.delete('/orders/:orderId', authMiddleware, permissionCheck('order.delete'), orderController.deleteOrder);

module.exports = router;