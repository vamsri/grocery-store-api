const mongoose = require('mongoose');
const Role = require('../models/roleSchema'); // Adjust the path as necessary

mongoose.connect('mongodb://127.0.0.1:27017/store-dev', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const defaultRoles = [
  {
    name: 'Admin',
    permissions: ['manage_users', 'manage_roles', 'manage_permissions', 'view_all_data'],
    tenantId: 'global', // Assuming a global tenant for system-wide roles
    isDefault: false
  },
  {
    name: 'User',
    permissions: ['view_profile', 'edit_profile'],
    tenantId: 'global',
    isDefault: true
  }
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
