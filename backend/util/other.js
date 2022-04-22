const crypto = require('crypto');

const hash = (inp) => { 
  return crypto.createHash('sha256').update(inp).digest('hex');
}

const randomString = () => {
  return hash((Math.random() * 10).toString()).slice(1, 7);
}

module.exports = { hash, randomString };