const User = require('../models/User');


const getAllUser = async (req, res) => {
  try {
    const User = await User.find();
    res.status(200).json(User);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {getAllUser};