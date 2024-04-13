const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');
const {authMiddleware, permissionCheck} = require('../middleware/authMiddleware');

router.post('/tenants', authMiddleware, permissionCheck('tenant.create'), tenantController.createTenant);
router.get('/tenants', authMiddleware, permissionCheck('tenant.list'), tenantController.getAllTenants);
router.get('/tenants/:tenantId', authMiddleware, permissionCheck('tenant.view'), tenantController.getTenantById);
router.patch('/tenants/:tenantId', authMiddleware, permissionCheck('tenant.update'), tenantController.updateTenant);
router.delete('/tenants/:tenantId', authMiddleware, permissionCheck('tenant.delete'), tenantController.deleteTenant);

module.exports = router;