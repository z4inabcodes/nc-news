const endpoints = require('../../endpoints.json');

exports.getEndpoint = (req, res) => {
  res.status(200).send({ endpoints });
};