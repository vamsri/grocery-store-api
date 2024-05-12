const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');
const {authMiddleware, permissionCheck} = require('../middleware/authMiddleware');

router.post('/tenants', authMiddleware, permissionCheck('tenant.create'), tenantController.createTenant);
router.get('/tenants', authMiddleware, permissionCheck('tenant.list'), tenantController.getAllTenants);
router.get('/tenants/:tenantId', authMiddleware, permissionCheck('tenant.view'), tenantController.getTenantById);
router.patch('/tenants/:tenantId', authMiddleware, permissionCheck('tenant.update'), tenantController.updateTenant);
router.delete('/tenants/:tenantId', authMiddleware, permissionCheck('tenant.delete'), tenantController.deleteTenant);

router.post('/tenant/:tenantId/address', authMiddleware, permissionCheck('tenant.create'), tenantController.tenantAddress);
// router.post('/tenant/:tenantId/contact', authMiddleware, permissionCheck('tenant.create'), tenantController.tenantContact);
// router.post('/tenant/:tenantId/branding', authMiddleware, permissionCheck('tenant.create'), tenantController.tenantBranding);
// router.post('/tenant/:tenantId/financial', authMiddleware, permissionCheck('tenant.create'), tenantController.tenantFinancial);
// router.post('/tenant/:tenantId/operational', authMiddleware, permissionCheck('tenant.create'), tenantController.tenantOperational);

module.exports = router;