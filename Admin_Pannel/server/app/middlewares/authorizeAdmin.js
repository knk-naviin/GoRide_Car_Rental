const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.email !== "genfivelead@gmail.com") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};

module.exports = authorizeAdmin;
