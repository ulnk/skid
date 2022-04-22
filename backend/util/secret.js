const { randomString } = require('./other.js');
const OtherModel = require('../models/other/OtherModel.js');

const getSecret = async () => {
  const allOptions = await OtherModel.find({});
  let foundSecret = allOptions.filter(option => option.secret)[0];
  if (!foundSecret) foundSecret = await OtherModel.create({ secret: randomString() });
  return foundSecret
}

const getSecretSync = async (callback) => {
  OtherModel.find({}, (err, result) => {
    if (err) return callback('error')
    if (!result.filter(option => option.secret)[0]){
      OtherModel.create({ secret: randomString() }, (err, secret) => {
        callback(secret)
        console.log(secret)
      });
    }
  });
}

const changeSecret = async () => {
  const allOptions = await OtherModel.find({});
  let foundSecret = allOptions.filter(option => option.secret)[0];
  if (!foundSecret) foundSecret = await OtherModel.create({ secret: randomString() });
  return foundSecret;
}

const getSecretAndChange = async () => {
  const allOptions = await OtherModel.find({});
  let foundSecret = allOptions.filter(option => option.secret)[0];
  await OtherModel.findOneAndDelete({ secret: foundSecret.secret });
  await OtherModel.create({ secret: randomString() });
  return foundSecret;
}

exports.get = getSecret;
exports.change = changeSecret;

exports.getSync = getSecretSync;