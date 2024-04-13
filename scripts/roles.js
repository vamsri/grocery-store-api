const mongoose = require('mongoose');
const Role = require('../models/roleSchema'); // Adjust the path as necessary

mongoose.connect('mongodb://127.0.0.1:27017/store-dev', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const defaultRoles = [ 
  {
    name: 'User',
    permissions: ['user.view', 'user.edit'],
    tenantId: 'global',
    isDefault: true
  },
  {
    name: 'Tenant Management',
    permissions: ['tenant.create', 'tenant.view', 'tenant.update', 'tenant.delete', 'tenant.list'],
    tenantId: 'global',
    isDefault: false
  },
  {
    name: 'User Management',
    permissions: ['user.create', 'user.view', 'user.update', 'user.delete', 'user.list'],
    tenantId: 'global',
    isDefault: false
  },
  {
    name: 'Role Management',
    permissions: ['role.create', 'role.view', 'role.update', 'role.delete', 'role.list'],
    tenantId: 'global',
    isDefault: false
  },
  {
    name: 'Content Management',
    permissions: ['content.create', 'content.view', 'content.update', 'content.delete', 'content.list'],
    tenantId: 'global',
    isDefault: false
  },
  {
    name: 'Product Management',
    permissions: ['product.create', 'product.view', 'product.update', 'product.delete', 'product.list'],
    tenantId: 'global',
    isDefault: false
  },
  {
    name: 'Order Management',
    permissions: ['order.create', 'order.view', 'order.update', 'order.delete', 'order.list'],
    tenantId: 'global',
    isDefault: false
  },
];

const seedRoles = async () => {
  try {
    for (const role of defaultRoles) {
      const roleExists = await Role.findOne({ name: role.name, tenantId: role.tenantId });
      if (!roleExists) {
        await Role.create(role);
      }
    }
    console.log('Default roles have been seeded');
  } catch (error) {
    console.error('Error seeding roles:', error);
  }
};

seedRoles().then(() => mongoose.disconnect());
