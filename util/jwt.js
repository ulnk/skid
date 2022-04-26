const jsonwebtoken = require('jsonwebtoken');
const { get } = require('./secret.js');


const jwt = async (req, res, next) => {
  const secret = await get();
  const jwtToken = JSON.parse(req.headers['x-auth-token']);
  if (!jwtToken) return res.sendStatus(401);
  jsonwebtoken.verify(jwtToken, secret.secret, async (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.user = decoded.data;
      next();
  });
};

const jwtSocket = async (socket, next) => {
  const secret = await get();
  const jwtToken = socket.handshake.auth.token || socket.handshake.query.token || socket.handshake.token;
  if (!jwtToken) return next(new Error("Not Authorised"));

  jsonwebtoken.verify(jwtToken, secret.secret, (err, decoded) => {
      if (err) return next(new Error("Not Authorised"));
      next();
  });
};

const sign = async (data) => {
  const secret = await get();
  return jsonwebtoken.sign({ exp: Date.now() + (6.048e+8), data }, secret.secret);
};

exports.jwt = jwt;
exports.jwtSocket = jwtSocket;
exports.sign = sign;