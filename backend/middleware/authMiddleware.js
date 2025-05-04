const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Issitraukiame tokena is headerio
    const token = req.header('Autorization')?.replace('Bearer ', '');
    // 2. Pasiziurime ar tokenas egzistuoja
    if (!token) {
      return res.status(401).json({ error: 'Unautothorized' });
    }
    // 3. verifikuojame tokena
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 4. bandome gauti useri is duomenu bazes
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // 5. Pridedame useri prie request objekto
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = authMiddleware;
