var { expressjwt: jwt } = require("express-jwt");

const requiresSignIn = jwt({
  secret: process.env.JWTTOKEN,
  algorithms: ["HS256"],
});

module.exports = {
  requiresSignIn,
};
