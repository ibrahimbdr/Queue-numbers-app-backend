const jwt = require("jsonwebtoken");

// validating login
function auth(req, res, next) {
  const { authorization } = req.headers;
  console.log({ authorization });

  jwt.verify(authorization, process.env.SECRET, function (error, decoded) {
    if (decoded) {
      req.userId = decoded.data.userId;
      console.log(decoded.data);
    }
    if (error) {
      res.status(403).send("You must Log in first !!!");
      return;
    }
    next();
  });
}

module.exports = { auth };
