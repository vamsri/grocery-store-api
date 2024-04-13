const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const Role = require('../models/roleSchema');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware to verify token and attach user to request
const authMiddleware = async (req, res, next) => {
  // Similar to previous middleware, but ensure to populate user roles
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userId }).populate('roles');

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

// Permission check middleware
const permissionCheck = (requiredPermission) => {
  return async (req, res, next) => {
    const { user } = req;
    const userRoles = user.roles;

    // Aggregate permissions from all roles
    let permissions = [];
    userRoles.forEach(role => {
      permissions = [...permissions, ...role.permissions];
    });

    console.log('permissions->', permissions);
    const hasPermission = permissions.includes(requiredPermission);

    console.log('hasPermission->', requiredPermission, hasPermission)
    if (!hasPermission) {
      return res.status(403).send('Insufficient permissions');
    }

    next();
  };
};

module.exports = {authMiddleware, permissionCheck};

/*
Granular permissions refer to specific, detailed privileges that can be granted to users or roles within an application. These permissions define the exact actions that users are allowed to perform, providing a high level of control over access and operations within the system. By breaking down permissions into granular actions, you can create a more secure and customizable access control system.

Here’s a list of example granular permissions that might be relevant for a multi-tenant web application, grouped by functional area:

### User Management
- `user.create` - Create a new user account.
- `user.view` - View user profiles.
- `user.update` - Update user account information.
- `user.delete` - Delete a user account.
- `user.list` - List all user accounts.

### Role Management
- `role.create` - Create a new role.
- `role.view` - View role details.
- `role.update` - Update role information.
- `role.delete` - Delete a role.
- `role.assign` - Assign roles to users.
- `role.list` - List all roles.

### Tenant Management
- `tenant.create` - Create a new tenant.
- `tenant.view` - View tenant information.
- `tenant.update` - Update tenant details.
- `tenant.delete` - Delete a tenant.
- `tenant.list` - List all tenants.

### Content Management
- `content.create` - Create new content items.
- `content.view` - View content items.
- `content.update` - Update content items.
- `content.delete` - Delete content items.
- `content.publish` - Publish content items.
- `content.list` - List all content items.

### Product Management (for eCommerce or similar)
- `product.create` - Create a new product.
- `product.view` - View product details.
- `product.update` - Update product information.
- `product.delete` - Delete a product.
- `product.list` - List all products.
- `inventory.manage` - Manage product inventory levels.

### Order Management
- `order.create` - Create new orders.
- `order.view` - View order details.
- `order.update` - Update orders.
- `order.delete` - Cancel or delete orders.
- `order.list` - List all orders.
- `order.process` - Process orders for fulfillment.

### Reporting
- `report.view` - Access and view reports.
- `report.generate` - Generate new reports.
- `report.list` - List all available reports.

These granular permissions can be combined and assigned to different roles within the application, allowing for tailored access control based on the specific needs and responsibilities of each user or user group. Implementing such a system requires careful planning and consideration of the application's features and the actions users need to perform.
*/