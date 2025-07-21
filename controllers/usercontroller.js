const User = require('../models/user');

// GET /api/users/me
const getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json(user);
};

// PUT /api/users/me
const updateMe = async (req, res) => {
  const { name, phone } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { name, phone },
    { new: true }
  ).select('-password');

  res.json(updatedUser);
};

module.exports = { getMe, updateMe };
