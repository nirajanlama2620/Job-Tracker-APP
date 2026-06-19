const roleMiddleware = (role) => (req, res, next) => {

  if (req.user.role === role) {
    return next();

  }

  res.status(403).send("Access denied");

};

export default roleMiddleware;