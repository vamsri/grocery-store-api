const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');

router.post('/tenants', tenantController.createTenant);
router.get('/tenants', tenantController.getAllTenants);
router.get('/tenants/:tenantId', tenantController.getTenantById);
router.patch('/tenants/:tenantId', tenantController.updateTenant);
router.delete('/tenants/:tenantId', tenantController.deleteTenant);

module.exports = router;