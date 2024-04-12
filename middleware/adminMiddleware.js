const adminMiddleware = async (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({ error: 'Not authenticated' });
    }
  
    // Example for an array of roles
    const isAdmin = req.user.roles.includes('admin');
  
    // Or, for a more complex permissions setup
    // const isAdmin = await checkAdminPermissions(req.user);
  
    if (!isAdmin) {
      return res.status(403).send({ error: 'Access denied. Requires admin privileges.' });
    }
  
    next(); // User has admin privileges
  };
  
  module.exports = {adminMiddleware};