const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    // User is added by auth middleware
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ msg: 'Access denied: Admin privileges required' });
    }

    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
