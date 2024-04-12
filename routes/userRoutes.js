const express = require('express');
const userController = require('../controllers/userController');
const {authMiddleware, permissionCheck} = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/users', authMiddleware, permissionCheck('user.create'), userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:userId', userController.getUserById);
router.patch('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);

// PUT /api/users/:userId/role
// router.put('/users/:userId/role', [authMiddleware, adminMiddleware], async (req, res) => {
//     try {
//       const { role } = req.body;
//       const { userId } = req.params;
  
//       // Verify the admin has permission to assign roles
//       // Then find the user and update their role
//       const user = await User.findById(userId);
//       if (!user) {
//         return res.status(404).send('User not found');
//       }
  
//       user.role = role; // Ensure 'role' is a valid value
//       await user.save();
  
//       res.send('Role updated successfully');
//     } catch (error) {
//       res.status(400).send(error.message);
//     }
//   });
  

module.exports = router;