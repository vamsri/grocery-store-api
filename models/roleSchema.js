const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'Acme Corp' },
  tenantId: { type: String, required: true, default: 'tenant-001' },
  permissions: [{ type: String }],
  isDefault: {type: Boolean}
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
