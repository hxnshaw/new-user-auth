const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_TOKEN, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isValidToken = ({ token }) =>
  jwt.verify(token, process.env.JWT_SECRET_TOKEN);

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });
  const fiveMinutes = 1000 * 60 * 5;
  res.cookie("token", token, {
    httpOnly: true,
    expiresIn: new Date(Date.now() + fiveMinutes),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

module.exports = {
  createJWT,
  isValidToken,
  attachCookiesToResponse,
};
